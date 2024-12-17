using Gutargu.Backend.API.Middlewares;

namespace Gutargu.Backend.API.Extensions;

public static class MiddlewareCollection
{
    public static void ConfigureMiddlewares(this IApplicationBuilder app)
    {
        app.UseMiddleware<GlobalExceptionMiddleware>();
    }
}


