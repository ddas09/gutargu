using AutoMapper;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.Common.Models.Request;
using Gutargu.Backend.Common.Models.Response;

namespace Gutargu.Backend.Common.Models.Mappings;

public class ChatMappingProfile : Profile
{
    public ChatMappingProfile()
    {
        CreateMap<Chat, ChatInformation>()
            .ForMember(dest => dest.SentAt, opt => opt.MapFrom(src => src.CreatedDate));
    
        CreateMap<AddChatRequestModel, Chat>()
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.SenderEmail))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.SenderEmail));
    }
}