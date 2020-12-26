import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import './Login.scss';

const Logout = () => {
  const [goLogin, setGoLogin] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setGoLogin(true);
    }, 1000);
  }, []);

  if (goLogin) {
    return (<Redirect to="/login" />);
  }
  return (
    <div className="login">
      <div className="login-inner logout">
        Byli jste odhlášeni.
      </div>
    </div>
  );
};

export default withRouter(Logout);
