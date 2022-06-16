import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../contants";

function* getProductListSaga(action) {
  try {
    const { page, limit, keyword, categoryIds, price, sortOrder, more } =
      action.payload;
    const [minPrice, maxPrice] = price;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _embed: "comments",
        _page: page,
        _limit: limit,
        categoryId: categoryIds,
        price_gte: minPrice,
        price_lte: maxPrice,
        ...(sortOrder && {
          _sort: "price",
          _order: sortOrder,
        }),
        q: keyword,
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
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

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: ["comments", "options"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post(`http://localhost:4000/products`, data);
    yield put({ type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT) });
    yield callback.goToList();
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
    const { id, data, callback } = action.payload;
    yield axios.patch(`http://localhost:4000/products/${id}`, data);
    yield put({ type: SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT) });
    yield callback.goToList();
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
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        page: 1,
        limit: 10,
      },
    });
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
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
