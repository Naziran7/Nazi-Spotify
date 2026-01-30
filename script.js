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

// Song List
let songs = [
  {
    songName: "As it was",
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

// Load song list covers and names
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// Helper function to reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    },
  );
};

// Play / Pause Master Button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.replace("fa-play", "fa-pause");

    resetSongImages();
    songItems[songIndex].getElementsByTagName("img")[0].src = "./playing.gif";
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause", "fa-play");

    resetSongImages();
  }
});

// Update progress bar as audio plays
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100,
  );
  myprogressbar.value = progress || 0;
});

// Seek audio when progress bar changes
myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});

// Play specific song when clicking song item play button
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", () => {
      makeAllPlays();
      resetSongImages();

      songIndex = i;
      element.classList.remove("fa-play");
      element.classList.add("fa-pause");

      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0;
      audioElement.play();

      // 🔥 show playing.gif ONLY for active song
      songItems[songIndex].getElementsByTagName("img")[0].src = "./playing.gif";

      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");

      songInfoDisplay.innerHTML = `
        <img src="./playing.gif" width="42px" />
        ${songs[songIndex].songName}
      `;
    });
  },
);

// Auto-update master info when song changes manually
audioElement.addEventListener("ended", () => {
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
  if (gif) gif.style.opacity = 0;
  makeAllPlays();
});
previous.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }

  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");

  songInfoDisplay.innerHTML = `<img src="${songs[songIndex].coverPath}" width="42px" /> ${songs[songIndex].songName}`;
  if (gif) gif.style.opacity = 1;
});
next.addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");

  songInfoDisplay.innerHTML = `<img src="${songs[songIndex].coverPath}" width="42px" /> ${songs[songIndex].songName}`;
  if (gif) gif.style.opacity = 1;
});
const resetSongImages = () => {
  songItems.forEach((item, i) => {
    item.getElementsByTagName("img")[0].src = songs[i].coverPath;
  });
};
