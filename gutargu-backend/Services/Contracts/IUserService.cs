using Gutargu.Backend.Common.Models.Request;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Services.Contracts;

public interface IUserService
{
    Task<UserSearchResponseModel> Search(int currentUserId, string searchKey);

    Task AddContact(AddContactRequestModel contactRequest);

    Task<UserContactResponseModel> GetContacts(int currentUserId);
}