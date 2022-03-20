const bodyColor = document.querySelector("body");
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let startBtnIsActive = false;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener("click", () => {
    if (startBtnIsActive) {
        return;
    }
    timerId = setInterval(() => {
        bodyColor.style.backgroundColor = getRandomHexColor();    
    }, 1000);
    startBtnIsActive = true;
});

stopBtn.addEventListener("click", () => {
    startBtnIsActive = false;
    clearInterval(timerId);
});




