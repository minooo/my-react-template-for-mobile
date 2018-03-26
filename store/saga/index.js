// import { delay } from "redux-saga";
import { all, put, takeLatest } from "redux-saga/effects";
import { actionTypes, getUsers } from "@actions"
import { http } from "@utils"

function* loadUsers() {
  try {
    const res = yield http.get("users")
    yield put(getUsers(res))
  } catch (err) {
    console.info(err)
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.USERS, loadUsers)
  ])
}

export default rootSaga
