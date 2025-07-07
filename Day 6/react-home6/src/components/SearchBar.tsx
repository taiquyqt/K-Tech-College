
import styles from './SearchBar.module.css';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Danang"
    />
  );
}