class PomodoroTimer {
  constructor() {
    this.focusDuration = 25 * 60;
    this.breakDuration = 5 * 60;
    this.timeLeft = this.focusDuration;
    this.isRunning = false;
    this.isFocusMode = true;
    this.interval = null;

    this.timeDisplay = document.getElementById('time');
    this.modeDisplay = document.getElementById('mode');
    this.toggleButton = document.getElementById('toggle');

    this.toggleButton.addEventListener('click', () => this.toggleTimer());

    this.updateDisplay();
  }

  toggleTimer() {
    this.isRunning = !this.isRunning;
    this.toggleButton.textContent = this.isRunning ? 'Pause' : 'Begin';

    if (this.isRunning) {
      this.interval = setInterval(() => this.tick(), 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  tick() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      this.updateDisplay();
    } else {
      clearInterval(this.interval);
      this.interval = null;
      this.isRunning = false;
      this.toggleButton.textContent = 'Begin';
      this.switchMode();
    }
  }

  switchMode() {
    this.isFocusMode = !this.isFocusMode;
    this.timeLeft = this.isFocusMode ? this.focusDuration : this.breakDuration;
    this.updateDisplay();
  }

  reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isFocusMode = true;
    this.timeLeft = this.focusDuration;
    this.toggleButton.textContent = 'Begin';
    this.updateDisplay();
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const mode = this.isFocusMode ? 'Focus' : 'Rest';

    this.timeDisplay.textContent = timeString;
    document.title = `${timeString} - ${mode}`;
  }
}

new PomodoroTimer();
