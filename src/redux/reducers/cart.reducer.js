import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../contants";

const initialState = {
  cartList: {
    data: JSON.parse(localStorage.getItem("cartList")) || [],
    loading: false,
    error: null,
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.GET_CART_LIST)]: (state) => {
    return {
      ...state,
    };
  },

  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { data } = action.payload;
    localStorage.setItem(
      "cartList",
      JSON.stringify([...state.cartList.data, data])
    );
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: [...state.cartList.data, data],
      },
    };
  },

  [REQUEST(CART_ACTION.UPDATE_CART)]: (state, action) => {
    const { productId, optionId, quantity } = action.payload;
    const newCartList = [...state.cartList.data];
    const productIndex = state.cartList.data.findIndex((item) => {
      if (optionId) {
        return item.productId === productId && item.optionId === optionId;
      }
      return item.productId === productId;
    });
    newCartList.splice(productIndex, 1, {
      ...state.cartList.data[productIndex],
      quantity: quantity,
    });
    // const newCartList = state.cartList.data.map((item) => {
    //   if (item.productId === productId) {
    //     return {
    //       ...item,
    //       quantity: item.quantity + quantity,
    //     };
    //   }
    //   return item;
    // });
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },

  [REQUEST(CART_ACTION.REMOVE_FROM_CART)]: (state, action) => {
    const { id } = action.payload;
    // const newCartList = [...state.cartList.data];
    // const productIndex = state.cartList.data.findIndex((item) => {
    //   return item.id === id;
    // });
    // newCartList.splice(productIndex, 1);
    const newCartList = state.cartList.data.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },
});

export default cartReducer;
