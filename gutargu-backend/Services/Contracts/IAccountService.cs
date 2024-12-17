using Gutargu.Backend.Common.Models;

namespace Gutargu.Backend.Services.Contracts;

public interface IAccountService
{
    Task Signup(SignupRequestModel signupRequest, IFormFile? profileImage);
}