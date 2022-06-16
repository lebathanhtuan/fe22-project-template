import { fork } from "redux-saga/effects";

import userSaga from "./user.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import locationSaga from "./location.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(locationSaga);
}
