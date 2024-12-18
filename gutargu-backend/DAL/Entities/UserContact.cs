namespace Gutargu.Backend.DAL.Entities;

public class UserContact : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int ContactUserId { get; set; }
    public User ContactUser { get; set; }
}