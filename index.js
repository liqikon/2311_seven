const lyrics = "I'm super sy, super shy But wait a minute while I make you mine make you mine you're on my mind all the time I wanna tell you but I'm super shy, super shy I'm super shy, super shy But wait a minute while I make you mine make you mine you're on my mind all the time I wanna tell you but I'm super shy, super shy And I wanna go out with you, where you wanna go? Find a lil' spot, just sit and talk";
const lyricsContainer = document.getElementById("lyrics");

let index = 0;
let timer;

function addLetter() {
  if (index < lyrics.length) {
    lyricsContainer.innerHTML += lyrics[index];
    index++;
    timer = setTimeout(addLetter, 100);
  }
}

addLetter();
