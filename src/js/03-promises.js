// ✅ Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount.
// ✅ При каждом вызове передай ей номер создаваемого промиса(position) и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).
// ✅ Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени.
// ✅ Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров.
// ✅ Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

import Notiflix from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const delayFirst = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 0; i < amount; i += 1) {
    const delay = delayFirst + step * i;
    const position = i + 1;

    setTimeout(() => {
      createPromise(position, delay)
        .then(onSuccess)
        .catch(onError)
        .finally(() => form.reset());
    }, delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    if (shouldResolve) {
      res({ position, delay });
    } else {
      rej({ position, delay });
    }
  });
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
