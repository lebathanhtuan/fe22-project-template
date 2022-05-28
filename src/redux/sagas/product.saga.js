import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _embed: "comments",
      },
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.post(`http://localhost:4000/products`, data);
    yield put({ type: "CREATE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "CREATE_PRODUCT_FAIL",
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

function* updateProductSaga(action) {
  try {
    const { id, data } = action.payload;
    yield axios.patch(`http://localhost:4000/products/${id}`, data);
    yield put({ type: "UPDATE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "UPDATE_PRODUCT_FAIL",
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/products/${id}`);
    yield put({ type: "DELETE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_FAIL",
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
  yield takeEvery("CREATE_PRODUCT_REQUEST", createProductSaga);
  yield takeEvery("UPDATE_PRODUCT_REQUEST", updateProductSaga);
  yield takeEvery("DELETE_PRODUCT_REQUEST", deleteProductSaga);
}
