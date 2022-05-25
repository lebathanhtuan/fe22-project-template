import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  productList: [],
  productDetail: {},
};

const productReducer = createReducer(initialState, {
  CREATE_PRODUCT: (state, action) => {
    const { data } = action.payload;
    const newProduct = {
      id: uuidv4(),
      ...data,
    };
    return {
      ...state,
      productList: [newProduct, ...state.productList],
    };
  },
  UPDATE_PRODUCT: (state, action) => {
    const { id, data } = action.payload;
    const newProductList = [...state.productList];
    const productIndex = state.productList.findIndex(
      (item) => item.id === id
    );
    newProductList.splice(productIndex, 1, {
      id: id,
      ...data,
    });
    return {
      ...state,
      productList: newProductList,
    };
  },
  DELETE_PRODUCT: (state, action) => {
    const { id } = action.payload;
    const newProductList = state.productList.filter(
      (item) => item.id !== id
    );
    return {
      ...state,
      productList: newProductList,
    };
  },
});

export default productReducer;
