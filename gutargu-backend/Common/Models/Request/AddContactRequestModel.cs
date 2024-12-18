using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models.Request;

public class AddContactRequestModel
{
    [Required]
    public required int UserId { get; set; }

    [Required]
    [EmailAddress]
    public required string UserEmail { get; set; }

    [Required]
    public required int ContactUserId { get; set; }
}