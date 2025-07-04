import React, { useState } from "react";
import styles from "./InputTracker.module.css";

const InputTracker: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type here"
      />
      <p>
        You typed: {value.length > 0 ? value : "nothing"}
      </p>
    </div>
  );
};
export default InputTracker;