const buttons = document.querySelectorAll(".timer__controls > button");
const formInput = document.customForm;
let countdown;

function setTimer(e) {
    e.preventDefault();
    const seconds = this.dataset.time || this.minutes.value * 60;
    formInput.minutes.value = "";

    // Start countdown processing
    // console.log(seconds);
    startTimer(parseInt(seconds));
}

function displayTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    document.querySelector('.display__time-left').textContent = `${mins}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

function endTime(end) {
    const endTime = new Date(end);
    const hour = endTime.getHours();
    const mins = endTime.getMinutes();
    document.querySelector(".display__end-time").textContent = `Time ends at ${hour}:${mins < 10 ? "0" : ""}${mins}`;
}

function updateTimer(end) {
    const timeLeft = Math.round((end - Date.now()) / 1000);

    if (timeLeft < 0) {
        clearInterval(countdown);
        return;
    };

    displayTimer(timeLeft);
}

function startTimer(seconds) {
    // Clear existing timers
    clearInterval(countdown);

    // Set countdown
    displayTimer(seconds);
    const end = Date.now() + (seconds * 1000);

    // Calculate end time
    endTime(end);

    countdown = setInterval(() => updateTimer(end), 1000);
}

buttons.forEach(button => button.addEventListener("click", setTimer));
formInput.addEventListener("submit", setTimer);