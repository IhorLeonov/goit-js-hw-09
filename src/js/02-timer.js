import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date().getTime();
    const selectedDate = selectedDates[0].getTime();
    if (date > selectedDate) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      choosenDate = selectedDate;
    }
  },
};
const input = document.querySelector('#datetime-picker');
const fp = flatpickr(input, options);
const startBtn = document.querySelector('button[data-start]');
let choosenDate = 0;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtnClick);

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
function onStartBtnClick() {
  startBtn.disabled = true;
  let time;
  let currentDate;
  let timerId = setInterval(() => {
    currentDate = new Date().getTime();
    time = choosenDate - currentDate;

    const spanDays = document.querySelector('span[data-days]');
    spanDays.textContent = convertMs(time).days;

    const spanHours = document.querySelector('span[data-hours]');
    spanHours.textContent = convertMs(time).hours;

    const spanMinutes = document.querySelector('span[data-minutes]');
    spanMinutes.textContent = convertMs(time).minutes;

    const spanSeconds = document.querySelector('span[data-seconds]');
    spanSeconds.textContent = convertMs(time).seconds;
  }, 1000);
}
