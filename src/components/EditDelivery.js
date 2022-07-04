import { useState, useEffect } from 'react';
import { HOUR } from '../utils/time';
import ConfirmButton from './ConfirmButton';
import db from '../utils/request';

const EditDelivery = ({delivery, setDelivery, setEvents, setEditMode}) => {
  const dateTimeFormat = (date) => {
    return new Date(date).toISOString().replace('Z', '');
  }

  const [start, setStart] = useState(dateTimeFormat(delivery.start - 4*HOUR));
  const [end, setEnd] = useState(dateTimeFormat(delivery.end - 4*HOUR));
  
  useEffect(() => {
    setDelivery({
      ...delivery,
      start: new Date(start).valueOf(),
      end: new Date(end).valueOf(),
    })
  }, [start, end])
  const handleChange = (field, value) => {
    setDelivery({
      ...delivery,
      [field]: value,
    });
  }
  const updateDelivery = () => {
    db.update('delivery', delivery);
    setEvents(events => events.map(event => event.id === delivery.id ? delivery : event ));
    setDelivery(null);
  }
  return (
    <div>
      Start: <input type='datetime-local' value={start} onChange={x => setStart(x.target.value)} /><br/>
      End: <input type='datetime-local' value={end} onChange={x => setEnd(x.target.value)} /><br/>
      Company: <input type='text' value={delivery.company} onChange={x => handleChange('company', x.target.value)} /><br/>
      Description: <input type='text' value={delivery.description} onChange={x => handleChange('description', x.target.value)} /><br/>
      Gate: <input type='number' value={delivery.gate} onChange={x => handleChange('gate', x.target.value)} /><br/>
      Contact Name: <input type='text' value={delivery.contactName} onChange={x => handleChange('contactName', x.target.value)} /><br/>
      Contact Number: <input type='tel' value={delivery.contactNumber} onChange={x => handleChange('contactNumber', x.target.value)} /><br/>
      Location: <input type='text' value={delivery.location} onChange={x => handleChange('location', x.target.value)} /><br/>
      Scheduler Name: <input type='text' value={delivery.schedName} onChange={x => handleChange('schedName', x.target.value)} /><br/>
      Scheduler Number: <input type='tel' value={delivery.schedNumber} onChange={x => handleChange('schedNumber', x.target.value)} /><br/>
      Supplier: <input type='text' value={delivery.supplier} onChange={x => handleChange('supplier', x.target.value)} /><br/>
      Hoist Method: <input type='text' value={delivery.hoistMethod} onChange={x => handleChange('hoistMethod', x.target.value)} /><br/>
      Number of Trucks: <input type='number' value={delivery.trucks} onChange={x => handleChange('trucks', x.target.value)} /><br/>
      Extra Notes: <input type='text' value={delivery.notes} onChange={x => handleChange('notes', x.target.value)} /><br/>
      <ConfirmButton 
        text='Save Changes' action={updateDelivery} 
        confirmText={'Are you sure you would like to update delivery?'}
      />
      <button onClick={() => setEditMode(false)}>Cancel</button>
    </div>
  )
}
export default EditDelivery;