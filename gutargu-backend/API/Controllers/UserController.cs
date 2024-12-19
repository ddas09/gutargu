using Microsoft.AspNetCore.Mvc;
using Gutargu.Backend.API.Models;
using Gutargu.Backend.API.ActionFilters;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Request;

namespace Gutargu.Backend.Controllers;

/// <summary>
/// Controller responsible for querying and managing user informations.
/// </summary>
/// <param name="userService">The user service for handling user related operations.</param>
[ApiController]
[ValidateModelState]
[Route("api/users")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly CustomResponse _customResponse = new();
    private readonly IUserService _userService = userService;

    /// <summary>
    /// Returns the users informations that match the serach filter.
    /// </summary>
    /// <param name="userId">The current user id who is making the request.</param>
    /// <param name="searchKey">This will be matched against users name / email to filter records.</param>
    [HttpGet("[action]")]
    public async Task<IActionResult> Search(int userId, string searchKey)
    {
        var searchResponse = await this._userService.Search(currentUserId: userId, searchKey: searchKey);
        return _customResponse.Success(data: searchResponse);
    }

    /// <summary>
    /// Add a user to the current user's contact.
    /// </summary>
    /// /// <param name="contactRequest">Model containing the contact to add.</param>
    [HttpPost("contacts")]
    public async Task<IActionResult> AddContact(AddContactRequestModel contactRequest)
    {
        await this._userService.AddContact(contactRequest);
        return _customResponse.Success("User added successfully.");
    }

    /// <summary>
    /// Retuens all the contacts for the current user.
    /// </summary>
    /// /// <param name="userId">The current user id who is making the request.</param>
    [HttpGet("contacts")]
    public async Task<IActionResult> GetContacts(int userId)
    {
        var contactResponse = await this._userService.GetContacts(userId);
        return _customResponse.Success(data: contactResponse);
    }

    /// <summary>
    /// Blocks/unblocks a user contact.
    /// </summary>
    /// /// <param name="blockRequest">The request containing the contact to block.</param>
    [HttpPut("contacts/block")]
    public async Task<IActionResult> BlockContact(UpdateBlockStatusRequestModel blockRequest)
    {
        await this._userService.UpdateBlockStatus(blockRequest);
        return _customResponse.Success("Contact has been blocked successfully.");
    }
}
