import React, { useRef, useEffect } from "react";
import "./styles.css"; // Inclua seu próprio CSS para este componente

const NotificationsMenu = ({ isOpen, onClose, notifications }) => {
  const menuRef = useRef(null); // Referência para o menu

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

  return (
    <div
      className={`notifications-menu ${isOpen ? "open" : ""}`}
      ref={menuRef} // Associa a referência ao menu
    >
      <h3>Notificações</h3>
      <ul className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              {notification}
            </li>
          ))
        ) : (
          <li className="notification-item">Nenhuma notificação</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationsMenu;
