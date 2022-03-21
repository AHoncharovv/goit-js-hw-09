import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const timerInput = document.querySelector("#datetime-picker");
const timerField = document.querySelector("div.timer");
const timerFieldElement = document.querySelectorAll("div.field");
console.log(timerField.style);
timerField.style.display = "flex";
timerField.style.justifyContent = "space-evenly";
// timerFieldElement.style.marginLeft = "150px";
const timerBtn = document.querySelector('button[data-start]');
timerBtn.setAttribute('disabled', false);

flatpickr(timerInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
       
    }
});
