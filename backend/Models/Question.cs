using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Question
    {
        [Key]
        public int QnId { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string QuestionAsked { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option1 { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option2 { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option3 { get; set; } = string.Empty;

        public int Answer { get; set; }

        public int Level { get; set; }
    }
}
