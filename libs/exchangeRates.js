const config = require("../config");
var myHeaders = new Headers();
myHeaders.append("apikey", config.exchangeApiKey);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
const getExchange = (amount) => {
  const url = `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=COP&amount=${amount}`;
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => result.result)
    .catch((error) => console.log("error", error));
};

module.exports = getExchange;
