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
                //.OrderBy(y => Guid.NewGuid()) //ordine aleatoare de fiecare data
                ).ToListAsync();

            return Ok(questions);
        }

        // api/getAnswers
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

        // POST: api/addQuestion
        [HttpPost("addQuestion")]
        public async Task<ActionResult> AddQuestion(QuestionDto questionDto)
        {
            if (ModelState.IsValid)
            {
                var question = new Question
                {
                    QuestionAsked = questionDto.QuestionAsked,
                    Option1 = questionDto.Option1,
                    Option2 = questionDto.Option2,
                    Option3 = questionDto.Option3,
                    Answer = questionDto.Answer,
                    Level = questionDto.Level,
                    Course = questionDto.Course
                };

                _context.Question.Add(question);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}
