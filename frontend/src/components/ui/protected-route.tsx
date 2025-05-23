import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import type React from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.userInfo,
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
