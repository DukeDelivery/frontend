import Schedule from './Schedule';
import Map from './Map';
import Form from './Form';
import Config from './Config';

const Modes = ({ mode }) => {
  switch(mode) {
    case 'calendar':
      return <Schedule/>
    case 'map':
      return <Map/>
    case 'form':
      return <Form/>
    case 'settings':
      return <Config/>
  }
}

export default Modes;