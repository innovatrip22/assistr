
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Define user type as a union to match what's used in AuthDialog
type UserType = "institution" | "business" | "tourist";

interface AuthRequiredProps {
  children: React.ReactNode;
  userType: UserType;
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

  // If there's no saved user type, redirect to home
  if (!currentUserType) {
    return <Navigate to="/" />;
  }

  // Make sure we're checking for exact match
  if (currentUserType !== userType) {
    console.log(`Access denied: Required ${userType}, but found ${currentUserType}`);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRequired;
