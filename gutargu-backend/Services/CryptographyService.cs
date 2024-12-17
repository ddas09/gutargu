using BC = BCrypt.Net.BCrypt;
using Gutargu.Backend.Services.Contracts;

namespace Gutargu.Backend.Services;

public class CryptographyService : ICryptographyService
{
    public string Hash(string secret)
    {
        return BC.EnhancedHashPassword(secret);
    }

    public bool Verify(string secret, string secretHash)
    {
       return BC.EnhancedVerify(secret, secretHash);
    }
}