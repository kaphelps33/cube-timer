function ModalContent({ solve, onClose, onDelete }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Solve {solve.solveNumber}</h3>
        <div>
          <button>+2</button>
          <button>DNF</button>
          <button onClick={onDelete}>Delete</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ModalContent;
