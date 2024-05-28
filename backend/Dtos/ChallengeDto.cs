namespace backend.Dtos
{
    public class ChallengeDto
    {
        public string Course { get; set; } = string.Empty;
        public string Question { get; set; } = string.Empty;
        public string Option1 { get; set; } = string.Empty;
        public string Option2 { get; set; } = string.Empty;
        public string Option3 { get; set; } = string.Empty;
        public int Answer { get; set; }
        public int Valoare { get; set; }

        public DateTime Date { get; set; } = DateTime.Today;
    }
}
