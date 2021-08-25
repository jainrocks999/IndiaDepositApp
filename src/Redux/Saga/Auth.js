import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Storage from '../../component/AsyncStorage';

//Login
            function* doLogin(action) {
              console.log('this is your mobile dtra',action);
              try{
              const data = new FormData();
              if(action.email){
              data.append('email',action.email)
              }
              else if(action.mobile){
                data.append('mobile',action.mobile)
              }
              data.append('pin',action.pin)
              const response = yield call(Api.fetchDataByPOST, action.url, data);
              console.log('this is your res message',response);
              if (response.status==200) {
                yield put({
                  type: 'User_Login_Success',
                  payload: response.data,
                });
                AsyncStorage.setItem(Storage.status,JSON.stringify(response.status))
                AsyncStorage.setItem(Storage.name,response.data.name)
                AsyncStorage.setItem(Storage.user_id,response.data.user_id)
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
            yield put({
              type: 'User_Login_Error',
            });
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

                  if(action && action.navigation){
                  action.navigation.replace('Otp',
                  {
                    otp:response.data.otp,
                    mobile:action.mobile}
                    )
                  }
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

            function* forgotpasword(action) {
              console.log('this is action',action);
              try{
              const data = new FormData();
              if (action.mobile) {
                data.append('mobile',action.mobile)
              } else if(action.email) {
                data.append('email',action.email)
              }
              const response = yield call(Api.fetchDataByPOST, action.url, data);
              console.log('this is your response of data',response);
              if (response.status==200) {
                yield put({
                  type: 'Forget_Password_Success',
                  payload: response.data,
                });
                  Toast.show(response.messages);
              } else {
                Toast.show(response.messages);
                yield put({
                  type: 'Forget_Password_Error',
                });
              }
            }
            catch(error){
            Toast.show(error.messages)
            yield put({
              type: 'Forget_Password_Error',
            });
            }
            }

            //Register
            function* doRegister(action) {
              console.log('this is action values',action);
              try{
              const data = new FormData();
              data.append('name',action.name)
              data.append('email',action.email)
              data.append('mobile',action.mobile)
              data.append('pin',action.pin)
              data.append('refferal_code',action.refferal_code)
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
                action.navigation.replace('Login');
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
            yield put({
              type: 'User_Register_Error',
            });
            }
}
function* logout(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
        const response = yield call(Api.fetchDataByPOST, action.url, data);
            console.log('thiss dflkdsjfaslkdfsald',response);
            if (response.status==200) {
              yield put({
                type: 'User_Logout_Success',
                payload: response.user,
              });
                Toast.show(response.messages);
                action.navigation.replace('Login')
                AsyncStorage.clear();
                
            } else {
              Toast.show(response.messages);
              yield put({
                type: 'User_Logout_Error',
              });
            }
          }
  catch(error){
    Toast.show(error.message)
      yield put({
            type: 'User_Logout_Error',
          });
    }
}
function* aboutus(action) {
    try{
      const data = new FormData();
        data.append('key',action.key)
          const response =yield call(Api.fetchDataByPOST, action.url, data);
              if (response.status==200) {
                yield put({
                  type: 'About_Us_Success',
                  payload: response.data,
                });       
              } else {
                yield put({
                  type: 'About_Us_Error',
                });
              }
            }
    catch(error){
        yield put({
              type: 'About_Us_Error',
            });
      }
}
function* faq(action) {
  try{
    const data = new FormData();
      data.append('key',action.key)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Faq_Success',
                payload: response.data[0].value,
              });       
            } else {
              yield put({
                type: 'Faq_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Faq_Error',
          });
    }
}
function* privacy(action) {
  try{
    const data = new FormData();
      data.append('key',action.key)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Privacy_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Privacy_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Privacy_Error',
          });
    }
}
function* security(action) {
  try{
    const data = new FormData();
      data.append('key',action.key)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Security_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Security_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Security_Error',
          });
    }
}
function* TermAndCondition(action) {
  try{
    const data = new FormData();
      data.append('key',action.key)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'TermAndCondition_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'TermAndCondition_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'TermAndCondition_Error',
          });
    }
}
function* trending(action) {
  try{
    const data = new FormData();
      data.append('key',action.key)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Trending_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Trending_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Trending_Error',
          });
    }
}

function* notification(action) {
  console.log('thisi si your action',action);
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Notification_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Notification_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Notification_Error',
          });
    }
}
// support values
function* support(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
      data.append('name',action.name)
      data.append('email',action.email)
      data.append('mobile',action.mobile)
      data.append('subject',action.subject)
      data.append('message',action.message)
      
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Support_Success',
              });       
              Toast.show(response.messages);
            } else {
              yield put({
                type: 'Support_Error',
              });
              Toast.show(response.messages);
            }
          }
  catch(error){
      yield put({
            type: 'Support_Error',
          });
    }
}

function* contact(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
      data.append('name',action.name)
      data.append('email',action.email)
      data.append('mobile',action.mobile)
      data.append('message',action.message)
      
        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Contact_Us_Success',
              });       
              Toast.show(response.messages);
            } else {
              yield put({
                type: 'Contact_Us_Error',
              });
              Toast.show(response.messages);
            }
          }
  catch(error){
      yield put({
            type: 'Contact_Us_Error',
          });
    }
}
export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
  yield takeEvery('User_MLogin_Request', mLogin);
  yield takeEvery('User_Register_Request', doRegister);
  yield takeEvery('Forget_Password_Request', forgotpasword);
  yield takeEvery('User_Logout_Request', logout);
  yield takeEvery('About_Us_Request',aboutus)
  yield takeEvery('Faq_Request',faq)
  yield takeEvery('Privacy_Request',privacy)
  yield takeEvery('Security_Request',security)
  yield takeEvery('Trending_Request',trending)
  yield takeEvery('TermAndCondition_Request',TermAndCondition)
  yield takeEvery('Notification_Request',notification)
  yield takeEvery('Support_Request',support)
  yield takeEvery('Contact_Us_Request',contact)
}
