const SEC = 1000;
const MIN = 60000;
const HOUR = 3600000;
const DAY = 86400000;


const toMilliseconds = (timeString) => {
  const t = timeString.split(':');
  return parseInt(t[0])*HOUR + parseInt(t[1])*MIN;
}
const toTimeString = (milliseconds) => {
  let minutes = milliseconds / 60000;
  let hours = 0;
  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }
  if (minutes === 0) minutes = '00';
  if (hours < 10) hours = '0' + hours.toString();
  return hours + ':' + minutes;
}

export { toMilliseconds, toTimeString, SEC, MIN, HOUR, DAY };