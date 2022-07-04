import { HOUR } from '../utils/time';
import db from '../utils/request';
import ConfirmButton from './ConfirmButton';
const Delivery = ( { delivery, setDelivery, setEvents, setEditMode} ) => {
  const readableDateFormat = (date) => {
    const d = new Date(date);
    if (d.toString() === 'Invalid Date') return null;
    return d.toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC'});
  }

  const deleteDelivery = () => {
    db.post('delete', delivery);
    setEvents(events => events.filter(event => event.id !== delivery.id));
    setDelivery(null);
  }
  return (
    <div>
      Start: {readableDateFormat(delivery.start - 4*HOUR) || 'N/A'} <br/>
      End: {readableDateFormat(delivery.end - 4*HOUR) || 'N/A'}<br/>
      Company: {delivery.company || 'N/A'}<br/>
      Description: {delivery.description || 'N/A'}<br/>
      Gate: {delivery.gate || 'N/A'}<br/>
      Contact Name: {delivery.contactName || 'N/A'}<br/>
      Contact Number: {delivery.contactNumber || 'N/A'}<br/>
      Location: {delivery.location || 'N/A'}<br/>
      Scheduler Name: {delivery.schedName || 'N/A'}<br/>
      Scheduler Number: {delivery.schedNumber || 'N/A'}<br/>
      Supplier: {delivery.supplier || 'N/A'}<br/>
      Hoist Method: {delivery.hoistMethod || 'N/A'}<br/>
      Number of Trucks: {delivery.trucks || 'N/A'}<br/>
      Extra Notes: {delivery.notes || 'N/A'}<br/>
      <ConfirmButton 
        text='Delete Delivery' action={deleteDelivery}
        confirmText={'Are you sure you would like to delete delivery?'}
      />
      <button onClick={() => setEditMode(true)}>Edit Delivery</button>
    </div>
  );

}

export default Delivery;