let quotes = [];

const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

// Getting All Quotes

async function getQuotes(){
  const apiURL= "https://type.fit/api/quotes" ;
  loading();
  try{
    const response = await fetch(apiURL);
    quotes = await response.json();

    //console.log(quotes);
    randomQuote();
  }catch(e){
    quotes = localQuotes;
    randomQuote();
    alert("Some issues accessing api service, so showing local quotes");
  }
}

// Selecting one to show
function randomQuote(){
  loading();
  let lucky = Math.floor(Math.random()*quotes.length);
  const quote = quotes[lucky];

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author??"Unknown";

  // for long quotes, use a smaller font
  if (quote.text.length>80)
    quoteText.classList.add("long-quote");
  else 
    quoteText.classList.remove("long-quote");

  loadingComplete();
}


getQuotes();
//randomQuote();

function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click',randomQuote);

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

