using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string UserEmail { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string Content { get; set; } = string.Empty;

        public int? ParentCommentID { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("ParentCommentID")]
        [JsonIgnore] // Avoid circular references
        public virtual Comment? ParentComment { get; set; }

        [JsonIgnore] // Avoid circular references
        public virtual ICollection<Comment>? Replies { get; set; }
    }
}
