namespace Gutargu.Backend.DAL.Entities;

public class UserBlocking : BaseEntity
{
    // The user who has been blocked
    public int BlockedUserId { get; set; }
    public User BlockedUser { get; set; }

    // The user who has blocked the other user
    public int BlockingUserId { get; set; }
    public User BlockingUser { get; set; }
}