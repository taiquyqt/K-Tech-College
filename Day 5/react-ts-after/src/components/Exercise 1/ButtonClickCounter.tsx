import React, { useState } from "react";
import styles from "./ButtonClickCounter.module.css";

const ButtonClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <p>Clicked: {count} times</p>
    </div>
  );
};
export default ButtonClickCounter;