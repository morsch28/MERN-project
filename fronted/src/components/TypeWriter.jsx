import { useEffect, useState } from "react";

function TypeWriter({ text, speed = 100 }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      index++;
      if (index > text.length - 1) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  // const lines = displayText.split("\n");

  return (
    <p
      className="p-welcomePage text-wrap welcomeText"
      style={{ whiteSpace: "pre-line", height: "205px" }}
    >
      {displayText}
    </p>
  );
}

export default TypeWriter;
