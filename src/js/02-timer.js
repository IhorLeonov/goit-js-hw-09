import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const optionsFp = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (date > selectedDates[0]) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};
const fp = flatpickr(input, optionsFp);
startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtnClick);
let timerId;

function onStartBtnClick() {
  startBtn.disabled = true;
  input.disabled = true;
  startTimer();
  timerId = setInterval(startTimer, 1000);
}

function startTimer() {
  const choosenDate = fp.selectedDates[0];
  const currentDate = new Date();
  const timeToEnd = choosenDate - currentDate;

  if (timeToEnd < 0) {
    Notiflix.Notify.success('Time is up! Congratulations!!!', {
      timeout: 3000,
    });
    clearInterval(timerId);
    startBtn.disabled = false;
    input.disabled = false;
    return;
  }

  spanDays.textContent = addLeadingZero(convertMs(timeToEnd).days);
  spanHours.textContent = addLeadingZero(convertMs(timeToEnd).hours);
  spanMinutes.textContent = addLeadingZero(convertMs(timeToEnd).minutes);
  spanSeconds.textContent = addLeadingZero(convertMs(timeToEnd).seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
