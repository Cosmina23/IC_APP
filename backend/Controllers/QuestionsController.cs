using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    
    public class QuestionsController : Controller
    {
        private readonly easyBacDbContext _context;

        public QuestionsController(easyBacDbContext context)
        {
            _context = context;
        }

        // GET: /getLevels
        [HttpGet("getLevels")]
        public async Task<ActionResult<IEnumerable<int>>> GetLevels()
        {
            var levels = await (_context.Question
                .Select(q => q.Level)
                .Distinct()
                .ToListAsync());
            return Ok(levels);
        }

        // GET: /getQuestions
        [HttpGet("getQuestions")] //GET /questions?level=1
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions([FromQuery] int level)
        {
            var questions = await (_context.Question
                .Where(q => q.Level == level)
                .Select(x => new
                {
                    QnId = x.QnId, //sau doar x.QnId
                    QuestionAsked = x.QuestionAsked,
                    Options = new string[] { x.Option1, x.Option2, x.Option3 }
                })
                .OrderBy(y => Guid.NewGuid()) //ordine aleatoare de fiecare data
                ).ToListAsync();

            return Ok(questions);
        }

        // POST: api/getAnswers
        [HttpGet]
        [Route("getAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int level)
        {
            var answers = await (_context.Question
                .Where(x => x.Level == level) // Filtru pentru nivelul specificat
                .Select(y => new
                {
                    y.QnId,
                    y.Answer
                })
                .ToListAsync());

            return Ok(answers);
        }

        //-------------------------------------------------------------------------------------------------------------------------

        // GET: Questions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = await _context.Question
                .FirstOrDefaultAsync(m => m.QnId == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // GET: Questions/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Questions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("QnId,QuestionAsked,Option1,Option2,Option3,Answer")] Question question)
        {
            if (ModelState.IsValid)
            {
                _context.Add(question);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(question);
        }

        // GET: Questions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = await _context.Question.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("QnId,QuestionAsked,Option1,Option2,Option3,Answer")] Question question)
        {
            if (id != question.QnId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(question);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuestionExists(question.QnId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = await _context.Question
                .FirstOrDefaultAsync(m => m.QnId == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var question = await _context.Question.FindAsync(id);
            if (question != null)
            {
                _context.Question.Remove(question);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuestionExists(int id)
        {
            return _context.Question.Any(e => e.QnId == id);
        }
    }
}
