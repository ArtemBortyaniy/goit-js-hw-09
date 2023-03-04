function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timeId = null;

btnStartEl.addEventListener('click', startChangeBodyBg);
btnStopEl.addEventListener('click', stopChangeBodyBg);

function startChangeBodyBg () {
    btnStartEl.disabled = 'disabled';

    timeId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeBodyBg () {
    btnStartEl.removeAttribute('disabled');
    clearInterval(timeId);
}
