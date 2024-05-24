using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(50)")]
        public string Nume { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(50)")]
        public string Prenume { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(12)")]
        public string Telefon { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(150)")]
        [JsonIgnore] //to not return the password for get
        public string Password { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(100)")]
        public string AvatarPath { get; set; } = string.Empty;

        public BiologyScore ScoreBiology { get; set; } = null!;
        public RomanaScore ScoreRomana { get; set; } = null!;
        public HistoryScore ScoreHistory { get; set; } = null!;

    }
}
