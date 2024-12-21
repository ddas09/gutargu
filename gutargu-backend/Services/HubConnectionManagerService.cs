using System.Collections.Concurrent;
using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.Services
{
    public class HubConnectionManagerService : IHubConnectionManagerService
    {
        // A thread-safe dictionary to store user connections
        private readonly ConcurrentDictionary<string, string> _userConnections = new();

        public void AddConnection(string userId, string connectionId)
        {
            _userConnections[userId] = connectionId;
        }

        public void RemoveConnection(string userId)
        {
            _userConnections.TryRemove(userId, out _);
        }

        public string? GetConnectionId(string userId)
        {
            _userConnections.TryGetValue(userId, out var connectionId);
            return connectionId;
        }
    }
}
