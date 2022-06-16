import React from "react";
import { Button, Dropdown, Menu, Space, Badge } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logoutAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function Header({ isShowSidebar, setIsShowSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);

  function handleLogout() {
    dispatch(logoutAction());
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <div onClick={() => navigate(ROUTES.USER.HOME)}>Logo</div>
      </S.HeaderLogo>
      <Space size={24}>
        <Badge count={cartList.data.length}>
          <Button
            size="small"
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate(ROUTES.USER.CART)}
          ></Button>
        </Badge>
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
            <Space>
              <UserOutlined />
              <div>{userInfo.data.fullName}</div>
            </Space>
          </Dropdown>
        ) : (
          <Button
            onClick={() =>
              navigate(ROUTES.LOGIN, {
                state: {
                  prevPath: pathname,
                },
              })
            }
          >
            Đăng nhập
          </Button>
        )}
      </Space>
    </S.HeaderContainer>
  );
}

export default Header;
