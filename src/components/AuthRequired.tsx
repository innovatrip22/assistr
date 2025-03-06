
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthRequiredProps {
  children: React.ReactNode;
  userType: "institution" | "business" | "tourist";
}

const AuthRequired = ({ children, userType }: AuthRequiredProps) => {
  const [loading, setLoading] = useState(true);
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);

  useEffect(() => {
    // Get the saved user type from localStorage
    const savedUserType = localStorage.getItem("testUserType");
    setCurrentUserType(savedUserType);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  // If there's no saved user type or it doesn't match the required type, redirect to home
  if (!currentUserType) {
    return <Navigate to="/" />;
  }

  // This is the critical change - making sure we're checking for exact match
  if (currentUserType !== userType) {
    console.log(`Access denied: Required ${userType}, but found ${currentUserType}`);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRequired;
