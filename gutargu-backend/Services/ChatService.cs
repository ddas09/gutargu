using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Response;
using Gutargu.Backend.Common.Models.Request;
using System.Transactions;
using Gutargu.Backend.Common.Exceptions;
using Gutargu.Backend.Common.Constants;
using Microsoft.AspNetCore.SignalR;
using Gutargu.Backend.API.Hubs;

namespace Gutargu.Backend.Services;

public class ChatService : IChatService
{
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IChatRepository _chatRepository;
    private readonly IHubContext<ChatHub> _chatHubContext;
    private readonly IUserContactRepository _userContactRepository;

    public ChatService
    (
        IMapper mapper, 
        IImageService imageService, 
        IChatRepository chatRepository,
        IHubContext<ChatHub> hubContext,
        IUserContactRepository userContactRepository
    )
    {
        _mapper = mapper;
        _imageService = imageService;
        _chatRepository = chatRepository;
        _chatHubContext = hubContext;
        _userContactRepository = userContactRepository;
    }

    public async Task AddChat(AddChatRequestModel chatRequest, IFormFile? chatImage)
    {
        var newChat = this._mapper.Map<Chat>(chatRequest);

        if (chatImage != null)
        {
            newChat.ImageUrl = await this._imageService.UploadImageAsync(chatImage);
        }

        var senderContact = await GetContact(userId: chatRequest.ReceiverId, contactUserId: chatRequest.SenderId);
        var receiverContact = await GetContact(userId: chatRequest.SenderId, contactUserId: chatRequest.ReceiverId);

        using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        
        await this._chatRepository.Add(newChat);

        var contactsToUpdate = new List<UserContact>();

        senderContact.LastChatId = newChat.Id;
        senderContact.UpdatedDate = DateTime.UtcNow;
        senderContact.UpdatedBy = chatRequest.SenderEmail;
        contactsToUpdate.Add(senderContact);

        receiverContact.LastChatId = newChat.Id;
        receiverContact.UpdatedDate = DateTime.UtcNow;
        receiverContact.UpdatedBy = chatRequest.SenderEmail;
        contactsToUpdate.Add(receiverContact);

        await this._userContactRepository.UpdateRange(contactsToUpdate);

        var addedChat = this._mapper.Map<ChatInformation>(newChat);
        if (addedChat.ImageUrl != null)
        {
            addedChat.ImageUrl = await this._imageService.GetImageURL(addedChat.ImageUrl);
        }

        scope.Complete();

        // We need to find a better way to manage these connections
        // Probably a seperate singleton service for this
        if (ChatHub._userConnections.TryGetValue(chatRequest.ReceiverId.ToString(), out var connectioId))
        {
            await _chatHubContext.Clients.Client(connectioId)
                .SendAsync("RecieveChat", addedChat);
        }
    }

    public async Task<ChatResponseModel> GetChats(int senderId, int recieverId)
    {
        // We need to fetch all the chats sent or recieved between these users
        var chatEntities = await this._chatRepository
            .GetList(
                predicate: c => (c.SenderId == senderId && c.ReceiverId == recieverId)
                    || (c.SenderId == recieverId && c.ReceiverId == senderId)
            );

        var chats = this._mapper.Map<List<ChatInformation>>(chatEntities);
        foreach (var chat in chats)
        {
            if (chat.ImageUrl != null)
            {
                chat.ImageUrl = await this._imageService.GetImageURL(chat.ImageUrl);
            }

            chat.IsSentByCurrentUser = chat.SenderId == senderId;
        }

        return new ChatResponseModel
        {
            Chats = chats
        };
    }

    public async Task UpdateChatStatus(UpdateChatStatusRequestModel request)
    {
        var chat = await this._chatRepository.Get(c => c.Id == request.ChatId)
            ?? throw new ApiException("Chat doesn't exist.", AppConstants.ErrorCodeEnum.BadRequest);

        chat.IsRead = true;
        chat.UpdatedBy = request.RecieverEmail;
        chat.UpdatedDate = DateTime.UtcNow;

        await this._chatRepository.Update(chat);
    }

    private async Task<UserContact> GetContact(int userId, int contactUserId)
    {
        return await this._userContactRepository
            .Get(uc => uc.UserId == userId && uc.ContactUserId == contactUserId)
                ?? throw new ApiException("Add user to contact to send messages.", AppConstants.ErrorCodeEnum.BadRequest);
    }
}
