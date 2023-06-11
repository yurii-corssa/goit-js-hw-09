import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  dateTimePicker: document.querySelector('input[type="text"]'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const { defaultDate } = optionsFlatpickr;

    if (selectedDates <= defaultDate) {
      refs.button.disabled = true;
      Report.failure('Please choose a date in the future');
      return;
    }

    refs.button.disabled = false;
    Timer.targetDate = selectedDates.getTime();
  },
};

flatpickr(refs.dateTimePicker, optionsFlatpickr);

class Timer {
  static targetDate;

  constructor({ onTick }) {
    this.isActive = false;
    this.tolerance = 1000;
    this.onTick = onTick;
  }

  activateTimer() {
    if (this.isActive) {
      return;
    }

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const difference = Timer.targetDate - currentTime;
      const timerTime = this.convertMs(difference);

      if (difference < this.tolerance) {
        this.isActive = false;
        clearInterval(timerId);
        this.onTick(timerTime);
        Report.success('The time is up');
        return;
      }

      this.isActive = true;
      this.onTick(timerTime);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function updateTimerFace(timerTime) {
  const { addLeadingZero } = Timer.prototype;
  const { days, hours, minutes, seconds } = refs;

  days.textContent = addLeadingZero(timerTime.days);
  hours.textContent = addLeadingZero(timerTime.hours);
  minutes.textContent = addLeadingZero(timerTime.minutes);
  seconds.textContent = addLeadingZero(timerTime.seconds);
}

const newTimer = new Timer({
  onTick: updateTimerFace,
});

refs.button.addEventListener('click', newTimer.activateTimer.bind(newTimer));
