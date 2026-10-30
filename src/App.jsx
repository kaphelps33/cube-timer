import { useState, useEffect, useRef } from "react";
import SolveHistory from "./components/SolveHistory";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import generateScramble from "./utilities/scrambler";
import "./App.css";

let nextSolveId = 0;

function App() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [status, setStatus] = useState("idle");
  const [solves, setSolves] = useState([]);
  const [scramble, setScramble] = useState(generateScramble);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (status == "running") {
      intervalIdRef.current = setInterval(() => {
        setNow(performance.now());
      }, 10);
    }
    // Cleanup
    return () => clearInterval(intervalIdRef.current);
  }, [status]);

  let timePassed = 0;
  if (startTime != null && now != null) {
    timePassed = (now - startTime) / 1000;
  }

  // handles pressing keyboard down; stopping the timer or priming it
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
        if (status === "idle") {
          setStatus("primed");
        }
        // if the timer is running, pressing the keyboard will stop it
        else if (status === "running") {
          const solve = {
            id: (nextSolveId += 1),
            solveNumber: (nextSolveId += 1),
            time: timePassed.toFixed(2),
            penalty: "",
            scramble: scramble
          };
          setStatus("idle");
          setSolves((prevsolves) => [...prevsolves, solve]);
          setScramble(generateScramble());
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardDown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
    };
  }, [status, scramble, timePassed]);

  useEffect(() => {
    const handleKeyboardUp = (event) => {
      if (event.code === "Space" || event.code === " ") {
        // if the timer is primed (space bar being held down) run timer on release
        if (status === "primed") {
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
        <p>3x3x3</p>
      </header>
      <main>
        <Scramble scramble={scramble} />
        <Timer timePassed={timePassed} status={status} />
        <SolveHistory solves={solves} />
      </main>
    </>
  );
}

export default App;
