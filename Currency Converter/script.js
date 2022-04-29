const API_KEY = "8a93a20bfcb6bb40cb1fc59a";
const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");

const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const exchangeRateText = document.getElementById("rate");

const swapButton = document.getElementById("swap-btn");

let conversionRate = 1;

let API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`; //;/${cur1}/${cur2}`;

currencyOne.addEventListener("change", updateExchangeRate);

currencyTwo.addEventListener("change", updateExchangeRate);


async function updateExchangeRate() {
  try {
    const response = await fetch(API_URL + "/" + currencyOne.value + "/" + currencyTwo.value);
    const data = await response.json();

    conversionRate = +data.conversion_rate;

    exchangeRateText.textContent = getConversionValue();
  } catch (error) {
    alert("Error accessing the API");
  }

}


function getConversionValue() {
  const conversionValue = (conversionRate * (+amountOne.value)).toFixed(2);
  amountTwo.value = conversionValue;
  return amountOne.value + " " + currencyOne.value + " = " +
    conversionValue + " " + currencyTwo.value;
  ;
}

amountOne.addEventListener("change", () => {
  exchangeRateText.textContent = getConversionValue();
});

amountTwo.addEventListener("change", () => {
  exchangeRateText.textContent = getConversionValue();
});

swapButton.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  updateExchangeRate();

});


updateExchangeRate();

