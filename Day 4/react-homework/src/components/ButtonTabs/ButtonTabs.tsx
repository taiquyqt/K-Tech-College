import React, { useState } from 'react';
import styles from './ButtonTabs.module.css';

type Tab = {
  label: string;
  content: React.ReactNode;
};

type ButtonTabsProps = {
  tabs: Tab[];
};

const ButtonTabs: React.FC<ButtonTabsProps> = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabButtons}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`${styles.tabButton} ${active === idx ? styles.active : ''}`}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs[active].content}
      </div>
    </div>
  );
};

export default ButtonTabs;