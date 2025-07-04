import { useState } from "react";

function ButtonClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <p>Clicked: {count} times</p>
    </div>
  );    
}

export default ButtonClickCounter;