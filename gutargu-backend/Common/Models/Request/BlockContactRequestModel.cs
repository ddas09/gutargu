using System.ComponentModel.DataAnnotations;

namespace Gutargu.Backend.Common.Models.Request;

public class UpdateBlockStatusRequestModel
{
    [Required]
    // The user who has been blocked
    public int BlockedUserId { get; set; }

    // The user who has blocked the other user
    [Required]
    public int BlockingUserId { get; set; }

    [Required]
    public string BlockingUserEmail { get; set; }

    [Required]
    public bool ShouldBlock { get; set; }
}