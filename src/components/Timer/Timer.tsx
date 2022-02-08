import React, { useEffect, useState } from "react";
import StandardButton from "../Button/StandardButton";

function Timer() {
  const [time, setTime] = useState(0.0);
  const [start, setStart] = useState(false);
  const [screenLock, setScreenLock] = useState<any>();

  function isScreenLockSupported() {
    return "wakeLock" in navigator;
  }

  async function lockScreen() {
    if (isScreenLockSupported()) {
      try {
        const lock = await (navigator as any).wakeLock.request("screen");
        setScreenLock(lock);
      } catch (err) {
        console.log(err.name, err.message);
      }
    }
  }

  function releaseScreen() {
    if (screenLock && screenLock.release) {
      screenLock.release().then(() => {
        setScreenLock(null);
      });
    }
  }

  useEffect(() => {
    const handleWindowFocus = () => {
      if (start) {
        const prevTime = parseInt(sessionStorage.getItem("WL_TIMER"), 10);
        const now = new Date().getTime();

        const secondsElapsed = (now - prevTime) / 1000;
        setTime(time + secondsElapsed);
      }
    };

    const handleWindowBlur = () => {
      if (start) {
        sessionStorage.setItem("WL_TIMER", new Date().getTime().toString());
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  });

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
          if (start) {
            setStart(false);
            releaseScreen();
            sessionStorage.removeItem("WL_TIMER");
          } else if (!start && time > 0) {
            setTime(0.0);
          } else {
            lockScreen();
            setStart(true);
          }
        }}
        className={`${
          start
            ? "bg-red-600 hover:bg-red-600"
            : !start && time > 0
            ? "bg-gray-600 hover:bg-gray-600"
            : "bg-blue-500 hover:bg-blue-500"
        } border-2 h-[60px] text-center justify-center items-center`}
      />

      <h1 className="text-5xl min-w-[150px] ">{time.toFixed(2)}s </h1>
    </div>
  );
}

export default Timer;
