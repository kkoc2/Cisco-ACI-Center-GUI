import React from 'react';
import axios from 'axios';
import { getUser, removeUserSession, getToken , getIP} from './Utils/Common';

function Dashboard(props) {
  const user = getUser();

  const ip = getIP();

  const token = getToken();
  if (!token) {
    return;
  }

  // handle click event of logout button
  const handleLogout = () => {
    axios.get(`http://127.0.0.1:5000/RestAPIlogout?token=${token}&ip=${ip}`).then(response => {
      console.log(response)
      removeUserSession();
      props.history.push('/login');
    });
  }



  return (
    <div>
      Welcome {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
      
    </div>
  );
}

export default Dashboard;