using System;
using Microsoft.AspNetCore.Mvc; //Controller
using backend.Models;
using backend.Dtos;
using backend.Helpers;

namespace backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {

        private readonly easyBacDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(easyBacDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {

            var user = new User
            {
                Nume = dto.Nume,
                Prenume = dto.Prenume,
                Telefon = dto.Telefon,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                AvatarPath = "default.png"
            };

            // Add the user to the context
            _context.Users.Add(user);

            // Save changes to persist the user to the database
            _context.SaveChanges();

            return Ok("succesful register");
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user == null) //if user doesnt exist
            {
                return BadRequest(new { message = "Invalid credentials" });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Wrong password" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult GetLoggedUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);

                return Ok(user);
            }
            catch
            (Exception ex)
            { return Unauthorized(); }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            try
            {
                // Verificați dacă utilizatorul este autorizat
                var jwt = Request.Cookies["jwt"];
                if (jwt != null)
                {
                    var token = _jwtService.Verify(jwt);
                    int userId = int.Parse(token.Issuer);
                    if (userId != id)
                    {
                        return Unauthorized(); // Utilizatorul nu este autorizat să modifice acest utilizator
                    }
                }
                else
                    return Ok(new
                    {
                        message = "nu exista biscuite"
                    });


                // Găsiți utilizatorul în baza de date
                var user = _context.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    return NotFound(); // Utilizatorul nu a fost găsit în baza de date
                }

                // Actualizați datele utilizatorului
                user.Nume = updatedUser.Nume;
                user.Prenume = updatedUser.Prenume;
                user.Telefon = updatedUser.Telefon;
                user.AvatarPath = updatedUser.AvatarPath;

                // Salvare modificări în baza de date
                _context.SaveChanges();

                return Ok(user); // Returnează utilizatorul actualizat
            }
            catch (Exception ex)
            {
                // Afișați detaliile erorii folosind metoda ToString() a obiectului Exception
                Console.WriteLine("A apărut o eroare: " + ex.ToString());

                // Întoarceți un cod de stare 500 (ServerError) și mesajul de eroare original
                return StatusCode(500, ex.Message);
            }

        }

        [Route("api/images")]
        public class ImagesController : ControllerBase
        {
            [HttpGet]
            public IActionResult GetImages()
            {
                var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                var imageFiles = Directory.GetFiles(imagesDirectory);
                return Ok(imageFiles);
            }
        }

        [HttpGet("images")]
        public IActionResult GetImageList()
        {
            try
            {
                //lista de nume de fișiere de imagine din folderul cu imagini
                var imageFiles = Directory.GetFiles("../backend/Images")
                                          .Select(Path.GetFileName)
                                          .ToList();

                return Ok(imageFiles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"A apărut o eroare: {ex.Message}");
            }
        }


        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "succes logout"
            });
        }
    }
}
