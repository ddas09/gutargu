using Microsoft.AspNetCore.SignalR;

namespace Gutargu.Backend.API.Hubs;

public class ChatHub : Hub
{
    // We need to find a better way to manage these connections
    // Probably a seperate singleton service for this
    public static readonly Dictionary<string, string> _userConnections = [];

    public override Task OnConnectedAsync()
    {
        var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();
        if (!string.IsNullOrEmpty(userId))
        {
            _userConnections[userId] = Context.ConnectionId;
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = _userConnections.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
        if (userId != null)
        {
            _userConnections.Remove(userId);
        }

        return base.OnDisconnectedAsync(exception);
    }
}
