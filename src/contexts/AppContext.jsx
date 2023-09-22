import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};