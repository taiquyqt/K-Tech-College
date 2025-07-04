import React, { useState } from 'react';
import styles from './SlideWithThumb.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type SlideWithThumbProps = {
  images: string[];
};

const SlideWithThumb: React.FC<SlideWithThumbProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainImageWrapper}>
        <button className={styles.arrowBtn} onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <img src={images[current]} alt={`slide-${current}`} className={styles.mainImage} />
        <button className={styles.arrowBtn} onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
      <div className={styles.thumbs}>
        {images.map((img, idx) => (
          <button
            key={img}
            className={`${styles.thumbBtn} ${idx === current ? styles.active : ''}`}
            onClick={() => setCurrent(idx)}
          >
            <img src={img} alt={`thumb-${idx}`} className={styles.thumbImg} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideWithThumb;