import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserHeader from "../UserHeader";
import Footer from "../Footer";

import * as S from "./styles";

function UserLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  return (
    <>
      <UserHeader
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
      <Footer />
    </>
  );
}

export default UserLayout;
