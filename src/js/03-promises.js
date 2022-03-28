import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({position: 'center-bottom'});


const formSubmit = document.querySelector('form');

formSubmit.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);
  let position = 1;
  let counterMs = firstDelay;

  if (amount === 0) {
      return;
    };

  setTimeout(() => {
    
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
      .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    
    
    firstDelay = step;

    const intervalId = setInterval(() => {

      if (amount === 1) {
      return;
    };

      position += 1;
      counterMs += step;
      
      if (position === amount) {
        clearInterval(intervalId);
      };
      createPromise(position, counterMs)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, firstDelay);
  }, firstDelay);

  
  formSubmit.reset();
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    
  if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
  })
};














