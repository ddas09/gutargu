using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;
using Gutargu.Backend.Common.Constants;
using Gutargu.Backend.Common.Exceptions;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Request;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Services;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IUserRepository _userRepository;
    private readonly ICryptographyService _cryptographyService;

    public AccountService(IMapper mapper, IImageService imageService, IUserRepository userRepository, ICryptographyService cryptographyService)
    {
        _mapper = mapper;
        _imageService = imageService;
        _userRepository = userRepository;
        _cryptographyService = cryptographyService;
    }

    public async Task<UserResponseModel> Signin(SigninRequestModel signinRequest)
    {
        var user = await this._userRepository.Get(u => u.Email == signinRequest.Email)
            ?? throw new ApiException(message: "User account with this email does not exist.", errorCode: AppConstants.ErrorCodeEnum.NotFound);

        bool isValidPassword = this._cryptographyService.Verify(signinRequest.Password, user.PasswordHash);
        if (!isValidPassword)
        {
            throw new ApiException(message: "Incorrect email or password provided.", errorCode: AppConstants.ErrorCodeEnum.Unauthorized);
        }

        var userInfo = this._mapper.Map<UserInformation>(user);
        if (user.ProfileImageUrl != null) 
        {
            userInfo.ProfileImageUrl = await this._imageService.GetImageURL(imageFilePath: user.ProfileImageUrl);
        }
        
        return new UserResponseModel
        {
            UserInfo = userInfo
        };
    }

    public async Task Signup(SignupRequestModel signupRequest, IFormFile? profileImage)
    {
        var user = await this._userRepository.Get(u => u.Email == signupRequest.Email);
        if (user != null)
        {
            throw new ApiException(message: "User account already exists with this email.", errorCode: AppConstants.ErrorCodeEnum.Conflict);
        }

        var newUser = this._mapper.Map<User>(signupRequest);
        newUser.PasswordHash = this._cryptographyService.Hash(signupRequest.Password);

        if (!this._imageService.IsValidProfileImageType(profileImage))
        {
            throw new ApiException(message: "Invalid image file type. Only JPG and PNG types allowed.", errorCode: AppConstants.ErrorCodeEnum.BadRequest);
        }

        if (profileImage != null)
        {
            newUser.ProfileImageUrl = await this._imageService.UploadImageAsync(profileImage);
        }
        newUser.CreatedBy = newUser.Email;
        newUser.UpdatedBy = newUser.Email;

        await this._userRepository.Add(newUser);
    }
}
