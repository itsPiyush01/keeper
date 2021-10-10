const dateFormatter = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  let output;
  if (year === new Date().getFullYear()) {
    output = day + " " + month;
  } else {
    output = day + " " + month + " " + year;
  }
  return output;
};

export default dateFormatter;
