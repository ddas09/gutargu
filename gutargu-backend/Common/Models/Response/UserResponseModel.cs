namespace Gutargu.Backend.Common.Models.Response;

public class UserResponseModel
{
    public required UserInformation UserInfo { get; set; }
}

public class UserSearchResponseModel
{
    public required List<UserInformation> Users { get; set; } = [];
}

public class UserInformation
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? ProfileImageUrl { get; set; }
}