import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/reducers/product.reducer";
import userReducer from "./redux/reducers/user.reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
