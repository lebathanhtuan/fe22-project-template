import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const userName = "Tuấn";

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to={ROUTES.LOGIN} />;
  return (
    <>
      <Header
        name={userName}
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <S.MainWrapper>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.ContentWrapper isShowSidebar={isShowSidebar}>
          <Outlet />
        </S.ContentWrapper>
      </S.MainWrapper>
      <Footer />
    </>
  );
}

export default AdminLayout;
