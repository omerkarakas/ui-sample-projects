const h3 = document.querySelector("#current");
const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");
const body = document.querySelector('body');


let alterBackgroundColor = function(){
    let currentValue = "linear-gradient(to right, "+color1.value+" , "+color2.value+")"
    body.style.background = currentValue;
    h3.textContent = currentValue+";";
};

color1.addEventListener('input',alterBackgroundColor);

color2.addEventListener('input',alterBackgroundColor);

function copySelection(){
    navigator.clipboard.writeText(h3.textContent);
    alert("Gradient copied: "+ h3.textContent);
}