import { IoMdSearch } from 'react-icons/io'; // Icon tìm kiếm
import styles from './SearchBar.module.css';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Danang"
      />
      <IoMdSearch className={styles.icon} />
    </div>
  );
}
