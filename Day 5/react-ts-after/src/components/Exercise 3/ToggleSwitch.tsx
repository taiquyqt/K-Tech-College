import React, { useState } from "react";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOn((on) => !on)}>
        {isOn ? "Turn OFF" : "Turn ON"}
      </button>
      <p>State: {isOn ? "ON" : "OFF"}</p>
    </div>
  );
}

export default ToggleSwitch;