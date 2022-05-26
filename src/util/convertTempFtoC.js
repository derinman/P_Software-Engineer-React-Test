const fToC = (fahrenheit) => {
  let fTemp = Number(fahrenheit);
  let fToCel = ((fTemp - 32) * 5) / 9;
  return Math.round(fToCel * 10) / 10;
};

export default fToC;
