import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

let nextSolveNumber = 0;

function SolveHistory({ solves }) {
  const [showModal, setShowModal] = useState(false);
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
              <tr
                key={solve.id}
                className="time-row"
                onClick={() => setShowModal(true)}
              >
                <td>{solve.solveNumber}</td>
                <td>{solve.time}</td>
                <td>fill me in</td>
                <td>fill me in</td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          // <div className="modal-overlay">
          //   <div className="modal-content">
          //     <h3>Edit Solve</h3>
          //     <div>
          //       <button>+2</button>
          //       <button>DNF</button>
          //     </div>
          //     <button onClick={() => setShowModal(false)}>Close</button>
          //   </div>
          // </div>,
          document.body
        )}
    </section>
  );
}

export default SolveHistory;
