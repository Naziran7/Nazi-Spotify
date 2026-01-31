console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio("audio/As_it.mp3");

let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressbar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songInfoDisplay = document.querySelector(".songinfo");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let gif = document.getElementById("gif");

// Song List
let songs = [
  {
    songName: "As It Was",
    filePath: "audio/As_it.mp3",
    coverPath: "cover/cover.jpg",
  },
  {
    songName: "Blinding Lights",
    filePath: "audio/Blinding.mp3",
    coverPath: "cover/cover.jpg",
  },
  {
    songName: "One Dance",
    filePath: "audio/Drake.mp3",
    coverPath: "cover/cover.jpg",
  },
  {
    songName: "Shape of You",
    filePath: "audio/Shape.mp3",
    coverPath: "cover/cover.jpg",
  },
  {
    songName: "Starboy",
    filePath: "audio/Starboy.mp3",
    coverPath: "cover/cover.jpg",
  },
  {
    songName: "Stay",
    filePath: "audio/Stay.mp3",
    coverPath: "cover/cover.jpg",
  },
];

// Load song names & covers
songItems.forEach((item, i) => {
  item.querySelector("img").src = songs[i].coverPath;
  item.querySelector(".songname").innerText = songs[i].songName;
});

// Helpers
const makeAllPlays = () => {
  document.querySelectorAll(".songItemPlay").forEach((icon) => {
    icon.classList.replace("fa-pause", "fa-play");
  });
};

const resetSongImages = () => {
  songItems.forEach((item, i) => {
    item.querySelector("img").src = songs[i].coverPath;
  });
};

// Master Play
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.replace("fa-play", "fa-pause");

    resetSongImages();
    songItems[songIndex].querySelector("img").src = "./playing.gif";

    songInfoDisplay.innerHTML = `
      <img src="./playing.gif" width="42px" />
      ${songs[songIndex].songName}
    `;
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause", "fa-play");
    resetSongImages();
  }
});

// Progress bar
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    myprogressbar.value =
      (audioElement.currentTime / audioElement.duration) * 100;
  }
});

myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});

// Song item click
document.querySelectorAll(".songItemPlay").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    makeAllPlays();
    resetSongImages();

    songIndex = i;
    btn.classList.replace("fa-play", "fa-pause");

    audioElement.src = songs[i].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    songItems[i].querySelector("img").src = "./playing.gif";
    masterPlay.classList.replace("fa-play", "fa-pause");

    songInfoDisplay.innerHTML = `
      <img src="./playing.gif" width="42px" />
      ${songs[i].songName}
    `;
  });
});

// Previous
previous.addEventListener("click", () => {
  songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
  playCurrentSong();
});

// Next
next.addEventListener("click", () => {
  songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
  playCurrentSong();
});

// Play helper
function playCurrentSong() {
  makeAllPlays();
  resetSongImages();

  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  songItems[songIndex]
    .querySelector(".songItemPlay")
    .classList.replace("fa-play", "fa-pause");

  songItems[songIndex].querySelector("img").src = "./playing.gif";
  masterPlay.classList.replace("fa-play", "fa-pause");

  songInfoDisplay.innerHTML = `
    <img src="./playing.gif" width="42px" />
    ${songs[songIndex].songName}
  `;
}
