using AutoMapper;
using Gutargu.Backend.DAL.Entities;

namespace Gutargu.Backend.Common.Models.Mappings;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<SignupRequestModel, User>();
    }
}