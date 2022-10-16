import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';
import 'animate.css'


export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const { error, isPending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);


  }



  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>

      <h2 className='animate__animated animate__flipInX'>Sign up</h2>
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
      <label>

        <input type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
          placeholder="Name"

        />
      </label>

      {!isPending && <button>
        Sign up
        <div class="arrow-wrapper">
          <div class="arrow"></div>

        </div>
      </button>
      }
       {isPending && <button className='btn' disabled>Loading...</button>} 


      {error && <p>{error}</p>}

    </form>
  )
}
