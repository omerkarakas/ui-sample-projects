const inputContainer = document.getElementById("input-container");
const countdownForm  = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");
const titleEl = document.getElementById("title");
// const  = document.getElementById("");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate ="";
let countdownValue = new Date();

let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//set min date to today
var today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min",today);


countdownForm.addEventListener("submit",updateCountdown);

function updateCountdown(e){
    e.preventDefault();

    countdownTitle = titleEl.value;
    countdownDate = dateEl.value;
    
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem("countdown",JSON.stringify(savedCountdown));

    if(!countdownDate){
        alert("Please select a date for the countdown")
        return;
    }
    countdownValue = new Date(countdownDate).getTime();
    countdownActive = setInterval(updateDOM,1000);
    updateDOM();
}


function updateDOM(){
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance%day)/hour);
    const mins = Math.floor((distance%hour)/minute);
    const secs = Math.floor((distance%minute)/second);

    inputContainer.hidden = true;

    //completing
    if(distance<0){
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
        return;
    }


    countdownElTitle.textContent=`${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${mins}`;
    timeElements[3].textContent = `${secs}`;
    
    countdownEl.hidden = false;
    completeEl.hidden = true;
    
}


countdownButton.addEventListener("click", resetCountdown);

function resetCountdown(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    clearInterval(countdownActive);

    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
}

completeBtn.addEventListener("click",resetCountdown);

function restorePrevCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        countdownActive = setInterval(updateDOM,1000);
        updateDOM();
    }
}
restorePrevCountdown();