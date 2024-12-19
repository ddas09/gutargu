using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Common.Models.Mappings;

public class UserContactMappingProfile : Profile
{
    public UserContactMappingProfile()
    {
        CreateMap<UserContact, ContactInformation>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.ContactUser.Id))
            .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.ContactUser.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.ContactUser.Name))
            .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => src.ContactUser.ProfileImageUrl))
            .ForMember(dest => dest.LastChatId, opt => opt.MapFrom(src => src.LastChat.Id))
            .ForMember(dest => dest.LastChatMessage, opt => opt.MapFrom(src => src.LastChat.Message))
            .ForMember(dest => dest.LastChatSenderId, opt => opt.MapFrom(src => src.LastChat.SenderId))
            .ForMember(dest => dest.IsLastChatRead, opt => opt.MapFrom(src => src.LastChat == null || src.LastChat.IsRead));
    }
}