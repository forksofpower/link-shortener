namespace LinkShortener.API;

public class UrlMapping
{
    public int Id { get; set; }
    public string LongUrl { get; set; } = string.Empty;
    public string ShortUrl { get; set; } = string.Empty;
}