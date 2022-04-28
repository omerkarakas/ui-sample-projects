const audio = document.querySelector("audio");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

let currentSong = 3;

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeItem = document.getElementById("current-time");
const durationItem = document.getElementById("duration");


const songs = [
  {
    name: "jacinto-1",
    displayName: "Electri Chill Machine",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design"
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design"
  },
];

function play() {
  audio.play();
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
}

function pause() {
  audio.pause();
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
}


playButton.addEventListener("click", () => { audio.paused ? play() : pause() });


function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// default song
loadSong(songs[currentSong]);

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

function prevSong() {
  currentSong--;
  currentSong = (currentSong == -1) ? songs.length - 1 : currentSong;
  loadSong(songs[currentSong]);
  play();
}

function nextSong() {
  currentSong++;
  currentSong = (currentSong == songs.length) ? 0 : currentSong;
  loadSong(songs[currentSong]);
  play();
}

audio.addEventListener("timeupdate", updateProgressBar);

function updateProgressBar(e) {
  if (audio.paused)
    return;

  const { duration, currentTime } = e.srcElement;
  const currentProgress = (currentTime / duration) * 100;
  progress.style.width = currentProgress + "%";

  const durationMin = Math.floor(duration / 60);
  const durationSec = String(Math.floor(duration % 60)).padStart(2, '0');
  if (duration) {
    durationItem.textContent = `${durationMin}:${durationSec}`;
  }

  const currentMin = Math.floor(currentTime / 60);
  const currentSec = String(Math.floor(currentTime % 60)).padStart(2, '0');
  currentTimeItem.textContent = `${currentMin}:${currentSec}`;

}

progressContainer.addEventListener("click", setProgressBar);

function setProgressBar(e) {
  console.log(e);
  const width = e.target.clientWidth;
  const point = e.offsetX;

  const { duration } = audio;
  const targetTime = duration * point / width;

  audio.currentTime = targetTime;
}

audio.addEventListener("ended", nextSong);