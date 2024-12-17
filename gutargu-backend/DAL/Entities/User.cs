using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.DAL.Entities;

public class User : BaseEntity
{
    [MaxLength(254)]
    public required string Email { get; set; }

    public required string PasswordHash { get; set; }
}