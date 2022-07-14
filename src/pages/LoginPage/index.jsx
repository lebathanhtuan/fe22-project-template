import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { loginAction } from "../../redux/actions";

import * as S from "./styles";

const LoginPage = () => {
  const [loginForm] = Form.useForm();

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.user);

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          goToDashboard: () => navigate(ROUTES.ADMIN.DASHBOARD),
          goToHome: () => navigate(state?.prevPath || ROUTES.USER.HOME),
        },
      })
    );
  };

  return (
    <S.LoginContainer>
      <S.LoginForm>
        <Form
          form={loginForm}
          name="loginForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleLogin(values)}
          autoComplete="off"
          style={{ padding: "0 2px" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginData.loading}
          >
            Đăng nhập
          </Button>
        </Form>
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginPage;
