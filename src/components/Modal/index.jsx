import React, { useContext } from "react";
import "./styles.css";
import { AppContext } from "../../contexts/AppContext";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export default function Modal() {
  const { isLogin, showModal, setShowModal } =
    useContext(AppContext);

  return (
    <>
      {showModal == true && (
        <div className="modal-container">
          <div
            onClick={() => setShowModal(false)}
            className="modal-overlay"
          ></div>
          <div className="modal-content">
            {isLogin == true ? <Login /> : <Register />}
          </div>
        </div>
      )}
    </>
  );
};
