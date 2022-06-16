import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function Header({ isShowSidebar, setIsShowSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  function handleToggleSidebar() {
    setIsShowSidebar(!isShowSidebar);
  }

  function handleLogout() {
    dispatch(logoutAction());
    if (userInfo.data.role === "admin") {
      navigate(ROUTES.LOGIN);
    }
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <Button variant="outline-primary" onClick={() => handleToggleSidebar()}>
          Ẩn/Hiện Sidebar
        </Button>
        <div>Logo</div>
      </S.HeaderLogo>
      {userInfo.data.id ? (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item icon={<UserOutlined />}>Thông tin cá nhân</Menu.Item>
              <Menu.Item
                icon={<LogoutOutlined />}
                onClick={() => handleLogout()}
              >
                Đăng xuất
              </Menu.Item>
            </Menu>
          }
        >
          <div>{userInfo.data.fullName}</div>
        </Dropdown>
      ) : (
        <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
