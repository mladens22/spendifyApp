import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import 'animate.css'

import styles from './Login.module.css';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2 className='animate__animated animate__flipInX'>Log in</h2>
      <label>

        <input type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="Email"

        />
      </label>

      <label>

        <input type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          placeholder="Password"


        />
      </label>
      {!isPending && <button className='btn btn-margin'>Log in</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <p>{error}</p>}

      <p className={styles.signup}>Don't have an account yet? <Link to="/signup">Sign up</Link></p>

    </form>
  )
}
