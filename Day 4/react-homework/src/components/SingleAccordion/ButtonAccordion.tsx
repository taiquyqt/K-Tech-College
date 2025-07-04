import React, { useState } from 'react';
import styles from './ButtonAccordion.module.css';

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type ButtonAccordionProps = {
  items: AccordionItem[];
};

const ButtonAccordion: React.FC<ButtonAccordionProps> = ({ items }) => {
  // Luôn mở thẻ đầu tiên
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx: number) => {
    if (openIndex !== idx) {
      setOpenIndex(idx);
    }
   
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item, idx) => (
        <div key={item.title} className={styles.accordionItem}>
          <button
            className={`${styles.title} ${openIndex === idx ? styles.active : ''}`}
            onClick={() => handleToggle(idx)}
          >
            {item.title}
          </button>
          <div
            className={`${styles.contentWrapper} ${openIndex === idx ? styles.open : ''}`}
            style={{
              maxHeight: openIndex === idx ? 500 : 0,
              transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className={styles.content}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonAccordion;