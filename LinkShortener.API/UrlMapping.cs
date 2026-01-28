using System.ComponentModel.DataAnnotations;

namespace LinkShortener.API;

public class UrlMapping
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(120)]
    public string LongUrl { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(7)]
    public string ShortCode { get; set; } = string.Empty;
}