using Microsoft.AspNetCore.Mvc;
using Gutargu.Backend.API.Models;
using Gutargu.Backend.API.ActionFilters;
using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.Controllers;

/// <summary>
/// Controller responsible for querying and managing user chats.
/// </summary>
/// <param name="chatService">The chat service for handling user chats related operations.</param>
[ApiController]
[ValidateModelState]
[Route("api/chats")]
public class ChatController(IChatService chatService) : ControllerBase
{
    private readonly CustomResponse _customResponse = new();
    private readonly IChatService _chatService = chatService;

    /// <summary>
    /// Returns the chats associated with the sender and reciever.
    /// </summary>
    /// <param name="senderId">The sender who sent the chats.</param>
    /// <param name="recieverId">The reciever of the chats. This is the currently logged in user.</param>
    [HttpGet]
    public async Task<IActionResult> GetChats(int senderId, int recieverId)
    {
        var chatResponse = await this._chatService.GetChats(senderId, recieverId);
        return _customResponse.Success(data: chatResponse);
    }
}