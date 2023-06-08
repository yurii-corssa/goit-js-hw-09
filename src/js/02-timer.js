import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const refs = {
//   dateTimePicker: document.querySelector('input[type="text"]'),
//   button: document.querySelector('button[data-start]'),
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };

// let targetDate = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose([selectedDates]) {
//     if (selectedDates <= options.defaultDate) {
//       refs.button.disabled = true;
//       return window.alert('Please choose a date in the future');
//     }

//     refs.button.disabled = false;
//     targetDate = selectedDates.getTime();
//   },
// };

// flatpickr(refs.dateTimePicker, options);

// refs.button.addEventListener('click', activateTimer);

// function activateTimer() {
//   let isActive = false;
//   const tolerance = 1000;

//   if (isActive) {
//     return;
//   }

//   const timerId = setInterval(() => {
//     const currentTime = Date.now();
//     const difference = targetDate - currentTime;

//     if (difference < tolerance) {
//       updateTimerFace(convertMs(difference));
//       isActive = false;
//       clearInterval(timerId);
//       return;
//     }

//     isActive = true;

//     return updateTimerFace(convertMs(difference));
//   }, 1000);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function updateTimerFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = addLeadingZero(days);
//   refs.hours.textContent = addLeadingZero(hours);
//   refs.minutes.textContent = addLeadingZero(minutes);
//   refs.seconds.textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

const refs = {
  dateTimePicker: document.querySelector('input[type="text"]'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.addEventListener('click', () => {
  firstTimer.activateTimer();
});

class Timer {
  targetDate;

  constructor({ days, hours, minutes, seconds, targetDate }) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.targetDate = targetDate;
    this.isActive = false;
    this.tolerance = 1000;
  }

  get targetDate() {
    return this.targetDate;
  }

  set targetDate(newTargetDate) {
    this.targetDate = newTargetDate;
  }

  activateTimer() {
    if (this.isActive) {
      return;
    }

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const difference = this.targetDate - currentTime;

      if (difference < this.tolerance) {
        this.isActive = false;

        clearInterval(timerId);

        return this.updateTimerFace(this.convertMs(difference));
      }

      this.isActive = true;

      return this.updateTimerFace(this.convertMs(difference));
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

  updateTimerFace(timerCurrentTime) {
    this.days.textContent = this.addLeadingZero(timerCurrentTime.days);
    this.hours.textContent = this.addLeadingZero(timerCurrentTime.hours);
    this.minutes.textContent = this.addLeadingZero(timerCurrentTime.minutes);
    this.seconds.textContent = this.addLeadingZero(timerCurrentTime.seconds);
  }
}

const firstTimer = new Timer({
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
});

const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= optionsFlatpickr.defaultDate) {
      refs.button.disabled = true;
      return window.alert('Please choose a date in the future');
    }

    refs.button.disabled = false;
    firstTimer.targetDate = selectedDates.getTime();
  },
};

flatpickr(refs.dateTimePicker, optionsFlatpickr);
