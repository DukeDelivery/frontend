import { useState, useEffect } from "react";
import DaySetter from "./DaySetter";
import db from '../utils/request';

const Config = () => {

  const [admin, setAdmin] = useState({});
  const [workTime, setWorkTime] = useState(null);


  const handleTimeSubmit = (e) => {
    e.preventDefault();
    for (const x in workTime) {
      if (workTime[x].active && workTime[x].end < workTime[x].start) {
        alert('End times must be after start times.');
        return;
      }
    }
    db.post('time', workTime);
    alert('work times updated');
  }

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    db.post('admin', admin);
    alert('admin information updated');
  }

  useEffect(() => {
    db.get('time')
      .then(x => {
        setWorkTime(x.data);
      });
  },[]);
  return (
    <div style={{textAlign: 'center'}}>
      <h2>Delivery Hours</h2>
      <form onSubmit={handleTimeSubmit}>
        <table style={{margin:'auto', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <td>Day of Week</td>
              <td>Work Days</td>
              <td>Start Time</td>
              <td>End Time</td>
            </tr>
          </thead>
          <tbody>
            <DaySetter data={workTime} setData={setWorkTime} day='sunday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='monday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='tuesday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='wednesday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='thursday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='friday'/>
            <DaySetter data={workTime} setData={setWorkTime} day='saturday'/>
          </tbody>
        </table>
        <input type='submit' value='update information'/>
      </form>
      <h2>Admin Information</h2>
      <form onSubmit={handleAdminSubmit}>
        <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <tbody>
            <tr>
              <td>new username:</td>
              <td><input type='text' value={admin.username || ''} onChange={x => setAdmin({...admin, username: x.target.value})} required/></td>
            </tr>
            <tr>
              <td>new password:</td>
              <td><input type='text' value={admin.password || ''} onChange={x => setAdmin({...admin, password: x.target.value})} required/></td>
            </tr>
            <tr>
              <td>new phone number:</td>
              <td><input type='tel' value={admin.number || ''} onChange={x => setAdmin({...admin, number: x.target.value})} required/></td>
            </tr>
          </tbody>
        </table>
        <input type='submit' value='update information' />
      </form>
    </div>
  )
}
export default Config;