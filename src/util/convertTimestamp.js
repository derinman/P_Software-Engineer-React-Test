const timeStampToDatetime = (timestamp) => {
  let d = new Date(timestamp);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  minute = minute < 10 ? `0${minute}` : minute;
  let time = `${hour > 12 ? hour - 12 : hour}:${minute} ${
    hour >= 12 ? "PM" : "AM"
  }`;

  return `${year}-${month}-${date} ${time}`;
};

const timeStampToTime = (timestamp) => {
  let d = new Date(timestamp);

  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();

  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  let time = `${hour > 12 ? hour - 12 : hour}:${minute}:${second} ${
    hour >= 12 ? "PM" : "AM"
  }`;

  return time;
};

export { timeStampToDatetime, timeStampToTime };
