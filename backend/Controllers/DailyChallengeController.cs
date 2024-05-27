using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;


namespace backend.Controllers
{
    public class DailyChallengeController : Controller
    {
        private readonly easyBacDbContext _context;

        public DailyChallengeController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpGet("getChallenge")]
        public async Task<ActionResult<DailyChallenge>> GetDailyChallenge([FromQuery] string course)
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
