import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import "./App.css";
import "antd/dist/antd.css";

import AdminLayout from "./layouts/AdminLayout";
import LoginLayout from "./layouts/LoginLayout";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { ROUTES } from "./constants/routes";

import { getUserInfoAction } from "./redux/actions";

export const NameContext = createContext();

function App() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedUserData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  return (
    <NameContext.Provider
      value={{
        name: name,
        setName: setName,
      }}
    >
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<HomePage />} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.ADMIN.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </NameContext.Provider>
  );
}

export default App;
