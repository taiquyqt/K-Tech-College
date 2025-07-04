import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import styles from './LikeButton.module.css';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleToggle = () => setLiked(prev => !prev);

  return (
    <div className={styles.wrapper}>
      <button className={styles.iconButton} onClick={handleToggle}>
        {liked ? (
          <FaThumbsUp className={styles.likedIcon} />
        ) : (
          <FaThumbsUp className={styles.likeIcon} />
        )}
      </button>
      <span className={styles.text}>
        {liked ? "Thank you !" : "Click like if this post is useful to you !"}
      </span>
    </div>
  );
};

export default LikeButton;