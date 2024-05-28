using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Challenge
    {
        [Key]
        public int ChallengeId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Course { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Question { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option1 { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option2 { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string Option3 { get; set; } = string.Empty;

        public int Answer { get; set; }
        public int Valoare { get; set; }

        public DateTime Date { get; set; } = DateTime.Today; // current date with the time compnents set to zero
    }
}
