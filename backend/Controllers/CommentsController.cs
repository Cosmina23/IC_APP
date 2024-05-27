using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly easyBacDbContext _context;

        public CommentsController(easyBacDbContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            try
            {
                Console.WriteLine("Fetching comments from database...");
                var comments = await _context.Comments
                                             .Include(c => c.Replies)
                                             .ToListAsync();
                Console.WriteLine($"Fetched {comments.Count} comments.");

                foreach (var comment in comments)
                {
                    Console.WriteLine($"CommentID: {comment.CommentID}, Content: {comment.Content}, ParentCommentID: {comment.ParentCommentID}");
                }

                return Ok(comments);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, "Internal server error");
            }
        }



        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments
                                        .Include(c => c.Replies)
                                        .FirstOrDefaultAsync(c => c.CommentID == id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { id = comment.CommentID }, comment);
        }

        // PUT: api/Comments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.CommentID)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.Include(c => c.Replies).FirstOrDefaultAsync(c => c.CommentID == id);
            if (comment == null)
            {
                return NotFound();
            }

            DeleteCommentRecursively(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void DeleteCommentRecursively(Comment comment)
        {
            if (comment.Replies != null)
            {
                foreach (var reply in comment.Replies.ToList())
                {
                    DeleteCommentRecursively(reply);
                }
            }
            _context.Comments.Remove(comment);
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.CommentID == id);
        }
    }
}
