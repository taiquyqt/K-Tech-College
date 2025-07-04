import styles from './Frame4.module.css';
import { Camera, Phone } from 'lucide-react';

interface Frame4Props {
  topUser: {
    name: string;
    role: string;
    avatar: string;
  };
  bottomUser: {
    name: string;
    avatar: string;
  };
}

const Frame4 = ({ topUser, bottomUser }: Frame4Props) => {
  return (
    <div className={styles.frame4}>
      <div className={styles.card}>
        <div className={styles.topUser}>
          <img className={styles.avatar} src={topUser.avatar} alt={topUser.name} />
          <div className={styles.textInfo}>
            <strong>{topUser.name}</strong>
            <p>{topUser.role}</p>
          </div>
          <Camera className={styles.icon} size={18} />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.bottomUser}>
          <img className={styles.avatarLarge} src={bottomUser.avatar} alt={bottomUser.name} />
          <span className={styles.name}>{bottomUser.name}</span>
          <Phone className={styles.icon} size={18} />
        </div>
      </div>
    </div>
  );
};

export default Frame4;
