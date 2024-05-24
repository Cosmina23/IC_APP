using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class RomanaScoreController : Controller
    {
        private readonly easyBacDbContext _context;

        public RomanaScoreController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpPost("addScoreRomana")]
        public async Task<IActionResult> AddScore(AddScoreDto dto)
        {
            var user = await _context.Users.Include(u => u.ScoreRomana).FirstOrDefaultAsync(u => u.Id == dto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.ScoreRomana == null)
            {
                user.ScoreRomana = new RomanaScore
                {
                    UserId = user.Id
                };
                _context.RomanaScores.Add(user.ScoreRomana);
            }

            switch (dto.Level)
            {
                case 1:
                    user.ScoreRomana.Level1Score = dto.Score;
                    break;
                case 2:
                    user.ScoreRomana.Level2Score = dto.Score;
                    break;
                case 3:
                    user.ScoreRomana.Level3Score = dto.Score;
                    break;
                case 4:
                    user.ScoreRomana.Level4Score = dto.Score;
                    break;
                case 5:
                    user.ScoreRomana.Level5Score = dto.Score;
                    break;
                default:
                    return BadRequest("Invalid level.");
            }

            user.ScoreRomana.TotalScore = user.ScoreRomana.Level1Score +
                                  user.ScoreRomana.Level2Score +
                                  user.ScoreRomana.Level3Score +
                                  user.ScoreRomana.Level4Score +
                                  user.ScoreRomana.Level5Score;

            await _context.SaveChangesAsync();

            return Ok("Score added successfully.");
        }
    }
}
