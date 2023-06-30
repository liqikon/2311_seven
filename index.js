

const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const audioPlayer = document.getElementById("audio-player");
const disk = document.querySelector('.disk');

playButton.addEventListener('click', function() {
  if (playButton.classList.contains('on')) {
    playButton.classList.remove('on');
    audioPlayer.pause();
    disk.classList.remove('rotate');
    audioPlayer.currentTime = 0;
  } else {
    playButton.classList.add('on');
    audioPlayer.play();
    disk.classList.add('rotate');
    pauseButton.classList.remove('on');
  }
});

pauseButton.addEventListener('click', function() {
  pauseButton.classList.toggle('on');
  
  if (audioPlayer.paused) {
 
  } else {
    audioPlayer.pause(); // 노래 일시정지
    disk.classList.remove('rotate');
    playButton.classList.remove('on');
  }
});


const timeline = document.querySelector(".timeline");
const timelineProgress = document.createElement("div");
timelineProgress.classList.add("timeline-progress");
timeline.appendChild(timelineProgress);

audioPlayer.addEventListener("timeupdate", function() {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercentage = (currentTime / duration) * 100;
  timelineProgress.style.width = progressPercentage + "%";
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

audioPlayer.addEventListener("timeupdate", function() {
  const currentTime = audioPlayer.currentTime;
  const formattedTime = formatTime(currentTime);
  const timeElement = document.querySelector(".time");
  timeElement.textContent = formattedTime;
});


const volumeBar = document.querySelector('.volume-bar');
const volumeProgress = document.querySelector('.volume-progress');

volumeBar.addEventListener('mousedown', function(event) {
  event.preventDefault();
  const barHeight = this.clientHeight;
  const offsetY = event.clientY - this.getBoundingClientRect().top;
  const initialVolume = audioPlayer.volume;
  
  function adjustVolume(event) {
    const newOffsetY = event.clientY - volumeBar.getBoundingClientRect().top;
    let volume = 1 - (newOffsetY / barHeight);
    volume = Math.max(0, Math.min(1, volume)); // Clamp volume between 0 and 1
    audioPlayer.volume = volume;
    volumeProgress.style.top = ((1 - volume) * 100) + '%';
  }

  function stopAdjustingVolume() {
    document.removeEventListener('mousemove', adjustVolume);
    document.removeEventListener('mouseup', stopAdjustingVolume);
  }

  document.addEventListener('mousemove', adjustVolume);
  document.addEventListener('mouseup', stopAdjustingVolume);
});
