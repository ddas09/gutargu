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
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.ContactUser.Name))
            .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => src.ContactUser.ProfileImageUrl));
    }
}