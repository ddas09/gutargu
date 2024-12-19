using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;

namespace Gutargu.Backend.DAL.Repositories;

public class ChatRepository : CrudBaseRepository<Chat>, IChatRepository
{
    public ChatRepository(GutarguDBContext dbContext) : base(dbContext)
    {
    }
}

