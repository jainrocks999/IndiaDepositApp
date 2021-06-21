import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

//Login
function* doLogin(action) {
  try{
  const data = new FormData();
  data.append('mobile',action.mobile)
  const response = yield call(Api.fetchDataByPOST, action.url, data);
  if (response.status==true) {
    yield put({
      type: 'User_Login_Success',
      payload: response.user,
    });
      Toast.show(response.msg);
  } else {
    Toast.show(response.msg);
    yield put({
      type: 'User_Login_Error',
    });
  }
}
catch(error){
 Toast.show(error.message)
}
}

//Register
function* doRegister(action) {
  try{
  const data = new FormData();
  data.append('device_type',action.device_type)
  const response = yield call(Api.fetchDataByPOST, action.url, data);
  if (response.status==true) {
    Toast.show(response.msg);
    yield put({
      type: 'User_Register_Success',
      payload: response.data,
    });
    action.navigation.navigate('Login');
  } else {
   Toast.show(response.msg);
    yield put({
      type: 'User_Register_Error',
    });
  }
}
catch(error){
 Toast.show(error.message)
 console.log(error.message)
}
}
////Logout
function* logout(action) {
  try{
  const data = new FormData();
  data.append('userid',action.userid)
  const response = yield call(Api.fetchDataByPOST, action.url, data);
  if (response.status==true) {
    yield put({
      type: 'User_Logout_Success',
      payload: response.user,
    });
      Toast.show(response.msg);
      AsyncStorage.clear();
      action.navigation.navigate('Login')
  } else {
    Toast.show(response.msg);
    yield put({
      type: 'User_Logout_Error',
    });
  }
}
catch(error){
 Toast.show(error.message)
}
}
export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
  yield takeEvery('User_Register_Request', doRegister);
  yield takeEvery('User_Logout_Request', logout);
}
