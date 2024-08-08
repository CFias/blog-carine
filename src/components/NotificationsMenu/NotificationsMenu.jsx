import React, { useRef, useEffect, useState } from "react";
import "./styles.css"; // Inclua seu próprio CSS para este componente
import { Modal, Backdrop, Fade } from "@mui/material";

const NotificationsMenu = ({ isOpen, onClose, notifications }) => {
  const [notificationsState, setNotificationsState] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef(null); // Referência para o menu

  // Ordena as notificações por data (mais recentes primeiro)
  const sortNotificationsByDate = (notifications) => {
    return [...notifications].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  };

  useEffect(() => {
    // Ordena e atualiza o estado das notificações quando o componente é montado ou quando as notificações mudam
    setNotificationsState(sortNotificationsByDate(notifications));
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // Fecha o menu se o clique estiver fora do menu
      }
    };

    // Adiciona o listener quando o menu está aberto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove o listener quando o menu é fechado ou desmontado
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
    setNotificationsState((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notification.id ? { ...notif, isViewed: true } : notif
      )
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNotification(null);
  };

  return (
    <div
      className={`notifications-menu ${isOpen ? "open" : ""}`}
      ref={menuRef} // Associa a referência ao menu
    >
      <h3>Notificações</h3>
      <ul className="notifications-list">
        {notificationsState.length > 0 ? (
          notificationsState.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${
                !notification.isViewed ? "unread" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <span className="notification-title">{notification.title}</span>
              {!notification.isViewed && (
                <span className="notification-badge" />
              )}
            </li>
          ))
        ) : (
          <li className="notification-item">Nenhuma notificação</li>
        )}
      </ul>

      <Modal
        className="modal-card-container"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade className="modal-card-content" in={openModal}>
          <div className="modal-paper">
            {selectedNotification && (
              <>
                <h2 className="title-modal" id="modal-title">
                  {selectedNotification.title}
                </h2>
                <p className="caption-modal" id="modal-description">
                  {selectedNotification.description}
                </p>
                <p className="modal-date">
                  Publicado em: {selectedNotification.date}
                </p>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NotificationsMenu;
