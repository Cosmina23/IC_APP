using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class RomanaScore
    {
        [Key]
        public int ScoreId { get; set; }

        public int UserId { get; set; }

        public int Level1Score { get; set; } = 0;
        public int Level2Score { get; set; } = 0;
        public int Level3Score { get; set; } = 0;
        public int Level4Score { get; set; } = 0;
        public int Level5Score { get; set; } = 0;
        public int LatestChallengeScore { get; set; } = 0;
        public int TotalScore { get; set; } = 0;

        public int NivelCurent { get; set; } = 1;

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
