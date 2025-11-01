// Get elements
const player = document.querySelector(".player");
// console.log(player);
const video = player.querySelector("video");
// console.log(video);
const overlay = player.querySelector(".overlay");
// console.log(overlay);
const progress = player.querySelector(".progress");
// console.log(progress);
const progressBar = progress.querySelector(".progress__filled");
// console.log(progressBar);
const playButton = player.querySelector(".toggle");
// console.log(playButton);
const ranges = player.querySelectorAll(".player__slider");
// console.log(ranges);
const skips = player.querySelectorAll("button[data-skip]");
// console.log(ranges);

// Build functions
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updatePlayButton() {
  playButton.innerHTML = video.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateProgress() {
  const percentPlayed = parseFloat(video.currentTime / video.duration);
  progressBar.style.flexBasis = `${percentPlayed * 100}\%`;
}

function updateRange() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up event listeners
overlay.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
playButton.addEventListener("click", togglePlay);

skips.forEach((skipper) => skipper.addEventListener("click", skip));
video.addEventListener("timeupdate", updateProgress);

ranges.forEach((range) => range.addEventListener("mousemove", updateRange));
ranges.forEach((range) => range.addEventListener("change", updateRange)); // Faster changing than mousemove for clicking

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
