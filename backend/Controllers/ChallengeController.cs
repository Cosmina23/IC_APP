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
    public class ChallengeController : Controller
    {
        private readonly easyBacDbContext _context;

        public ChallengeController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpGet("getChallenge")]
        public async Task<ActionResult<Challenge>> GetDailyChallenge([FromQuery] string course)
        {
            var today = DateTime.Today;
            var challenge = await _context.Challenges.FirstOrDefaultAsync(dc => dc.Date == today && dc.Course == course);
            if (challenge == null)
            {
                return NotFound(new { message = "No challenge found for today for the specified course." });
            }
            return Ok(challenge);
        }

        [HttpPost("addChallenge")]
        public async Task<IActionResult> AddChallenge([FromQuery] ChallengeDto challengeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var challenge = new Challenge
            {
                Course = challengeDto.Course,
                Question = challengeDto.Question,
                Option1 = challengeDto.Option1,
                Option2 = challengeDto.Option2,
                Option3 = challengeDto.Option3,
                Answer = challengeDto.Answer,
                Date = challengeDto.Date
            };

            _context.Challenges.Add(challenge);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Challenge added successfully." });
        }
    }
}
