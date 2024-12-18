using Microsoft.AspNetCore.Mvc;
using Gutargu.Backend.API.Models;
using Gutargu.Backend.API.ActionFilters;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Request;

namespace Gutargu.Backend.Controllers;

/// <summary>
/// Controller responsible for managing user account operations.
/// </summary>
/// <param name="accountService">The Account service for handling user account related operations.</param>
[ApiController]
[ValidateModelState]
[Route("api/accounts")]
public class AccountController(IAccountService accountService) : ControllerBase
{
    private readonly CustomResponse _customResponse = new();
    private readonly IAccountService _accountService = accountService;

    /// <summary>
    /// Registers a new user account.
    /// </summary>
    /// <param name="signupRequest">The signup request containing user details.</param>
    /// <param name="profileImage">The profile image of the user.</param>
    [HttpPost("[action]")]
    public async Task<IActionResult> Signup([FromForm] SignupRequestModel signupRequest, IFormFile? profileImage)
    {
        await this._accountService.Signup(signupRequest, profileImage);
        return _customResponse.Success(message: "Account created successfully.");
    }

    /// <summary>
    /// Authenticates a user and returns user informations.
    /// </summary>
    /// <param name="signinRequest">The request containing user credentials.</param>
    [HttpPost("[action]")]
    public async Task<IActionResult> Signin(SigninRequestModel signinRequest)
    {
        var user = await _accountService.Signin(signinRequest);
        return _customResponse.Success(message: "User logged in successfully", data: user);   
    }
}
