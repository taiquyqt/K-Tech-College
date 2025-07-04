import React, { useState } from 'react';
import styles from './MultiAccordion.module.css';

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type MultiAccordionProps = {
  items: AccordionItem[];
};

const MultiAccordion: React.FC<MultiAccordionProps> = ({ items }) => {
  // Mỗi phần tử là boolean: true nếu mở, false nếu đóng
  const [openIndexes, setOpenIndexes] = useState<boolean[]>(() =>
    items.map(() => false)
  );

  const handleToggle = (idx: number) => {
    setOpenIndexes(prev =>
      prev.map((isOpen, i) => (i === idx ? !isOpen : isOpen))
    );
  };

  return (
    <div className={styles.wrapper}>
      {items.map((item, idx) => (
        <div key={item.title} className={styles.accordionItem}>
          <button
            className={`${styles.title} ${openIndexes[idx] ? styles.active : ''}`}
            onClick={() => handleToggle(idx)}
          >
            {item.title}
          </button>
          <div
            className={`${styles.contentWrapper} ${openIndexes[idx] ? styles.open : ''}`}
            style={{
              maxHeight: openIndexes[idx] ? 500 : 0,
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

export default MultiAccordion;