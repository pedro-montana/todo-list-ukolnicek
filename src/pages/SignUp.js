import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase.js';
import './Login.scss';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="signup">
      <div className="signup-inner">
        <img src="/images/logo-small.png" />
        <h1>Registrovat</h1>
        <form onSubmit={handleSignUp} >
          <label>
            <input
              className="signup-input"
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
          <label>
            <input
              className="signup-input"
              name="password"
              type="password"
              placeholder="Heslo"
            />
          </label>
          <button type="submit">Zaregistrovat se</button>
          <p>Již máte účet? <Link to='/login'>Přihlásit</Link>.</p>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
