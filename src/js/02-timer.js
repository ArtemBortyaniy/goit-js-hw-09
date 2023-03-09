import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    datetimePicker : document.querySelector('#datetime-picker'),
    startEl : document.querySelector('[data-start]'),
    daysEl : document.querySelector('[data-days]'),
    hoursEl : document.querySelector('[data-hours]'),
    minutesEl : document.querySelector('[data-minutes]'),
    secondsEl : document.querySelector('[data-seconds]'),
}

refs.startEl.addEventListener('click', startTimer);

flatpickr(refs.datetimePicker, { 
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    const now = new Date();
    
    if(selectedDate < now) {
      Notiflix.Notify.failure("Please choose a date in the future");
      refs.startEl.disabled = 'true';
    } else {
      refs.startEl.removeAttribute('disabled');
    }
  },});

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

function startTimer() {
  const now = Date.now();  
  const selectedDate = Date.parse(refs.datetimePicker.value)
  let ms = selectedDate - now;

  convertMs(ms);

  const timerId = setInterval(() => {
    ms -= 1000;
    convertMs(ms);
    if(ms <= 1500) {
      clearInterval(timerId);
      refs.secondsEl.textContent = addLeadingZero('0');
    }
  }, 1000);
}




