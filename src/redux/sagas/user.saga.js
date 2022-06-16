import { put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../contants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    notification.success({
      message: "Đăng nhập thành công",
    });
    if (result.data?.user?.role === "admin") {
      yield callback.goToDashboard();
    } else {
      yield callback.goToHome();
    }
  } catch (e) {
    if (["Incorrect password", "Cannot find user"].includes(e.response.data)) {
      yield put({
        type: FAIL(USER_ACTION.LOGIN),
        payload: {
          error: "Email hoặc mật khẩu không đúng!",
        },
      });
    } else {
      yield put({
        type: FAIL(USER_ACTION.LOGIN),
        payload: {
          error: "Lỗi không xác định",
        },
      });
    }
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
    yield callback.goToLogin();
  } catch (e) {
    console.log(e.response);
    if (e.response.data === "Email already exists") {
      yield put({
        type: FAIL(USER_ACTION.REGISTER),
        payload: {
          error: "Email đã tồn tại!",
        },
      });
    } else {
      yield put({
        type: FAIL(USER_ACTION.REGISTER),
        payload: {
          error: "Lỗi không xác định",
        },
      });
    }
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        error: "Lỗi không xác định",
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
}
