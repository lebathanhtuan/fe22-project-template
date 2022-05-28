import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  productListLoading: false,
  productListError: "",
  productListMeta: {},
  productDetail: {},
  productDetailLoading: false,
  productDetailError: "",
  createLoading: false,
};

const productReducer = createReducer(initialState, {
  GET_PRODUCT_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: data,
    };
  },
  GET_PRODUCT_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productListError: error,
    };
  },
  CREATE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      createLoading: true,
    };
  },
  CREATE_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      createLoading: false,
    };
  },
  CREATE_PRODUCT_FAIL: (state, action) => {
    return {
      ...state,
      createLoading: false,
    };
  },
  UPDATE_PRODUCT_SUCCESS: (state, action) => {
    return state;
  },
  UPDATE_PRODUCT_FAIL: (state, action) => {
    return state;
  },
  DELETE_PRODUCT_SUCCESS: (state, action) => {
    return state;
  },
  DELETE_PRODUCT_FAIL: (state, action) => {
    return state;
  },
});

export default productReducer;
