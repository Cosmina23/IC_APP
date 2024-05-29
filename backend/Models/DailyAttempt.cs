using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DailyAttempt
    {
        [Key]
        public int AttemptId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; } = DateTime.MinValue;
        public string Course { get; set; } = string.Empty;
    }
}
