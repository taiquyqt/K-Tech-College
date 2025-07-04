import styles from './Frame3.module.css';
import { MoreHorizontal, EyeOff } from 'lucide-react';

type Frame3Props = {
  score: {
    time: string;
    homeTeam: string;
    homeFlag: string;
    awayTeam: string;
    awayFlag: string;
    result: string;
  };
  club: {
    name: string;
    logo: string;
  };
  user: {
    name: string;
    image: string;
    cardNumber: string;
  };
  dashboard: {
    tags: string[];
    title: string;
    subtitle: string;
    progress: number;
  };
};

const Frame3 = ({ score, club, user, dashboard }: Frame3Props) => {
  return (
    <div className={styles.frame3}>
      {/* Score Card */}
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.minute}>{score.time}</span>
          <MoreHorizontal className={styles.more} size={18} />
        </div>
        <div className={styles.scoreRow}>
          <div className={styles.team}>{score.homeTeam} <img src={score.homeFlag} alt={score.homeTeam} /></div>
          <div className={styles.score}>{score.result}</div>
          <div className={styles.team}><img src={score.awayFlag} alt={score.awayTeam} /> {score.awayTeam}</div>
        </div>
      </div>

      {/* Club Card */}
      <div className={styles.card}>
        <div className={styles.clubRow}>
          <img className={styles.logo} src={club.logo} alt={club.name} />
          <span className={styles.clubName}>{club.name}</span>
          <MoreHorizontal className={styles.more} size={18} />
        </div>
      </div>

      {/* User Card */}
      <div className={styles.card}>
        <div className={styles.userRow}>
          <img className={styles.avatar} src={user.image} alt="User" />
          <div className={styles.userInfo}>
            <strong>{user.name}</strong>
            <div><span className={styles.visa}>VISA</span> {user.cardNumber}</div>
          </div>
          <EyeOff size={18} />
        </div>
      </div>

      {/* Dashboard Card */}
      <div className={styles.card}>
        <div className={styles.tagRow}>
          <span className={styles.tagGreen}>{dashboard.tags[0]}</span>
          <span className={styles.tagPink}>{dashboard.tags[1]}</span>
          <MoreHorizontal className={styles.more} size={18} />
        </div>
        <div className={styles.dashboardText}>
          <strong>{dashboard.title}</strong>
          <p>{dashboard.subtitle}</p>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${dashboard.progress}%` }}></div>
          <span>{dashboard.progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Frame3;