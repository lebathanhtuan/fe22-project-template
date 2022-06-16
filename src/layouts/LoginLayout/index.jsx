import { Outlet, Navigate } from "react-router-dom";

import Footer from "../Footer";

import { ROUTES } from "../../constants/routes";

function LoginLayout() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default LoginLayout;
