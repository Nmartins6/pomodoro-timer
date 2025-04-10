// inputs
const focusInput = document.getElementById("focus");
const breakInput = document.getElementById("break");
const sectionsInput = document.getElementById("sections");
const timerDisplay = document.getElementById("timerDisplay");

// global
let focusTime, breakTime, totalSections;
let currentSection = 1;
let isFocus = true;
let timeLeft = 0;
let intervalId = null;

// start pomodoro
function start() {
  focusTime = parseInt(focusInput.value) * 60;
  breakTime = parseInt(breakInput.value) * 60;
  totalSections = parseInt(sectionsInput.value);

  if (isNaN(focusTime) || isNaN(breakTime) || isNaN(totalSections)) {
    alert("fill the gaps correctly");
    return;
  }

  currentSection = 1;
  isFocus = true;
  timeLeft = focusTime;

  refreshDisplay();
  startTimer();
}

// Start timer interval
function startTimer() {
  if (intervalId) return;

  intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;

      if (isFocus) {
        isFocus = false;
        timeLeft = breakTime;
      } else {
        if (currentSection < totalSections) {
          currentSection++;
          isFocus = true;
          timeLeft = focusTime;
        } else {
          timerDisplay.innerText = "🎉 Done!";
          document.title = "Pomodoro Timer";
          return;
        }
      }

      startTimer();
    } else {
      timeLeft--;
      refreshDisplay();
    }
  }, 1000);
}

// Atualiza o display na tela e no título
function refreshDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
  timerDisplay.innerText = formatted;
  document.title = `${isFocus ? "Focus" : "Pause"}: ${formatted}`;
}

// pause Timer
function pause() {
  clearInterval(intervalId);
  intervalId = null;
}

// Reinicia o ciclo atual
function restart() {
  clearInterval(intervalId);
  intervalId = null;
  timeLeft = isFocus ? focusTime : breakTime;
  refreshDisplay();
}