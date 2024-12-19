using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models.Request;

public class UpdateChatStatusRequestModel
{
    [Required]
    public required int ChatId { get; set; }

    public required string RecieverEmail { get; set; }
}