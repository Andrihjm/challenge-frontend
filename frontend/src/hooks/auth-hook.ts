import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

export const useNavigateURL = (protectType: "protected" | "guest") => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.userInfo,
  );

  useEffect(() => {
    if (protectType === "protected" && !isAuthenticated) {
      navigate("/auth/sign-in");
    }

    if (protectType === "guest" && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, protectType]);
};
