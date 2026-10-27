function SolveHistory({ solves }) {
  return (
    <section>
      <h3>Recent Times</h3>
      <p>
        {solves.length} previous {solves.length <= 1 ? "Solve" : "Solves"}
      </p>
      <ul>
        {solves
          .slice()
          .reverse()
          .map((solve, index) => (
            <li key={index}>{solve}</li>
          ))}
      </ul>
    </section>
  );
}

export default SolveHistory;
