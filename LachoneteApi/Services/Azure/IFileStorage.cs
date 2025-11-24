namespace LachoneteApi.Services.Azure;

public interface IFileStorage
{
    Task<string> Store(string container, IFormFile file);
    Task Delete(string? imageRoute, string container);
    async Task<string> Edit(string? oldImageRoute, string container, IFormFile file)
    {
        await Delete(oldImageRoute, container);
        return await Store(container, file);
    }
}
