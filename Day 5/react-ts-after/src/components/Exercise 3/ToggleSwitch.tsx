import React, { useState } from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className={styles.container}>
      <button onClick={() => setIsOn(on => !on)}>
        {isOn ? "Turn OFF" : "Turn ON"}
      </button>
      <p>State: {isOn ? "ON" : "OFF"}</p>
    </div>
  );
};
export default ToggleSwitch;