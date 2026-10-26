import { useState, useEffect } from "react";
import "./App.css";

const scrambleMoves = ["R", "L", "F", "B", "D", "U"];
const scrambleMoveModifier = ["", "2", "'"];

const generateScramble = () => {
  let scrambleArray = [];
  for (let i = 0; i < 20; i++) {
    let nextTurn =
      scrambleMoves[Math.floor(Math.random() * scrambleMoves.length)];
    let nextModifier =
      scrambleMoveModifier[
        Math.floor(Math.random() * scrambleMoveModifier.length)
      ];
    scrambleArray[i] = nextTurn + nextModifier + " ";
  }
  return scrambleArray;
};

function App() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [status, setStatus] = useState("idle");
  const [solves, setSolves] = useState([]);
  const [scramble, setScramble] = useState(generateScramble);

  useEffect(() => {
    let intervalId;
    if (status == "running") {
      intervalId = setInterval(() => {
        setNow(performance.now());
      }, 10);
    }
    // Cleanup
    return () => clearInterval(intervalId);
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
          let solveTime = document.querySelector("h2").innerHTML;
          setStatus("idle");
          setSolves((prevsolves) => [...prevsolves, solveTime]);
          setScramble(generateScramble());
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardDown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
    };
  }, [status, now, startTime]);

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
          {scramble}
          <small>
            Note: This is a filler scramble, it is not WCA legal...yet
          </small>
        </section>
        <section>
          <h2 className={status == "primed" ? "timer-primed" : "timer"}>
            {timePassed.toFixed(2)}
          </h2>
          {status == "idle" ? (
            <p>Press, hold, and release space to start</p>
          ) : null}
        </section>
        <section>
          <h3>Recent Times</h3>
          <ul>
            {solves
              .slice()
              .reverse()
              .map((solve, index) => (
                <li key={index}>{solve}</li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
