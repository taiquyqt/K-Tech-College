
import styles from './Frame5.module.css';

interface TeamCardProps {
  avatar?: string;
  name: string;
  bgColor: string;
  description?: string;
  members?: string[];
}

const Frame5 = ({ avatar, name, bgColor, description, members }: TeamCardProps) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.avatarGroup}>
        {members ? (
          members.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`member-${index}`}
              className={styles.avatar}
              style={{ left: `${index * 16}px`, zIndex: members.length - index }}
            />
          ))
        ) : (
          <img src={avatar} alt={name} className={styles.avatar} />
        )}
      </div>
      <div className={styles.textArea}>
        <div className={styles.name}>{name}</div>
        {description && <div className={styles.desc}>{description}</div>}
      </div>
    </div>
  );
};

export default Frame5;
