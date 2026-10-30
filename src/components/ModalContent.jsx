function ModalContent({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Solve</h3>
        <div>
          <button>+2</button>
          <button>DNF</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ModalContent;
