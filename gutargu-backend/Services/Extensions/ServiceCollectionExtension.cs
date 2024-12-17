using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.Services.Extensions;

public static class ServiceCollection
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<IAccountService, AccountService>();
    }
}


