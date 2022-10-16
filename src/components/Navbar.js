import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles and logo
import styles from './Navbar.module.css';
import logo from '../assets/spendify.png'



export default function Navbar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();


  return (
    <nav className={styles.navbar}>

      <ul>

        <li className={styles.title}>

          <img src={logo} alt="logo" />

        </li>

        {!user && (
          <>
            <li className={styles.first}><NavLink to="/login">Log in</NavLink></li>
            <li className={styles.second}><NavLink to="/signup">Sign up</NavLink></li>
          </>
        )}


        {user && (
          <>
            <li className={styles.name}>Hello, {user.displayName}</li> 
           

            <li>
              <button className="btn btn2" onClick={logout}>Logout</button>
            </li>
          </>

        )}
      </ul>

    </nav>
  )
}
