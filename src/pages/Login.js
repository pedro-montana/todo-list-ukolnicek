import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase.js';
import { AuthContext } from '../auth';
import { SmallLoad } from '../components/SmallLoad';
import './Login.scss';

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="login">
        <div className="login-inner">
          <img alt="Úkolníček" title="Úkolníček" src="/icon-192.png" />
          <h1>Přihlásit se</h1>
          <form onSubmit={handleLogin}>
            <label>
              <input
                className="login-input"
                name="email"
                type="email"
                placeholder="Email"
              />
            </label>
            <label>
              <input
                className="login-input"
                name="password"
                type="password"
                placeholder="Heslo"
              />
            </label>
            <button type="submit" onClick={() => setLoading(true)}>
              Přihlásit se
            </button>
            <p>
              Jste tu poprvé? <Link to="/signup">Zaregistrovat</Link>.
            </p>
          </form>
        </div>
      </div>
      {loading && <SmallLoad />}
    </>
  );
};

export default withRouter(Login);
