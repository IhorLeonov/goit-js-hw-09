const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  // btnStart.disabled = true;
  // btnStop.disabled = false;
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);
  switchBtn();
}

function onBtnStopClick() {
  clearInterval(timerId);
  switchBtn();
  // btnStart.disabled = false;
  // btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchBtn() {
  if (!btnStart.disabled) {
    btnStart.disabled = true;
    btnStop.disabled = false;
    return;
  }
  if (!btnStop.disabled) {
    btnStop.disabled = true;
    btnStart.disabled = false;
    return;
  }
}
