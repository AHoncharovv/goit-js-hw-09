import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const timerInput = document.querySelector("#datetime-picker");
const timerField = document.querySelector("div.timer");
const inputBtn = document.querySelector("button");
const input = document.querySelector("input");



timerField.style.display = "flex";
timerField.style.justifyContent = "space-evenly";

const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");


const timerBtn = document.querySelector('button[data-start]');
timerBtn.setAttribute('disabled', true);
let startBtnIsActive = false;
let closeDate = null;
let selectedTimer = null;

flatpickr(timerInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        

        closeDate = Date.now();
        if (selectedDates[0] <= closeDate) {
            window.alert("Please choose a date in the future");
            return;
        };
        timerBtn.removeAttribute('disabled');  
        selectedTimer = selectedDates[0].getTime();
      
    }
});

timerBtn.addEventListener('click', () => {
    if (startBtnIsActive) {
        return;
    };
    let timerToFinish = selectedTimer - Date.now(); 

        timerDays.textContent = convertMs(timerToFinish).days;
        timerHours.textContent = convertMs(timerToFinish).hours;
        timerMinutes.textContent = convertMs(timerToFinish).minutes;
        timerSeconds.textContent = convertMs(timerToFinish).seconds;
    
    let timerId = setInterval(() => {
        timerToFinish = timerToFinish - 1000;
        
        timerDays.textContent = convertMs(timerToFinish).days;
        timerHours.textContent = convertMs(timerToFinish).hours;
        timerMinutes.textContent = convertMs(timerToFinish).minutes;
        timerSeconds.textContent = convertMs(timerToFinish).seconds;


        if (timerToFinish <= 1000) {
           clearInterval(timerId);   
        };
    }, 1000);


    startBtnIsActive = true; 
    inputBtn.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
        
    