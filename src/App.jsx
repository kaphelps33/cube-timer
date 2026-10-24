import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [run, isRun] = useState(false);
  const intervalRef = useRef(null);

  function handlePress() {
    if (!run) {
      setStartTime(performance.now());
      setNow(performance.now());
    }
    isRun((previsRun) => !previsRun);
  }

  useEffect(() => {
    if (run) {
      intervalRef.current = setInterval(() => {
        setNow(performance.now());
      }, 10);
    }
    // Cleanup
    return () => clearInterval(intervalRef.current);
  }, [run]);

  let timePassed = 0;
  if (startTime != null && now != null) {
    timePassed = (now - startTime) / 1000;
  }

  return (
    <>
      <header>
        <h1>Cube Timer</h1>
      </header>
      <main>
        <section>
          <h2>{timePassed.toFixed(2)}</h2>
          <p>Press and hold space to start</p>
          <button onClick={handlePress}>
            Press to {run ? "end" : "start"} | currently{" "}
            {run ? "running" : "not running"}
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
