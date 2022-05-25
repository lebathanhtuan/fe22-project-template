import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

const userReducer = createReducer(initialState, {});

export default userReducer;
