namespace Gutargu.Backend.Common.Models.Response;

public class UserContactResponseModel
{
    public required List<ContactInformation> Contacts { get; set; } = [];
}

public class ContactInformation
{
    public int UserId { get; set; }

    public required string UserEmail { get; set; }

    public required string UserName { get; set; }

    public string? ProfileImageUrl { get; set; }

    public int? LastChatId { get; set; }

    public string LastChatMessage { get; set; } = string.Empty;

    public bool IsLastChatRead { get; set; } = true;

    public int? LastChatSenderId { get; set; }

    public bool IsLastChatSentByContact { get; set; } = true;
}