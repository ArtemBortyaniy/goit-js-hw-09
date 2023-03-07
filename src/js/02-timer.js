// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    datetimePicker : document.querySelector('#datetime-picker'),
    startEl : document.querySelector('[data-start]'),
    daysEl : document.querySelector('[data-days]'),
    hoursEl : document.querySelector('[data-hours]'),
    minutesEl : document.querySelector('[data-minutes]'),
    secondsEl : document.querySelector('[data-seconds]'),
}

flatpickr(refs.datetimePicker, { 
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    const now = new Date();
    
    if(selectedDate < now) {
      alert("Please choose a date in the future");
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

const now = Date.now();  

function startTimer() {
  const selectedDate = Date.now(refs.datetimePicker.value);
  let ms = selectedDate - now;

  console.log(Date.now(refs.datetimePicker.value));
  console.log(now);
  console.log(ms);

  convertMs(ms);

  const timerId = setInterval(() => {
    ms -= Date.now();
    convertMs(ms);
    console.log(ms);
    if(ms <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
}
refs.startEl.addEventListener('click', startTimer);









