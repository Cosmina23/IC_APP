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
    public class DailyAttemptController : Controller
    {
        private readonly easyBacDbContext _context;

        public DailyAttemptController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpGet("hasAttempted/{userId}")]
        public async Task<IActionResult> HasAttempted(int userId, [FromQuery] string course)
        {
            var attempt = await _context.DailyAttempts
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date == DateTime.Today && a.Course == course);

            if (attempt != null)
            {
                return Ok(new { hasAttempted = true });
            }

            return Ok(new { hasAttempted = false });
        }

        [HttpPut("storeAttempt/{userId}")]
        public async Task<IActionResult> StoreAttempt(int userId, [FromQuery] string course)
        {
            var existingAttempt = await _context.DailyAttempts
                            .FirstOrDefaultAsync(a => a.UserId == userId && a.Course == course);

            if (existingAttempt != null)
            {
                existingAttempt.Date = DateTime.Today;
                _context.DailyAttempts.Update(existingAttempt);
            }
            else
            {
                var newAttempt = new DailyAttempt
                {
                    UserId = userId,
                    Course = course,
                    Date = DateTime.Today
                };
                _context.DailyAttempts.Add(newAttempt);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}
