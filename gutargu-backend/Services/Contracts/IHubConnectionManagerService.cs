namespace Gutargu.Backend.Services.Contracts;

public interface IHubConnectionManagerService
{
    void AddConnection(string userId, string connectionId);

    void RemoveConnection(string userId);
    
    string? GetConnectionId(string userId);
}