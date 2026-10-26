import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [status, setStatus] = useState("idle");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (status == "running") {
      intervalRef.current = setInterval(() => {
        setNow(performance.now());
      }, 10);
    }
    // Cleanup
    return () => clearInterval(intervalRef.current);
  }, [status]);

  let timePassed = 0;
  if (startTime != null && now != null) {
    timePassed = (now - startTime) / 1000;
  }

  useEffect(() => {
    const handleKeyboardDown = (event) => {
      if (event.code === "Space" || event.code === " ") {
        // prevent space bar from scrolling the page
        event.preventDefault();
        // prevent repeat click events
        if (event.repeat) {
          return;
        }
        // if the timer is not running, press and hold will prime it to run
        if (status == "idle") {
          setStatus("primed");
        }
        // if the timer is running, pressing the keyboard will stop it
        else if (status == "running") {
          setStatus("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardDown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
    };
  }, [status]);

  useEffect(() => {
    const handleKeyboardUp = (event) => {
      if (event.code === "Space" || event.code === " ") {
        // if the timer is primed (space bar being held down) run timer on release
        if (status == "primed") {
          let currentTime = performance.now();
          setStartTime(currentTime);
          setNow(currentTime);
          setStatus("running");
        }
      }
    };
    window.addEventListener("keyup", handleKeyboardUp);
    // cleanup
    return () => {
      window.removeEventListener("keyup", handleKeyboardUp);
    };
  }, [status]);

  return (
    <>
      <header>
        <h1>Cube Timer</h1>
      </header>
      <main>
        <section>
          <h2 className={status == "primed" ? "timer-primed" : "timer"}>
            {timePassed.toFixed(2)}
          </h2>
          <p>Press and hold space to start</p>
        </section>
      </main>
    </>
  );
}

export default App;
