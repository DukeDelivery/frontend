import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Delivery from './Delivery';
import EditDelivery from './EditDelivery';


const Modal = ( {delivery, setDelivery, canEdit, events, setEvents} ) => {
  const [editMode, setEditMode] = useState(false);
  const close = () => {
    setDelivery(null);
  }
  if (delivery == null) return null;
  return (
    <Popup modal nested open onClose={close} >
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        {!editMode && <Delivery delivery={delivery} canEdit={canEdit} setEditMode={setEditMode} events={events} setEvents={setEvents} setEditMode={setEditMode} close={close}/>}
        {editMode && <EditDelivery delivery={delivery} setDelivery={setDelivery} events={events} setEvents={setEvents} setEditMode={setEditMode} close={close}/>}
      </div>
    </Popup>
  )
}

export default Modal;