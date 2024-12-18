using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models.Request;

public class SigninRequestModel
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}