namespace Gutargu.Backend.Common.Extensions;

public static class DateTimeExtensions
{
    public static string ToCustomChatDateFormat(this DateTime date)
    {
        var today = DateTime.Today;

        // Check if the date is today, yesterday, or older
        if (date.Date == today)
        {
            return $"Today at {date.ToString("hh:mm tt").ToUpper()}";
        }
        if (date.Date == today.AddDays(-1))
        {
            return $"Yesterday at {date.ToString("hh:mm tt").ToUpper()}";
        }

        // Format the date with ordinal suffix for the day
        string daySuffix = date.Day switch
        {
            1 or 21 or 31 => "st",
            2 or 22 => "nd",
            3 or 23 => "rd",
            _ => "th"
        };

        return $"{date.Day}{daySuffix} {date:MMMM, yyyy} at {date:hh:mm tt}".ToUpper();
    }
}
