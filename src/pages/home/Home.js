import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import useMediaQuery from '../../hooks/useMediaQuery'; 

// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  const isMobile = useMediaQuery('(max-width: 450px)');


  return (
    <div className={ isMobile ? styles.flexContainer : styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={ isMobile ? styles.sidebarLeftMargin : styles.sidebar}> 
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}