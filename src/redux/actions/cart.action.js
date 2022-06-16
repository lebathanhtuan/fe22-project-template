import { createAction } from "@reduxjs/toolkit";
import { REQUEST, CART_ACTION } from "../contants";

export const getCartListAction = createAction(
  REQUEST(CART_ACTION.GET_CART_LIST)
);
export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const removeFromCartAction = createAction(
  REQUEST(CART_ACTION.REMOVE_FROM_CART)
);
export const updateCartAction = createAction(REQUEST(CART_ACTION.UPDATE_CART));
