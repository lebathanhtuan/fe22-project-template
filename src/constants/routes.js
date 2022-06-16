export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CART: "/cart",
    SHIPMENT_INFO: "/shipment-info",
    MY_PROFILE: "/my-profile",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    PRODUCT_LIST: "/admin/products",
    CREATE_PRODUCT: "/admin/product/create",
    UPDATE_PRODUCT: "/admin/product/:id/update",
    PRODUCT_DETAIL: "/admin/product/:id",
    USER_LIST: "/admin/users",
    ORDER_LIST: "/admin/orders",
  },
  NOT_FOUND: "/404",
};
