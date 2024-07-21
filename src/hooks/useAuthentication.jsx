// useAuthentication.js
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  function checkIfCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      let errorMessage;

      if (error.message.includes("Password")) {
        errorMessage = "A senha precisa ter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        errorMessage = "Email já cadastrado.";
      } else {
        errorMessage = "Falha no cadastro. Tente novamente mais tarde.";
      }

      setLoading(false);
      setError(errorMessage);
    }
  };

  const login = async (data) => {
    checkIfCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let errorMessage;

      if (error.message.includes("user-not-found")) {
        errorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        errorMessage = "Senha incorreta.";
      } else {
        errorMessage = "Ocorreu um erro. Tente novamente mais tarde.";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfCancelled();
    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
