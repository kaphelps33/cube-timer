function SolveHistory({ solves }) {
  return (
    <section>
      <h3>Recent Times</h3>
      <p>
        {solves.length} previous {solves.length === 1 ? "solve" : "solves"}
      </p>
      {solves.length >= 1 ? (
        <div>
          <p>Best: {Math.min(...solves.map((solve) => solve.time))}</p>
          <p>Worst: {Math.max(...solves.map((solve) => solve.time))}</p>
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Avg. of 5</th>
            <th>Avg. of 12</th>
          </tr>
        </thead>
        <tbody>
          {solves
            .slice()
            .reverse()
            .map((solve) => (
              <tr key={solve.id} className="time-row">
                <td>{solve.id}</td>
                <td>{solve.time}</td>
                <td>fill me in</td>
                <td>fill me in</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default SolveHistory;
