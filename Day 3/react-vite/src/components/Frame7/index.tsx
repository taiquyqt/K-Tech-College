// src/components/Frame7/index.tsx
import styles from './Frame7.module.css';

interface WeatherCardProps {
  icon: string;
  temperature: string;
  location: string;
  date: string;
}

const Frame7 = ({ icon, temperature, location, date }: WeatherCardProps) => {
  return (
    <div className={styles.frame7}>
      <div className={styles.weatherCard}>
        <div className={styles.iconWrap}>
          <img src={icon} alt="weather-icon" className={styles.icon} />
        </div>
        <div className={styles.info}>
          <div className={styles.temp}>{temperature}</div>
          <div className={styles.location}>{location}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      
      </div>
      
  );
};

export default Frame7;
