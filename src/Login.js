import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession} from './Utils/Common';
import './Login.css';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const [choiceDC, setChoiceDC] = useState();
  const [choicetextDC, setChoicetextDC] = useState();
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.post('http://127.0.0.1:5000/RestAPIAuth', { ip: choiceDC, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.ip, response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className='login'>
      <h1>ACI Center</h1>
        <form>
        <div>
          <select type="select"
            value={choiceDC}
            defaultValue={"default"}
            onChange={(e) => setChoiceDC(e.target.value)}
          >
            <option value={"default"} disabled>
              Choose an Data Center
            </option>
            <option value={"10.235.22.10"}>ISTANBUL</option>
            <option value={"10.235.99.10"}>IZMIR</option>
          </select>
        </div>
        <div>
          <input type="text" {...username} placeholder="Username" autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          <input type="password" {...password} placeholder="Password" autoComplete="new-password" />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </form>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;