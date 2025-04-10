// Toggle light/dark theme
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.classList.toggle('fa-sun', isLight);
    themeIcon.classList.toggle('fa-moon', !isLight);
});

// DOM elements
const focusInput = document.getElementById("focus");
const breakInput = document.getElementById("break");
const sectionsInput = document.getElementById("sections");
const timerDisplay = document.getElementById("timerDisplay");
const statusInfo = document.getElementById("statusInfo");
const statusText = document.getElementById("statusText");
const errorBox = document.getElementById("errorMessage");

// Global state
let focusTime, breakTime, totalSections;
let currentSection = 1;
let isFocus = true;
let timeLeft = 0;
let intervalId = null;

// Show session status
function setStatus() {
    statusInfo.classList.remove("d-none");
    const type = isFocus ? "🔴 Focus" : "🟢 Break";
    statusText.innerText = `${type} — Section ${currentSection} of ${totalSections}`;
}

// Start Pomodoro
function start() {
    // Clear errors
    hideError();
    removeInvalidClasses();

    // Parse inputs
    focusTime = parseInt(focusInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    totalSections = parseInt(sectionsInput.value);

    // Validate inputs
    if (isNaN(focusTime) || focusTime <= 0) {
        showError("Focus time must be greater than 0.");
        focusInput.classList.add("is-invalid");
        return;
    }

    if (isNaN(breakTime) || breakTime <= 0) {
        showError("Break time must be greater than 0.");
        breakInput.classList.add("is-invalid");
        return;
    }

    if (isNaN(totalSections) || totalSections <= 0) {
        showError("Total sections must be greater than 0.");
        sectionsInput.classList.add("is-invalid");
        return;
    }

    // Initialize session
    currentSection = 1;
    isFocus = true;
    timeLeft = focusTime;

    refreshDisplay();
    setStatus();
    startTimer();
}

// Starts the countdown
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
                    statusText.innerText = "✅ All sections completed!";
                    return;
                }
            }

            setStatus();
            startTimer();
        } else {
            timeLeft--;
            refreshDisplay();
        }
    }, 1000);
}

// Update display and page title
function calculateOffset(circumference) {
    const total = isFocus ? focusTime : breakTime;
    const progress = (total - timeLeft) / total;
    return circumference * (1 - progress);
  }

function refreshDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
    
    timerDisplay.innerText = formatted;
    document.title = `${isFocus ? "🔴 Focus" : "🟢 Pause"}: ${formatted}`;
  
    // Atualiza progresso circular
    const circle = document.getElementById("progressCircle");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
  
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = calculateOffset(circumference);
  }

// Pause the timer
function pause() {
    clearInterval(intervalId);
    intervalId = null;
}

// Restart the current session (focus or break)
function restart() {
    clearInterval(intervalId);
    intervalId = null;
    timeLeft = isFocus ? focusTime : breakTime;
    refreshDisplay();
}

// Display error message
function showError(message) {
    if (errorBox) {
        errorBox.innerText = message;
        errorBox.classList.remove("d-none");
    } else {
        alert(message);
    }
}

// Hide error message
function hideError() {
    if (errorBox) {
        errorBox.innerText = "";
        errorBox.classList.add("d-none");
    }
}

// Remove error class from all inputs
function removeInvalidClasses() {
    focusInput.classList.remove("is-invalid");
    breakInput.classList.remove("is-invalid");
    sectionsInput.classList.remove("is-invalid");
}
