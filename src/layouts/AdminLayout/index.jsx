import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AdminHeader from "../AdminHeader";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  const { userInfo } = useSelector((state) => state.user);

  if (!accessToken) return <Navigate to={ROUTES.LOGIN} />;
  if (userInfo.data.role !== "admin" && !userInfo.loading) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  if (userInfo.loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}>
        <S.LoadingWrapper></S.LoadingWrapper>
      </Spin>
    );
  }
  return (
    <>
      <AdminHeader
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
