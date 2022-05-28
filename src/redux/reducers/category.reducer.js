import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  categoryListError: "",
};

const categoryReducer = createReducer(initialState, {
  GET_CATEGORY_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: data,
    };
  },
  GET_CATEGORY_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryListError: error,
    };
  },
});

export default categoryReducer;
