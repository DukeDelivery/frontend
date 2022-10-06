import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import db from '../utils/request';
import { HOUR } from '../utils/time'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const Schedule = ({ canEdit }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [delivery, setDelivery] = useState(null);
  useEffect(() => {
    db.get('delivery').then(x => setEvents(x.data));
  }, []);
  const localizer = momentLocalizer(moment);

  return (
    <div style={{height: 1000, backgroundColor: "white"}}>
      {delivery !== null && <Modal delivery={delivery} setDelivery={setDelivery} canEdit={canEdit} events={events} setEvents={setEvents}/>}
      <Calendar localizer={localizer} defaultView={'week'} onSelectEvent={x => setDelivery(x)}
      events={events.map(event => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }
      })} />
    </div>
  );
};

export default Schedule;