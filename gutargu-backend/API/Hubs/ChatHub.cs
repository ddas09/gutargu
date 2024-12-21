using Microsoft.AspNetCore.SignalR;
using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.API.Hubs;

public class ChatHub : Hub
{
    private readonly IHubConnectionManagerService _hubConnectionManager;

    public ChatHub(IHubConnectionManagerService hubConnectionManager)
    {
        _hubConnectionManager = hubConnectionManager;
    }
    
    public override Task OnConnectedAsync()
    {
        var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();
        if (!string.IsNullOrEmpty(userId))
        {
            _hubConnectionManager.AddConnection(userId, Context.ConnectionId);
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();
        if (userId != null)
        {
           _hubConnectionManager.RemoveConnection(userId);
        }

        return base.OnDisconnectedAsync(exception);
    }
}
