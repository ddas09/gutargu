using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models;

public class SignupRequestModel
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    public required string Password { get; set; }
}