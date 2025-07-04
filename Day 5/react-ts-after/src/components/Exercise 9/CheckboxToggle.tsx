import React, { useState } from "react";
import styles from "./CheckboxToggle.module.css";

const CheckboxToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.container}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        Toggle me
      </label>
      <p>Checkbox is: {checked ? "checked" : "unchecked"}</p>
    </div>
  );
};
export default CheckboxToggle;