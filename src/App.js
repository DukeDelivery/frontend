import { useState, useEffect } from 'react';
import Modes from './components/Modes'
import Menu from './components/Menu'
import Login from './components/Login';
import db from './utils/request';
import './styles/App.css'
import AdminContext from './contexts/AdminContext';

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [mode, setMode] = useState('calendar');
  const [number, setNumber] = useState('');
  useEffect(() => {
    db.get('phone').then(x => setNumber(x.data));
  }, []);

  return (
    <AdminContext.Provider value={{admin, setAdmin}}>
      <div className='horizontal'>
        <h2 className="title">
          {!admin && <>Delivery Scheduling Application</>}
          {admin && <>Delivery Scheduling Application -Admin</>}
          {!admin && <Login/>}
        </h2>
      </div>
      <div className="vertical body" >
        <Menu current={mode} setCurrent={setMode}/>
        <div className="main">
          <Modes mode={mode}/>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
export default App;