import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession, getUser, getIP } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    const user = getUser();
    if (!user) {
      return;
    }

    const ip = getIP();
    if (!ip) {
      return;
    }

    axios.get(`http://127.0.0.1:5000/RestAPIVerify?token=${token}&user=${user}&ip=${ip}`).then(response => {
      setUserSession(response.data.ip , response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
