using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class BiologyScoreController : Controller
    {
        private readonly easyBacDbContext _context;

        public BiologyScoreController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpPost("addScoreBiology")]
        public async Task<IActionResult> AddScore(AddScoreDto dto)
        {
            var user = await _context.Users.Include(u => u.ScoreBiology).FirstOrDefaultAsync(u => u.Id == dto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.ScoreBiology == null)
            {
                user.ScoreBiology = new BiologyScore
                {
                    UserId = user.Id
                };
                _context.BiologyScores.Add(user.ScoreBiology);
            }

            switch (dto.Level)
            {
                case 1:
                    user.ScoreBiology.Level1Score = dto.Score;
                    break;
                case 2:
                    user.ScoreBiology.Level2Score = dto.Score;
                    break;
                case 3:
                    user.ScoreBiology.Level3Score = dto.Score;
                    break;
                case 4:
                    user.ScoreBiology.Level4Score = dto.Score;
                    break;
                case 5:
                    user.ScoreBiology.Level5Score = dto.Score;
                    break;
                default:
                    return BadRequest("Invalid level.");
            }

            user.ScoreBiology.TotalScore = user.ScoreBiology.Level1Score +
                                 user.ScoreBiology.Level2Score +
                                 user.ScoreBiology.Level3Score +
                                 user.ScoreBiology.Level4Score +
                                 user.ScoreBiology.Level5Score;

            await _context.SaveChangesAsync();

            return Ok("Score added successfully.");
        }
    }
}
