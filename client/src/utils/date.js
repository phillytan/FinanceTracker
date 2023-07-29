export const getDateString = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const getDatesOfPastMonth = () => {
  const currentDate = new Date();
  const startDate = getDateOfLastMonth(currentDate);

  const datesList = [];

  let currentDateIterator = new Date(startDate);
  while (currentDateIterator <= currentDate) {
    const year = currentDateIterator.getFullYear();
    const month = String(currentDateIterator.getMonth() + 1).padStart(2, "0");
    const day = String(currentDateIterator.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    datesList.push(formattedDate);
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }
  return datesList;
};

export const getDateOfLastMonth = (currentDate) => new Date(new Date().setDate(currentDate.getDate() - 30))
