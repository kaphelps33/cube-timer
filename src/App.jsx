import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [status, setStatus] = useState("idle");
  const intervalRef = useRef(null);

  function handlePress() {
    // Only run timer if it is primed
    if (status == "idle") {
      // Do something here
    } else if (status == "primed") {
      setStartTime(performance.now());
      setNow(performance.now());
      setStatus("running");
    }
  }

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
        // prevent spacebar from scrolling the page
        event.preventDefault();
        if (event.repeat) {
          return;
        }
        // only handle keyboard down if timer is running
        if (status == "idle") {
          console.log("Status is idle, setting timer to primed");
          setStatus("primed");
          handlePress();
        } else if (status == "running") {
          console.log("Stats is running, setting to idle");
          setStatus("idle");
          handlePress();
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardDown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
    };
  });

  useEffect(() => {
    const handleKeyboardUp = (event) => {
      if (event.code === "Space" || event.code === " ") {
        // if the timer is not running
        if (status == "primed") {
          console.log("Status is primed. Setting status to running");
          setStatus("running");
          handlePress();
        }
      }
    };
    window.addEventListener("keyup", handleKeyboardUp);
    // cleanup
    return () => {
      window.removeEventListener("keyup", handleKeyboardUp);
    };
  });

  return (
    <>
      <header>
        <h1>Cube Timer</h1>
      </header>
      <main>
        <section>
          <h2>{timePassed.toFixed(2)}</h2>
          <p>Press and hold space to start</p>
          {/* <button onClick={handlePress}>
            Press to {run ? "end" : "start"} | currently{" "}
            {run ? "running" : "not running"}
          </button> */}
        </section>
      </main>
    </>
  );
}

export default App;
