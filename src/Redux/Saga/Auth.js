import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Storage from '../../component/AsyncStorage';

//Login
function* doLogin(action) {
  try{
  const data = new FormData();
  data.append('email',action.email)
  data.append('password',action.password)
  const response = yield call(Api.fetchDataByPOST, action.url, data);
  if (response.status==200) {
    yield put({
      type: 'User_Login_Success',
      payload: response.data,
    });
     AsyncStorage.setItem(Storage.status,JSON.stringify(response.status))
      Toast.show(response.messages);
      action.navigation.replace('Main')
  } else {
    Toast.show(response.messages);
    yield put({
      type: 'User_Login_Error',
    });
  }
}
catch(error){
 Toast.show(error.messages)
}
}

//mLogin

function* mLogin(action) {
  try{
  const data = new FormData();
  data.append('mobile',action.mobile)
  const response = yield call(Api.fetchDataByPOST, action.url, data);
  console.log('this is your response of data',response);
  if (response.status==200) {
    yield put({
      type: 'User_MLogin_Success',
      payload: response.data,
    });
     AsyncStorage.setItem(Storage.status,JSON.stringify(response.status))
      Toast.show(response.messages);
      action.navigation.replace('Otp',{otp:response.data.otp})
  } else {
    Toast.show(response.messages);
    yield put({
      type: 'User_MLogin_Error',
    });
  }
}
catch(error){
 Toast.show(error.messages)
}
}

//Register
function* doRegister(action) {
  try{
  const data = new FormData();
  data.append('name',action.name)
  data.append('email',action.email)
  data.append('mobile',action.mobile)
  data.append('password',action.password)
  data.append('mobile_country_code',action.mobile_country_code)
  data.append('father_spouse_name',action.father_spouse_name)
  data.append('mother_maiden_name',action.mother_maiden_name)
  data.append('gender',action.gender)
  data.append('dob',action.dob)
  data.append('pan',action.pan)
  data.append('address1',action.address1)
  data.append('address2',action.address2)
  data.append('city',action.city)
  data.append('state',action.state)
  data.append('country',action.country)
  data.append('pincode',action.pincode)
  data.append('residential_status',action.residential_status)
  data.append('profile_pic',action.profile_pic)
  data.append('education',action.education)
  data.append('occupation',action.occupation)
  data.append('marital_status',action.marital_status)

  const response = yield call(Api.fetchDataByPOST, action.url, data);
  console.log('this is  your response',response);
  if (response.status==200) {
    Toast.show(response.messages);
    yield put({
      type: 'User_Register_Success',
      payload: response.data,
    });
    action.navigation.navigate('Login');
  } else {
   Toast.show(response.messages);
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
  yield takeEvery('User_MLogin_Request', mLogin);
  yield takeEvery('User_Register_Request', doRegister);
  yield takeEvery('User_Logout_Request', logout);
}
