import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";

import "./App.less";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import LoginLayout from "./layouts/LoginLayout";

import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminProductListPage from "./pages/admin/ProductListPage";
import AdminCreateProductPage from "./pages/admin/CreateProductPage";
import AdminUpdateProductPage from "./pages/admin/UpdateProductPage";
import AdminProductDetailPage from "./pages/admin/ProductDetailPage";

import HomePage from "./pages/user/HomePage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import CartPage from "./pages/user/CartPage";
import ShipmentInfoPage from "./pages/user/ShipmentInfoPage";

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
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={<AdminDashboardPage />}
          />
          <Route
            path={ROUTES.ADMIN.PRODUCT_LIST}
            element={<AdminProductListPage />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<AdminCreateProductPage />}
          />
          <Route
            path={ROUTES.ADMIN.UPDATE_PRODUCT}
            element={<AdminUpdateProductPage />}
          />
          <Route
            path={ROUTES.ADMIN.PRODUCT_DETAIL}
            element={<AdminProductDetailPage />}
          />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route
            path={ROUTES.USER.SHIPMENT_INFO}
            element={<ShipmentInfoPage />}
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
