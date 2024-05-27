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
    public class ClasamentController : Controller
    {
        private readonly easyBacDbContext _context;

        public ClasamentController(easyBacDbContext context)
        {
            _context = context;
        }

        [HttpGet("getClasament")]
        public async Task<ActionResult<IEnumerable<object>>> GetClasament([FromQuery] string course)
        {
            switch (course.ToLower())
            {
                case "istorie":
                    return await GetClasamentIstorie();
                case "biologie":
                    return await GetClasamentBiologie();
                case "romana":
                    return await GetClasamentRomana();
                default:
                    return BadRequest(new { message = "Invalid course" });
            }
        }

        private async Task<ActionResult<IEnumerable<object>>> GetClasamentIstorie()
        {
            var clasament = await _context.HistoryScores
            .Join(_context.Users, hs => hs.UserId, u => u.Id, (hs, u) => new
            {
                UserId = hs.UserId,
                u.Nume,
                u.Prenume,
                u.AvatarPath,
                TotalScore = hs.TotalScore
            })
            .OrderByDescending(hs => hs.TotalScore)
            .ToListAsync();

            return Ok(clasament);
        }

        private async Task<ActionResult<IEnumerable<object>>> GetClasamentBiologie()
        {
            var clasament = await _context.BiologyScores
            .Join(_context.Users, hs => hs.UserId, u => u.Id, (hs, u) => new
            {
                UserId = hs.UserId,
                u.Nume,
                u.Prenume,
                u.AvatarPath,
                TotalScore = hs.TotalScore
            })
            .OrderByDescending(hs => hs.TotalScore)
            .ToListAsync();

            return Ok(clasament);
        }

        private async Task<ActionResult<IEnumerable<object>>> GetClasamentRomana()
        {
            var clasament = await _context.RomanaScores
            .Join(_context.Users, hs => hs.UserId, u => u.Id, (hs, u) => new
            {
                UserId = hs.UserId,
                u.Nume,
                u.Prenume,
                u.AvatarPath,
                TotalScore = hs.TotalScore
            })
            .OrderByDescending(hs => hs.TotalScore)
            .ToListAsync();

            return Ok(clasament);
        }
    }
}
