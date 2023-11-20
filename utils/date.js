export function formatDateToISO(dateString) {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    // Get the parts of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
}
  