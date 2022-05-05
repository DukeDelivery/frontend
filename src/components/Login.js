import Popup from "reactjs-popup";
import { useState } from "react";
import axios from "axios";

const Login = ({ setAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {username: username, password: password})
      .then(res => {
        if (res.data === 'valid') setAdmin(true);
        else {
          setUsername("");
          setPassword("");
          alert('incorrect username or password');
        }
      });
    setOpen(false);
  }
  return (
    <div>
      <button onClick={() => setOpen(true)}>admin login</button>
      <Popup
      modal
      nested
      open={open}
      >
        <div className="modal">
          <button className="close" onClick={() => setOpen(false)} >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            Username: <input label="Username" type="text" value={username} onChange={x => setUsername(x.target.value)} required/> <br/>
            Password: <input label="Password" type="text" value={password} onChange={x => setPassword(x.target.value)} required/>
            <input type="submit" label="login" />
          </form>
          
        </div>
        
      </Popup>
    </div>
  )
}

export default Login;