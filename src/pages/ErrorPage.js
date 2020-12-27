import { Link } from 'react-router-dom';

export const ErrorPage = () => (
  <div className="login">
    <div className="login-inner logout">Chybička se vloudila. <Link to="/">Domů</Link></div>
  </div>
);
