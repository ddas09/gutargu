namespace Gutargu.Backend.Common.Models.Response;

public class UserContactResponseModel
{
    public required List<ContactInformation> Contacts { get; set; } = [];
}

public class ContactInformation
{
    public int UserId { get; set; }

    public required string UserName { get; set; }

    public string? ProfileImageUrl { get; set; }
}