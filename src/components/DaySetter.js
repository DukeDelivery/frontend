import {toMilliseconds, toTimeString } from '../utils/time';

const DaySetter = ({data, setData, day}) => {
  const onActiveChange = () => {
    setData({
      ...data,
      [day]: {
        ...data[day],
        active: !data[day].active
      }
    })
  };
  const onStartChange = (start) => {
    setData({
      ...data,
      [day]: {
        ...data[day],
        start: toMilliseconds(start)
      }
    })
  }
  const onEndChange = (end) => {
    setData({
      ...data,
      [day]: {
        ...data[day],
        end: toMilliseconds(end)
      }
    })
  }
  const offOn = (value) => {
    if (data[day].active) return value;
    return '';
  }
  const toInputTimeString = (time) => {
    let minutes = time / 60000;
    let hours = 0;
    while (minutes >= 60) {
      minutes -= 60;
      hours++;
    }
    if (minutes === 0) minutes = '00';
    if (hours < 10) hours = '0' + hours.toString();
    return hours + ':' + minutes;
  }
  if (data === null) {
    return (
      <tr>
        <td>{day}:</td>
        <td><input type='checkbox' onChange={onActiveChange} checked={false} /></td>
        <td><input type='time' disabled={true} onChange={x => onStartChange(x.target.value)}/></td>
        <td><input type='time' disabled={true} onChange={x => onEndChange(x.target.value)}/></td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{day}:</td>
      <td><input type='checkbox' onChange={onActiveChange} checked={data[day].active}/></td>
      <td><input type='time' disabled={!data[day].active} value={offOn(toInputTimeString(data[day].start))} onChange={x => onStartChange(x.target.value)}/></td>
      <td><input type='time'disabled={!data[day].active} value={offOn(toInputTimeString(data[day].end))} onChange={x => onEndChange(x.target.value)}/></td>
    </tr>
    
  )
}
export default DaySetter;