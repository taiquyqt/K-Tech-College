
import styles from './Frame7TopCard.module.css';

interface TopCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  bgColor?: string;
  showMenu?: boolean;
}

const Frame7TopCard = ({ title, subtitle, icon, bgColor = '#f5fbe4', showMenu }: TopCardProps) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.left}>
        {icon && <img src={icon} alt="icon" className={styles.icon} />}
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
      {showMenu && <div className={styles.menu}>•••</div>}
    </div>
  );
};

export default Frame7TopCard;
