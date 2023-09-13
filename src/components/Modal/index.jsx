import React, { useContext } from "react";
import "./styles.css";
import { AppContext } from "../../contexts/AppContext";

export default function Modal({ children }) {
  const { showModal, setShowModal } = useContext(AppContext);

  return (
    <>
      {showModal == true && (
        <div className="modal-container">
          <div
            onClick={() => setShowModal(true)}
            className="modal-overlay"
          ></div>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
}
