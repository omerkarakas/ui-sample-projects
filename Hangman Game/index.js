const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
// const  = document.getElementById("");
// const  = document.getElementById("");

const figureParts = document.querySelectorAll(".figure-part");

//TODO : use an api instead
const words = ['javascript', "html", "programming", "reactjs", "nextjs", "webservice", "algorithm", "dynamic"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = []; // ["l", "t", "h", "m"];
const wrongLetters = [];

window.addEventListener("keydown", e => {

  console.log(e);
  if (e.keycode > 90 || e.keycode < 65) {
    return;
  }
  const letter = e.key.toLocaleLowerCase();
  console.log(letter);
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
})

function updateWrongLettersEl() {
  console.log("update wrong");
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }

}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => { notification.classList.remove("show") }, 2000);
}

function displayWord() {
  console.log(selectedWord);
  wordEl.innerHTML = `
  ${selectedWord
      .split("")
      .map(letter => `<span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
          </span>`)
      .join("")}
  `;
  console.log(wordEl.innerText);

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congrats !!!"
    popup.style.display = "flex";
  }
}


// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();