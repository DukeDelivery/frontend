import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import db from '../utils/request';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import EventsContext from '../contexts/EventsContext';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [delivery, setDelivery] = useState(null);
  useEffect(() => {
    db.get('delivery').then(x => setEvents(x.data));
  }, []);
  const eventPropGetter = (event) => {
    if (event.approved && event.completed) {
      return {style: {backgroundColor: 'green', borderColor: 'green'}};
    } else if (event.approved && !event.completed) {
      return {style: {backgroundColor: 'blue', borderColor: 'blue'}};
    } else if (!event.approved && event.completed) {
      return {style: {backgroundColor: 'red', borderColor: 'red'}};
    } else {
      return {style: {backgroundColor: 'yellow', borderColor: 'yellow', color: 'black'}};
    }
    
  }
  const localizer = momentLocalizer(moment);
  return (
    <EventsContext.Provider value={{events, setEvents}}>
      <div style={{height: 1000, backgroundColor: "white"}}>
        {delivery !== null && <Modal delivery={delivery} setDelivery={setDelivery}/>}
        <Calendar localizer={localizer} defaultView={'week'} onSelectEvent={x => setDelivery(x)} views={['day','week','month']}
        step={7.5} scrollToTime={new Date('2003-11-30T13:00:00.000Z')} eventPropGetter={eventPropGetter}
        events={events.map(event => {
          return {
            ...event,
            title: event.company + ": " + event.description,
            start: new Date(event.start),
            end: new Date(event.end),
          }
        })} />
      </div>
    </EventsContext.Provider>
    
  );
};

export default Schedule;