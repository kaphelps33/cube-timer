import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

function SolveHistory({ solves }) {
  const [selectedSolve, setSelectedSolve] = useState(null);

  return (
    <section>
      <h3>Recent Times</h3>
      <p>
        {solves.length} previous {solves.length === 1 ? "solve" : "solves"}
      </p>
      {solves.length >= 1 && (
        <div>
          <p>Best: {Math.min(...solves.map((solve) => solve.time))}</p>
          <p>Worst: {Math.max(...solves.map((solve) => solve.time))}</p>
        </div>
      )}
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
          {solves.map((solve, index) => (
            <tr
              key={solve.id}
              className="time-row"
              onClick={() => setSelectedSolve(solve)}
            >
              <td>{index + 1}</td>
              <td>{solve.time}</td>
              <td>fill me in</td>
              <td>fill me in</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSolve &&
        createPortal(
          <ModalContent
            solve={selectedSolve}
            onClose={() => setSelectedSolve(null)}
          />,
          document.body
        )}
    </section>
  );
}

export default SolveHistory;
