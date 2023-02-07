const config = require("../config");
var myHeaders = new Headers();
myHeaders.append("apikey", config.exchangeApiKey);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
const getExchange = async (amount) => {
  const url = `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=COP&amount=${amount}`;
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = getExchange;
