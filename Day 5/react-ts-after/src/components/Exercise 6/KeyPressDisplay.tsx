import React, { useState } from "react";
import styles from "./KeyPressDisplay.module.css";

const KeyPressDisplay: React.FC = () => {
  const [lastKey, setLastKey] = useState("");
  return (
    <div className={styles.container}>
      <input
        type="text"
        onKeyDown={e => setLastKey(e.key)}
        placeholder="Press a key"
      />
      <p>Last key: {lastKey}</p>
    </div>
  );
};
export default KeyPressDisplay;