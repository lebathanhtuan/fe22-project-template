import React, { useContext } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { NameContext } from "../../App";

import * as S from "./styles";

function Header({ isShowSidebar, setIsShowSidebar }) {
  const { name } = useContext(NameContext);

  const { userInfo } = useSelector((state) => state.user);

  function handleToggleSidebar() {
    setIsShowSidebar(!isShowSidebar);
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <Button variant="outline-primary" onClick={() => handleToggleSidebar()}>
          Ẩn/Hiện Sidebar
        </Button>
        <div>Logo</div>
      </S.HeaderLogo>
      <div>{userInfo.data.fullName}</div>
    </S.HeaderContainer>
  );
}

export default Header;
