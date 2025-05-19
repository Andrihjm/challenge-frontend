import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aku" element={<div>aku</div>} />
    </Routes>
  );
};

export default Router;
