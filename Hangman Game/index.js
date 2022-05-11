const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
// const  = document.getElementById("");
// const  = document.getElementById("");

const figureParts = document.querySelectorAll(".figure-part");

//TODO : use an api instead
const words = ['javascript', "html", "programming", "reactjs", "nextjs"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["l", "t", "h", "m"];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
      .split("")
      .map(letter => `<span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}</span>`)
      .join("")}
  `;
  console.log(wordEl.innerText);

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congrats !!!"
    popup.style.display = "flex";
  }
}

displayWord();