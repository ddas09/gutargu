using Gutargu.Backend.DAL.Contracts;
using Gutargu.Backend.DAL.Repositories;

namespace Gutargu.Backend.DAL.Extensions;

public static class RepositoryCollection
{
    public static void RegisterRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
    }
}


