using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;

namespace Gutargu.Backend.DAL.Repositories;

public class UserBlockingRepository : CrudBaseRepository<UserBlocking>, IUserBlockingRepository
{
    public UserBlockingRepository(GutarguDBContext dbContext) : base(dbContext)
    {
    }
}

