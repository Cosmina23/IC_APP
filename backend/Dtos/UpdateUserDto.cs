namespace backend.Dtos
{
    public class UpdateUserDto
    {
        public string Nume { get; set; } = string.Empty;
        public string Prenume { get; set; } = string.Empty;
        public string Telefon { get; set; } = string.Empty;
        public string AvatarPath { get; set; } = string.Empty;
    }
}
