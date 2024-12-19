using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models.Request;

public class AddChatRequestModel
{
    [Required]
    public required int SenderId { get; set; }

    [Required]
    public required int ReceiverId { get; set; }

    [Required]
    public required string Message { get; set; }

    [Required]
    public string SenderEmail { get; set; }
}