namespace Gutargu.Backend.DAL.Entities;

public class Chat : BaseEntity
{
    public int SenderId { get; set; }
    public User Sender { get; set; }

    public int ReceiverId { get; set; }
    public User Receiver { get; set; }

    public string Message { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }

    public bool IsRead { get; set; } = false;
}
