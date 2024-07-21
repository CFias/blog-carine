import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Define o elemento raiz da sua aplicação

const ArticleModal = ({ isOpen, closeModal, post }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Detalhes do Artigo"
    >
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={closeModal}>Fechar</button>
    </Modal>
  );
};

export default ArticleModal;
