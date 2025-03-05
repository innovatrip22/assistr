
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthRequiredProps {
  children: React.ReactNode;
  userType: "institution" | "business" | "tourist";
}

const AuthRequired = ({ children, userType }: AuthRequiredProps) => {
  const { user, userType: currentUserType, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (currentUserType !== userType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRequired;
