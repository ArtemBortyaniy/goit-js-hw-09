const refs = {
    datetimePicker : document.querySelector('#datetime-picker'),
    startEl : document.querySelector('[data-start]'),
    stopEl : document.querySelector('[data-stop]'),
    daysEl : document.querySelector('[data-days]'),
    hoursEl : document.querySelector('[data-hours]'),
    minutesEl : document.querySelector('[data-minutes]'),
    secondsEl : document.querySelector('[data-seconds]'),
}

refs.startEl.addEventListener('click', startTimer);
refs.stopEl.addEventListener('click', stopTimer);

function addLeadingZero(value) {
    if(value.length === 1) {
      return value.padStart(2,"0");
    } else {
      return value;
    }
  }

function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
    refs.daysEl.textContent = addLeadingZero(String(days));
    refs.hoursEl.textContent = addLeadingZero(String(hours));
    refs.minutesEl.textContent = addLeadingZero(String(minutes));
    refs.secondsEl.textContent = addLeadingZero(String(seconds));
  
    return { days, hours, minutes, seconds };
}

let id = null;

function startTimer () {
    let ms = 0;

    id = setInterval(() => {
        ms += 1000;
        convertMs(ms);
        console.log(ms);
    }, 1000);
}

function stopTimer () {
    clearInterval(id);
}