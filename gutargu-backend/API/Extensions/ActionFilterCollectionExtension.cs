using Gutargu.Backend.API.ActionFilters;

namespace Gutargu.Backend.API.Extensions;

public static class ActionFilterCollection
{
    public static void RegisterActionFilters(this IServiceCollection services)
    {
        services.AddScoped<ValidateModelStateAttribute>();
    }
}
