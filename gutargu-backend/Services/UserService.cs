using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;
using Gutargu.Backend.Common.Constants;
using Gutargu.Backend.Common.Exceptions;
using Gutargu.Backend.Services.Contracts;
using Gutargu.Backend.Common.Models.Response;
using Gutargu.Backend.Common.Models.Request;

namespace Gutargu.Backend.Services;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IUserRepository _userRepository;
    private readonly IUserContactRepository _userContactRepository;

    public UserService(IMapper mapper, IImageService imageService, IUserRepository userRepository, IUserContactRepository userContactRepository)
    {
        _mapper = mapper;
        _imageService = imageService;
        _userRepository = userRepository;
        _userContactRepository = userContactRepository;
    }

    public async Task<UserSearchResponseModel> Search(int currentUserId, string searchKey)
    {
        if (string.IsNullOrWhiteSpace(searchKey))
        {
            throw new ApiException(message: "Please enter a name or email to search user(s).", 
                errorCode: AppConstants.ErrorCodeEnum.BadRequest);
        }

        string searchFilter = searchKey.Trim().ToLower();
        var users = await this._userRepository
            .GetList(
                predicate: u => u.Id != currentUserId 
                    && (u.Name.ToLower().Contains(searchFilter) 
                        || u.Email.ToLower().Contains(searchFilter))
            );

        var matchedUsers = this._mapper.Map<List<UserInformation>>(users);
        foreach (var user in matchedUsers)
        {
            if (user.ProfileImageUrl != null)
            {
                user.ProfileImageUrl = await this._imageService.GetImageURL(user.ProfileImageUrl);
            }
        }

        return new UserSearchResponseModel
        {
            Users = matchedUsers
        };
    }

    public async Task AddContact(AddContactRequestModel contactRequest)
    {
        var existingContact = await this._userContactRepository
            .Get(predicate: uc => uc.UserId == contactRequest.UserId && uc.ContactUserId == contactRequest.ContactUserId);

        if (existingContact != null)
        {
            throw new ApiException(message: "User already added.", 
                errorCode: AppConstants.ErrorCodeEnum.Conflict);
        }

        var contacts = new List<UserContact>();

        var currentUserContact = new UserContact
        {
            UserId = contactRequest.UserId,
            ContactUserId = contactRequest.ContactUserId,
            CreatedBy = contactRequest.UserEmail,
            UpdatedBy = contactRequest.UserEmail
        };
        contacts.Add(currentUserContact);

        var otherUserContact = new UserContact
        {
            UserId = contactRequest.ContactUserId,
            ContactUserId = contactRequest.UserId,
            CreatedBy = contactRequest.UserEmail,
            UpdatedBy = contactRequest.UserEmail
        };
        contacts.Add(otherUserContact);

        await this._userContactRepository.AddRange(contacts);
    }

    public async Task<UserContactResponseModel> GetContacts(int currentUserId)
    {
        var userContacts = await this._userContactRepository
            .GetList
            (
                predicate: uc => uc.UserId == currentUserId,
                includes: [
                    nameof(UserContact.ContactUser),
                    nameof(UserContact.LastChat)
                ]
            );

        var contacts = this._mapper.Map<List<ContactInformation>>(userContacts);
        foreach (var contact in contacts)
        {
            if (contact.ProfileImageUrl != null)
            {
                contact.ProfileImageUrl = await this._imageService.GetImageURL(contact.ProfileImageUrl);
            }

            contact.IsLastChatSentByContact = contact.LastChatSenderId == contact.UserId;
        }

        return new UserContactResponseModel
        {
            Contacts = contacts
        };
    }
}
