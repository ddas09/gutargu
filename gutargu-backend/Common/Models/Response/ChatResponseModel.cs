namespace Gutargu.Backend.Common.Models.Response;

public class ChatResponseModel
{
    public required List<ChatInformation> Chats { get; set; } = [];
}

public class ChatInformation
{
    public int Id { get; set; }

    public int SenderId { get; set; }

    public required string Message { get; set; }

    public string? ImageUrl { get; set; }

    public bool IsRead { get; set; }

    public bool IsSentByCurrentUser { get; set; }

    public DateTime SentAt { get; set; }
}