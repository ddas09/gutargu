namespace Gutargu.Backend.Services.Contracts;

public interface ICryptographyService
{
    string Hash(string secret);

    bool Verify(string secret, string secretHash);
}