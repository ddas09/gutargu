using Microsoft.AspNetCore.Mvc;

namespace Gutargu.Backend.Services.Contracts;

public interface IImageService
{
    Task<string> UploadImageAsync(IFormFile imageFile);

    Task<string> GetImageURL(string imageFilePath);

    bool IsValidProfileImageType(IFormFile? imageFile);
}