import React, { useEffect, useState } from "react";
import StandardButton from "../Button/StandardButton";

function Timer() {
  const [time, setTime] = useState(0.0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="flex items-center gap-5 justify-center">
      <StandardButton
        label={`${
          start ? "Stop" : !start && time > 0 ? "Reset" : "Start"
        } timer`}
        onClick={() => {
          if (start) setStart(false);
          else if (!start && time > 0) {
            setTime(0.0);
          } else {
            setStart(true);
          }
        }}
        className={`${
          start
            ? "bg-red-600 hover:bg-red-600"
            : !start && time > 0
            ? "bg-gray-600 hover:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-600"
        } border-2 h-[60px] text-center justify-center items-center`}
      />

      <h1 className="text-5xl min-w-[150px] ">{time.toFixed(2)}s </h1>
    </div>
  );
}

export default Timer;
