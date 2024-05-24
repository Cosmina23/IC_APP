using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class QuestionDto
    {
        [Required]
        public string QuestionAsked { get; set; } = string.Empty;

        [Required]
        public string Option1 { get; set; } = string.Empty;

        [Required]
        public string Option2 { get; set; } = string.Empty;

        [Required]
        public string Option3 { get; set; } = string.Empty;

        [Required]
        public int Answer { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public string Course { get; set; } = string.Empty;
    }

}
