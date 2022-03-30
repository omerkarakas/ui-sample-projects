function handleClick(){
    var buttonInnerHTML = this.innerHTML;
    playSound(buttonInnerHTML);
   
}

var numOfButtons = document.querySelectorAll(".drum").length;

for (var i=0;i<numOfButtons;i++){
  document.querySelectorAll(".drum")[i]
    .addEventListener("click",handleClick);
}


function playSound(chr){
    let audioFile;
    switch (chr) {
        case "k":
            audioFile = 'sounds/tom-1.mp3';
            break;
        case "a":
            audioFile = 'sounds/snare.mp3';
        break;
        case "s":
            audioFile = 'sounds/tom-2.mp3';
        break;
        case "d":
            audioFile = 'sounds/tom-3.mp3';
        break;
        case "j":
            audioFile = 'sounds/tom-4.mp3';
        break;
        case "w":
            audioFile = 'sounds/crash.mp3';
        break;
        case "l":
            audioFile = 'sounds/kick-bass.mp3';
        break;

        default:
            console.log("unsupported key pressed");
            break;
    }

    if (audioFile != null){
        let audio = new Audio(audioFile);
        buttonAnimation(chr);
        audio.play();
        buttonAnimation(chr);
   }

}


document.addEventListener("keydown",function(event){
    playSound(event.key);
});

function buttonAnimation(chr){

    var activeButton = document.querySelector("."+chr);

    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);
}