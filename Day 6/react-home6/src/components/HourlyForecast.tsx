
import styles from './HourlyForecast.module.css';

type Hour = {
  time: string;
  temp: number;
  icon: string;
  now?: boolean;
};

type Props = {
  hours: Hour[];
};

export default function HourlyForecast({ hours }: Props) {
  return (
    <div className={styles.hourlyList}>
      {hours.map((h, idx) => (
        <div key={idx} className={styles.hourItem}>
          <img src={h.icon} alt="" className={styles.icon} />
          <div className={styles.temp}>{h.temp}°C</div>
          <div className={styles.time}>{h.now ? 'Now' : h.time}</div>
        </div>
      ))}
    </div>
  );
}