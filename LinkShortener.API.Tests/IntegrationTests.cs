using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace LinkShortener.API.Tests;

public class IntegrationTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client = factory.CreateClient();

    // Spin up app in memory

    [Fact]
    public async Task ShortenLink_And_RedirectWorkCorrectly()
    {
        // input data
        var longUrl = "https://wikipedia.org";
        
        // Shorten URL
        var createResponse = await _client.PostAsync($"/api/shorten?longUrl={WebUtility.UrlEncode(longUrl)}", null);
        
        // assert: creation was successful
        createResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var result = await createResponse.Content.ReadFromJsonAsync<ShortenResponse>();
        result.Should().NotBeNull();
        result!.ShortCode.Should().NotBeNullOrEmpty();
        
        // Visit the Short Link
        var redirectClient = factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect =  false });

        var redirectResponse = await redirectClient.GetAsync($"/{result.ShortCode}");

        // assert: It redirects to the long url correctly
        redirectResponse.StatusCode.Should().Be(HttpStatusCode.Redirect);
        redirectResponse.Headers.Location.Should().Be(longUrl);
    }
}

record ShortenResponse(string ShortCode);