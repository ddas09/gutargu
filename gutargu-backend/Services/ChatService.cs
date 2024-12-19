using AutoMapper;
using Gutargu.Backend.DAL.Contracts;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Services;

public class ChatService : IChatService
{
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IChatRepository _chatRepository;

    public ChatService(IMapper mapper, IImageService imageService, IChatRepository chatRepository)
    {
        _mapper = mapper;
        _imageService = imageService;
        _chatRepository = chatRepository;
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
}
