import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  runQueue(delayValue, stepValue, amountValue);
});

function runQueue(delay, step, amount) {
  setTimeout(() => {
    let intervalNumber = 1;
    let delayCounter = delay;

    createPromise(intervalNumber, delayCounter);

    const intervalId = setInterval(() => {
      if (intervalNumber === amount) {
        clearInterval(intervalId);
        return;
      }

      intervalNumber += 1;
      delayCounter += step;

      createPromise(intervalNumber, delayCounter);
    }, step);
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }

    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  return promise
    .then(result => Notify.success(result))
    .catch(result => Notify.failure(result));
}
