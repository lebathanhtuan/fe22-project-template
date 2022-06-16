import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CATEGORY_ACTION } from "../contants";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    error: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
        error: null,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: data,
        meta: meta,
        loading: false,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        error: error,
      },
    };
  },
});

export default categoryReducer;
