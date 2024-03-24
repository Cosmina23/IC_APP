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
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
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
