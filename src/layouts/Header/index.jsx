import React, { useContext } from "react";
import { Button } from "antd";
import { NameContext } from "../../App";

import * as S from "./styles";

function Header({ isShowSidebar, setIsShowSidebar }) {
  const { name } = useContext(NameContext);

  function handleToggleSidebar() {
    setIsShowSidebar(!isShowSidebar);
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <Button
          variant="outline-primary"
          onClick={() => handleToggleSidebar()}
        >
          Ẩn/Hiện Sidebar
        </Button>
        <div>Logo</div>
      </S.HeaderLogo>
      <div>{name}</div>
    </S.HeaderContainer>
  );
}

export default Header;
