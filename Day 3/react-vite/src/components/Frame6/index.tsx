import styles from './Frame6.module.css';
import { Bell } from 'lucide-react';

interface Transaction {
  logo: string;
  name: string;
  description: string;
  amount: string;
  time: string;
}

interface Frame6Props {
  transaction: Transaction;
  notificationText: string;
  notificationCount: number;
}

const Frame6 = ({ transaction, notificationText, notificationCount }: Frame6Props) => {
  return (
    <div className={styles.frame6}>
      <div className={styles.card}>
        <div className={styles.left}>
          <img src={transaction.logo} alt="logo" className={styles.logo} />
          <div>
            <div className={styles.name}>{transaction.name}</div>
            <div className={styles.desc}>{transaction.description}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.amount}>{transaction.amount}</div>
          <div className={styles.time}>{transaction.time}</div>
        </div>
      </div>

      <div className={styles.notify}>
        <div className={styles.message}>{notificationText}</div>
        <div className={styles.iconGroup}>
          <Bell size={18} />
          <div className={styles.badge}>{notificationCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Frame6;
