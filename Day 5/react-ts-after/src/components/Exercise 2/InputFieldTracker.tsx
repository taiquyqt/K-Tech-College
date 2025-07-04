import { useState } from "react";

function InputFieldTracker() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {value ? value : "nothing"}</p>
    </div>
  );
}

export default InputFieldTracker;