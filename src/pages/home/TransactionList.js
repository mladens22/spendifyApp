import { useFirestore } from '../../hooks/useFirestore'; 
import {VscRemove} from 'react-icons/vsc'; 
import styles from './Home.module.css'; 




export default function TransactionList( {transactions } ) {

  const {deleteDocument} = useFirestore('transactions'); 
  


  return (

    <ul className={styles.transactions}> 

    {transactions && transactions.map((transaction) => (
        <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>{transaction.amount} €</p> 
            <button onClick={() => deleteDocument(transaction.id)}>
            <VscRemove/>
            </button> 
            
        </li>
    ))} 

   
    </ul>
  )
}
