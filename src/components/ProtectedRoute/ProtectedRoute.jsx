// src/components/ProtectedRoute.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { adminUIDs } from "../../Config/Config";

const ProtectedRoute = () => {
  const { user } = useAuthValue();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || !adminUIDs.includes(user.uid)) {
      navigate("/");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
