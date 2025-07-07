import React from 'react';
import styles from './WeatherCard.module.css';

type Props = {
  label: string;
  value: string | number;
};

export default function WeatherCard({ label, value }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}