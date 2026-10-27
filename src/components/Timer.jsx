function Timer({ timePassed, status }) {
  return (
    <section>
      <h2 className={status == "primed" ? "timer-primed" : "timer"}>
        {timePassed.toFixed(2)}
      </h2>
      {status == "idle" ? <p>Press, hold, and release space to start</p> : null}
    </section>
  );
}

export default Timer;
