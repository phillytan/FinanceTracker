export const getDateString = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

export const getDatesOfPastMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDay()

    const startDate = new Date(currentYear, currentMonth - 1, currentDay);
  
    const endDate = new Date(currentYear, currentMonth, currentDay);
  
    const datesList = [];
  
    let currentDateIterator = new Date(startDate);
    while (currentDateIterator <= endDate) {
        const year = currentDateIterator.getFullYear();
        const month = String(currentDateIterator.getMonth() + 1).padStart(2, '0');
        const day = String(currentDateIterator.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        datesList.push(formattedDate);
        currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }
  
    return datesList;
  };