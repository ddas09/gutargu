class DateUtility {

    // Static method to format the date sentAt
    static formatDate(sentAt: string): string {
      // Create a Date object from the provided UTC string (sentAt)
      const date = new Date(sentAt); 
  
      // Get today's date and reset the time to midnight for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
  
      // Create a Date object for yesterday by subtracting 1 day from today
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
  
      // Extract hours and minutes from the date object
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Format the time to 12-hour format (e.g., "1:45 PM")
      const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`.toUpperCase();
  
      // Check if the date is today, and return the formatted string
      if (date >= today) {
        return `Today at ${formattedTime}`;
      }
  
      // Check if the date is yesterday, and return the formatted string
      if (date >= yesterday) {
        return `Yesterday at ${formattedTime}`;
      }
  
      // For dates older than yesterday, format the date with an ordinal suffix (e.g., "21st", "2nd")
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
      const year = date.getFullYear(); // Get the year of the date
  
      // Function to determine the ordinal suffix based on the day of the month
      const suffix = (day: number): string => {
        if (day === 1 || day === 21 || day === 31) return 'st';
        if (day === 2 || day === 22) return 'nd';
        if (day === 3 || day === 23) return 'rd';
        return 'th'; // Default for all other days
      };
  
      // Return the formatted string (e.g., "21st December, 2024 at 1:45 PM")
      return `${day}${suffix(day)} ${month}, ${year} at ${formattedTime}`;
    }
}
  
export default DateUtility;
  