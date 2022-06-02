import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../contants";

function* getProductListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _embed: "comments",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
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
    yield put({ type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT) });
    yield put({ type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST) });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
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
    yield put({ type: SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT) });
    yield put({ type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST) });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.UPDATE_PRODUCT),
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
    yield put({ type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT) });
    yield put({ type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST) });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
