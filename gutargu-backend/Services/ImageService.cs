using Microsoft.Extensions.Options;
using Gutargu.Backend.Common.Models;
using Gutargu.Backend.Common.Constants;
using Gutargu.Backend.Common.Exceptions;
using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.Services
{
    public class ImageService : IImageService
    {
        private readonly string _uploadDirectory;
        private static readonly List<string> ALLOWED_PROFILE_IMAGE_FILE_TYPES = ["image/jpeg", "image/png"];

        public ImageService(IOptions<ImageServiceConfiguration> config)
        {
            _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), config.Value.UploadDirectory);

            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        public async Task<string> GetImageURL(string imageFilePath)
        {
            var filePath = Path.Combine(_uploadDirectory, imageFilePath);

            if (!File.Exists(filePath))
            {
                throw new ApiException(message: "Image file not found.", errorCode: AppConstants.ErrorCodeEnum.NotFound);
            }

            return Path.Combine("http://localhost:5158/uploads/images/", imageFilePath);;
        }

        // Asynchronous method to upload an image
        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ApiException(message: "No file uploaded", errorCode: AppConstants.ErrorCodeEnum.BadRequest);
            }

            // Generate a unique file name using GUID and preserve the original file extension
            var fileExtension = Path.GetExtension(imageFile.FileName);
            var fileName = $"{Guid.NewGuid()}{fileExtension}";

            // Construct the full path to save the file
            var filePath = Path.Combine(_uploadDirectory, fileName);

            // Save the image to the local file system asynchronously
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream); // Asynchronously copy the file content
            }

            return fileName;
        }

        public bool IsValidProfileImageType(IFormFile? imageFile)
        {
            if (imageFile == null)
            {
                return true;
            }

            var fileType = imageFile.ContentType.ToLowerInvariant();
            
            return ALLOWED_PROFILE_IMAGE_FILE_TYPES.Contains(fileType);
        }
    }
}
