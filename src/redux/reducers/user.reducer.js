import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../contants";

const initialState = {
  userInfo: {
    data: {},
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
};

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.LOGIN)]: (state) => {
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
      },
      loginData: {
        ...state.loginData,
        loading: false,
      },
    };
  },
  [FAIL(USER_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        error: error,
      },
    };
  },
});

export default userReducer;
