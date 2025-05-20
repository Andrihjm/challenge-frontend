import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page";
import SignIn from "../auth/sign-in/[[...sign-in]]/page";
import SignUp from "../auth/sign-up/[[...sign-up]]/page";
import ForgotPassword from "../auth/password-settings/forgot-password";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRouter;
