using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.DAL.Entities;

public class User : BaseEntity
{
    [MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(254)]
    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    public string? ProfileImageUrl { get; set; }
}