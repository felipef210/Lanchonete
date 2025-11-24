using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace LachoneteApi.Services.Azure;

public class AzureFileStorage : IFileStorage
{
    private readonly string connectionString;

    public AzureFileStorage(IConfiguration configuration)
    {
        connectionString = configuration["AzureStorageConnection"]!;
    }
    public async Task Delete(string? imageRoute, string container)
    {
        if (string.IsNullOrEmpty(imageRoute))
            return;

        var client = new BlobContainerClient(connectionString, container);
        await client.CreateIfNotExistsAsync();
        var fileName = Path.GetFileName(imageRoute);
        var blob = client.GetBlobClient(fileName);
        await blob.DeleteIfExistsAsync();
    }

    public async Task<string> Store(string container, IFormFile file)
    {
        var client = new BlobContainerClient(connectionString, container);
        await client.CreateIfNotExistsAsync();
        client.SetAccessPolicy(PublicAccessType.Blob);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid()}{extension}";
        var blob = client.GetBlobClient(fileName);
        var blobHttpHeaders = new BlobHttpHeaders();
        blobHttpHeaders.ContentType = file.ContentType;
        await blob.UploadAsync(file.OpenReadStream(), blobHttpHeaders);
        return blob.Uri.ToString();
    }
}
