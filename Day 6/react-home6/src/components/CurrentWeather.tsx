
import styles from './CurrentWeather.module.css';
import WeatherCard from './WeatherCard';


type Props = {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
};

export default function CurrentWeather({ temp, condition, icon, humidity, wind }: Props) {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.mainInfo}>
        <div className={styles.leftCol}>
          <span className={styles.temp}>{temp}°</span>
          <span className={styles.condition}>{condition}</span>
        </div>
        <div className={styles.rightCol}>
          <img className={styles.icon} src={icon} alt={condition} />
        </div>
      </div>
      <div className={styles.cards}>
        <WeatherCard label="Độ ẩm" value={`${humidity}%`} />
        <div className={styles.divider}></div>
        <WeatherCard label="Gió" value={`${wind} km/h`} />
      </div>
    </div>
  );
}