import React, { useState } from "react";
import styles from "./DropdownSelection.module.css";

const fruits = ["Apple", "Banana", "Orange"];

const DropdownSelection: React.FC = () => {
  const [selected, setSelected] = useState(fruits[0]);
  return (
    <div className={styles.container}>
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        {fruits.map(fruit => (
          <option key={fruit} value={fruit}>{fruit}</option>
        ))}
      </select>
      <p>Selected fruit: {selected}</p>
    </div>
  );
};
export default DropdownSelection;