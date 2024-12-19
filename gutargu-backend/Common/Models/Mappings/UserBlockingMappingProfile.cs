using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.Common.Models.Request;

namespace Gutargu.Backend.Common.Models.Mappings;

public class UserBlockingMappingProfile : Profile
{
    public UserBlockingMappingProfile()
    {
        CreateMap<UpdateBlockStatusRequestModel, UserBlocking>()
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.BlockingUserEmail))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.BlockingUserEmail));
    }
}