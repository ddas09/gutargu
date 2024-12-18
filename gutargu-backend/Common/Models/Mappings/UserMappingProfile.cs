using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.Common.Models.Request;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Common.Models.Mappings;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<User, UserInformation>();

        CreateMap<SignupRequestModel, User>();
    }
}