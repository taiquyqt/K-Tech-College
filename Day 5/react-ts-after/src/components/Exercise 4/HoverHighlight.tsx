import React, { useState } from "react";

function HoverHighlight() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered ? "yellow" : "white",
        border: "1px solid #ccc",
        padding: 20,
        width: 150,
        textAlign: "center"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Hover me!
    </div>
  );
}

export default HoverHighlight;