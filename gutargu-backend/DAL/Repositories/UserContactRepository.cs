using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;

namespace Gutargu.Backend.DAL.Repositories;

public class UserContactRepository : CrudBaseRepository<UserContact>, IUserContactRepository
{
    public UserContactRepository(GutarguDBContext dbContext) : base(dbContext)
    {
    }
}

