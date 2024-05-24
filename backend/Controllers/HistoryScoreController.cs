using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class HistoryScoreController : Controller
    {
        private readonly easyBacDbContext _context;

        public HistoryScoreController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpPost("addScoreHistory")]
        public async Task<IActionResult> AddScore(AddScoreDto dto)
        {
            var user = await _context.Users.Include(u => u.ScoreHistory).FirstOrDefaultAsync(u => u.Id == dto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.ScoreHistory == null)
            {
                user.ScoreHistory = new HistoryScore
                {
                    UserId = user.Id
                };
                _context.HistoryScores.Add(user.ScoreHistory);
            }

            switch (dto.Level)
            {
                case 1:
                    user.ScoreHistory.Level1Score = dto.Score;
                    break;
                case 2:
                    user.ScoreHistory.Level2Score = dto.Score;
                    break;
                case 3:
                    user.ScoreHistory.Level3Score = dto.Score;
                    break;
                case 4:
                    user.ScoreHistory.Level4Score = dto.Score;
                    break;
                case 5:
                    user.ScoreHistory.Level5Score = dto.Score;
                    break;
                default:
                    return BadRequest("Invalid level.");
            }

            user.ScoreHistory.TotalScore = user.ScoreHistory.Level1Score +
                                  user.ScoreHistory.Level2Score +
                                  user.ScoreHistory.Level3Score +
                                  user.ScoreHistory.Level4Score +
                                  user.ScoreHistory.Level5Score;

            await _context.SaveChangesAsync();

            return Ok("Score added successfully.");
        }
    }
}
