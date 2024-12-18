using Gutargu.Backend.Common.Models.Request;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Services.Contracts;

public interface IAccountService
{
    Task<UserResponseModel> Signin(SigninRequestModel signinRequest);
    
    Task Signup(SignupRequestModel signupRequest, IFormFile? profileImage);
}