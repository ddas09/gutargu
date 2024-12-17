using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;

namespace Gutargu.Backend.DAL.Repositories;

public class UserRepository : CrudBaseRepository<User>, IUserRepository
{
    public UserRepository(GutarguDBContext dbContext) : base(dbContext)
    {
    }
}

