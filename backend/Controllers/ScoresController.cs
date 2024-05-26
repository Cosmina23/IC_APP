using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos;
using Humanizer;

namespace backend.Controllers
{
    public class ScoresController : Controller
    {
        private readonly easyBacDbContext _context;

        public ScoresController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpPut("updateScore/{userId}")]
        public async Task<IActionResult> UpdateScore(int userId, [FromQuery] string course, [FromQuery] int level, [FromBody] int newScore)
        {
            switch (course.ToLower())
            {
                case "istorie":
                    return await UpdateHistoryScore(userId, level, newScore);
                case "biologie":
                    return await UpdateBiologyScore(userId, level, newScore);
                case "romana":
                    return await UpdateRomanaScore(userId, level, newScore);
                default:
                    return BadRequest(new { message = "Invalid course specified." });
            }
        }

        private async Task<IActionResult> UpdateHistoryScore(int userId, int level, int newScore)
        {
            var historyScore = await _context.HistoryScores.FirstOrDefaultAsync(hs => hs.UserId == userId);

            if (historyScore == null)
            {
                // Create a new HistoryScore record for the user
                historyScore = new HistoryScore
                {
                    UserId = userId,
                    Level1Score = 0,
                    Level2Score = 0,
                    Level3Score = 0,
                    Level4Score = 0,
                    Level5Score = 0,
                    TotalScore = 0
                };

                _context.HistoryScores.Add(historyScore);
                await _context.SaveChangesAsync(); // Save the new entity to the database to get a permanent ID
            }

            switch (level)
            {
                case 1:
                    historyScore.Level1Score = newScore;
                    break;
                case 2:
                    historyScore.Level2Score = newScore;
                    break;
                case 3:
                    historyScore.Level3Score = newScore;
                    break;
                case 4:
                    historyScore.Level4Score = newScore;
                    break;
                case 5:
                    historyScore.Level5Score = newScore;
                    break;
                default:
                    return BadRequest(new { message = "Invalid level specified." });
            }

            // Recalculate total score
            historyScore.TotalScore = historyScore.Level1Score + historyScore.Level2Score + historyScore.Level3Score + historyScore.Level4Score + historyScore.Level5Score;

            _context.HistoryScores.Update(historyScore);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Level {level} score updated successfully." });
        }

        private async Task<IActionResult> UpdateBiologyScore(int userId, int level, int newScore)
        {
            var biologyScore = await _context.BiologyScores.FirstOrDefaultAsync(hs => hs.UserId == userId);

            if (biologyScore == null)
            {
                // Create a new HistoryScore record for the user
                biologyScore = new BiologyScore
                {
                    UserId = userId,
                    Level1Score = 0,
                    Level2Score = 0,
                    Level3Score = 0,
                    Level4Score = 0,
                    Level5Score = 0,
                    TotalScore = 0
                };

                _context.BiologyScores.Add(biologyScore);
                await _context.SaveChangesAsync(); // Save the new entity to the database to get a permanent ID
            }

            switch (level)
            {
                case 1:
                    biologyScore.Level1Score = newScore;
                    break;
                case 2:
                    biologyScore.Level2Score = newScore;
                    break;
                case 3:
                    biologyScore.Level3Score = newScore;
                    break;
                case 4:
                    biologyScore.Level4Score = newScore;
                    break;
                case 5:
                    biologyScore.Level5Score = newScore;
                    break;
                default:
                    return BadRequest(new { message = "Invalid level specified." });
            }

            // Recalculate total score
            biologyScore.TotalScore = biologyScore.Level1Score + biologyScore.Level2Score + biologyScore.Level3Score + biologyScore.Level4Score + biologyScore.Level5Score;

            _context.BiologyScores.Update(biologyScore);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Level {level} score updated successfully." });
        }

        private async Task<IActionResult> UpdateRomanaScore(int userId, int level, int newScore)
        {
            var romanaScore = await _context.RomanaScores.FirstOrDefaultAsync(hs => hs.UserId == userId);

            if (romanaScore == null)
            {
                // Create a new HistoryScore record for the user
                romanaScore = new RomanaScore
                {
                    UserId = userId,
                    Level1Score = 0,
                    Level2Score = 0,
                    Level3Score = 0,
                    Level4Score = 0,
                    Level5Score = 0,
                    TotalScore = 0
                };

                _context.RomanaScores.Add(romanaScore);
                await _context.SaveChangesAsync(); // Save the new entity to the database to get a permanent ID
            }

            switch (level)
            {
                case 1:
                    romanaScore.Level1Score = newScore;
                    break;
                case 2:
                    romanaScore.Level2Score = newScore;
                    break;
                case 3:
                    romanaScore.Level3Score = newScore;
                    break;
                case 4:
                    romanaScore.Level4Score = newScore;
                    break;
                case 5:
                    romanaScore.Level5Score = newScore;
                    break;
                default:
                    return BadRequest(new { message = "Invalid level specified." });
            }

            // Recalculate total score
            romanaScore.TotalScore = romanaScore.Level1Score + romanaScore.Level2Score + romanaScore.Level3Score + romanaScore.Level4Score + romanaScore.Level5Score;

            _context.RomanaScores.Update(romanaScore);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Level {level} score updated successfully." });
        }
    
}
}
