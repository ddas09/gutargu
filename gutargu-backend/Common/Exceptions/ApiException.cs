using Gutargu.Backend.Common.Constants;

namespace Gutargu.Backend.Common.Exceptions;

public class ApiException : Exception
{
    public AppConstants.ErrorCodeEnum ErrorCode { get; set; }

    public ApiException(string message, AppConstants.ErrorCodeEnum errorCode) 
        : base(message) 
    {
        this.ErrorCode = errorCode;
    }
}
