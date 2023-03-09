import Notiflix from 'notiflix';

const refs = {
  formEl : document.querySelector('.form'),
}

function createPromise(position, delay, amount) {
  const shouldResolve = Math.random() > 0.3;
  position = Number(position);
  delay = Number(delay);
  let number = 0;
  
  promise = new Promise((resolve, reject) => {
    setTimeout (() => {
      position += delay;
      number += 1;
        if(shouldResolve) {
          resolve(`✅ Fulfilled promise ${number} in ${position}ms`);
        } else {
          reject(`❌ Rejected promise ${number} in ${position}ms`);
        }
      }, position);
    });
    
  return promise;
}

function amountPromise (n) {
  const promise = [];

  for(let i = 1; i <= n; i += 1) {
    promise.push(i);
  }

  return promise;
}

function logPromises (promiseArr) {
  return Promise.all(promiseArr)
  .then(logResolve => Notiflix.Notify.success(logResolve))
  .catch(logReject => Notiflix.Notify.failure(logReject));
}

refs.formEl.addEventListener('submit', submitForm);

function submitForm (event) {
  event.preventDefault();
  
  const delay = event.target.delay.value;
  const step = event.target.step.value
  const amount = event.target.amount.value;

  const amountNum = amountPromise(Number(amount))

  const promises = amountNum.map(amount => createPromise(delay, step, amount));

  console.log(promises);

  logPromises(promises);
}