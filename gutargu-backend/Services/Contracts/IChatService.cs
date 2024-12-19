using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Services.Contracts;

public interface IChatService
{
    Task<ChatResponseModel> GetChats(int senderId, int recieverId);
}