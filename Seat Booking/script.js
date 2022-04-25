const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

function initUI(){
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats.length>0){
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index)>-1){
        seat.classList.add("selected");
      }
    }
    );
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null){
    movieSelect.selectedIndex=selectedMovieIndex;
  }

}

function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  console.log(selectedSeats); 
  const seatsIndex = [...selectedSeats].map( 
      seat =>  [...seats].indexOf(seat)
  );

//  console.log(seatsIndex);
localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  
  ticketPrice = +movieSelect.value;

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length*ticketPrice;
}


movieSelect.addEventListener("change",e =>{
  ticketPrice = +e.target.value;
  localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
  updateSelectedCount();
});

container.addEventListener('click', e=>{
  //e.preventDefault();
  if (! e.target.classList.contains("seat") ||
      e.target.classList.contains("occupied"))
    return;
     
  e.target.classList.toggle("selected");
  
  updateSelectedCount();

});

initUI();
updateSelectedCount();
