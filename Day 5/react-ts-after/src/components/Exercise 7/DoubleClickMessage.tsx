import React, { useState } from "react";
import styles from "./DoubleClickMessage.module.css";

const DoubleClickMessage: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleDoubleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <div className={styles.container}>
      <button onDoubleClick={handleDoubleClick}>Double Click Me</button>
      {show && <div className={styles.message}>Double-clicked!</div>}
    </div>
  );
};
export default DoubleClickMessage;