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
            var challenge = await _context.DailyChallenges.FirstOrDefaultAsync(dc => dc.Date == today && dc.Course == course);
            if (challenge == null)
            {
                return NotFound(new { message = "No challenge found for today for the specified course." });
            }
            return Ok(challenge);
        }
    }
}
