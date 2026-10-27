function SolveHistory({ solves }) {
  return (
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
  );
}

export default SolveHistory;
