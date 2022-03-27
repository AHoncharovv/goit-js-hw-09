const formSubmit = document.querySelector('form');
const formInput = document.querySelectorAll('input');

formSubmit.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(formInput[0].value);
  const step = Number(formInput[1].value);
  const amount = Number(formInput[2].value);
  let position = 1;
  let counterMs = firstDelay;
  
  setTimeout(() => {
    
    createPromise(position, firstDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
   
    firstDelay = step;

    const intervalId = setInterval(() => {

      position += 1;
      counterMs += step;
      
      if (position === amount) {
        clearInterval(intervalId);
      };
      createPromise(position, counterMs)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, firstDelay);
  }, firstDelay);
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














