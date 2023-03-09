import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout (() => {
      if(shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function submitForm (event) {
  event.preventDefault();

  let delay = +event.target.delay.value;
  const step = +event.target.step.value;
  const amount = +event.target.amount.value;
  
  event.target.reset();

  for(let index = 0; index < amount; index +=1) {
    createPromise(index, delay)
    .then(({position, delay}) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay}) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
    delay += step;
  }
}






