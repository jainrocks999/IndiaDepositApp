import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Storage from '../../component/AsyncStorage';
import Root from '../../navigator/rootNavigation';
import { useDispatch } from 'react-redux';

//Login
            function* doLogin(action) {
              try{
              const data = new FormData();
              if(action.email){
              data.append('email',action.email)
              }
              else if(action.mobile){
                data.append('mobile',action.mobile)
              }
              data.append('pin',action.pin)
              data.append('device_token',action.device_token)
              data.append('device_type',action.device_type)
              const response = yield call(Api.fetchDataByPOST, action.url, data);
              console.log('this is run time response',response);
              if (response.status==200) {
                yield put({
                  type: 'User_Login_Success',
                  payload: response.data,
                });
                AsyncStorage.setItem(Storage.name,response.data.name)
                AsyncStorage.setItem(Storage.user_id,response.data.user_id)
                AsyncStorage.setItem(Storage.email,response.data.email)
                AsyncStorage.setItem(Storage.fatherName,response.data.father_spouse_name)
                AsyncStorage.setItem(Storage.motherName,response.data.mother_maiden_name)
                AsyncStorage.setItem(Storage.dob,response.data.dob)
                AsyncStorage.setItem(Storage.gender,response.data.gender),
                AsyncStorage.setItem(Storage.mobile,response.data.mobile),
                

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
              data.append('device_token',action.device_token)
              data.append('device_type',action.device_type)
              const response = yield call(Api.fetchDataByPOST, action.url, data);
             
              if (response.status==200) {
                yield put({
                  type: 'User_MLogin_Success',
                  payload: response.data,
                });
              
                  Toast.show(response.messages);
                    action.navigation.replace('Otp',{
                        otp:response.data.otp,
                        mobile:action.mobile,
                        name:response.data.data.name,
                        email:response.data.data.email,
                        father_spouse_name:response.data.data.father_spouse_name,
                        mother_maiden_name:response.data.data.mother_maiden_name,
                        dob:response.data.data.dob,
                        gender:response.data.data.gender,
                        user_id:response.data.data.user_id
                        }
                      ) 
                } else {
                Toast.show(response.messages);
                yield put({
                  type: 'User_MLogin_Error',
                });
              }
            }
            catch(error){
            yield put({
              type: 'User_MLogin_Error',
            });
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
              if (response.status==200) {
                yield put({
                  type: 'Forget_Password_Success',
                  payload: response.data,
                });
                Toast.show(response.messages);
                if(action && action.navigation){
                  action.navigation.replace('ForgotOtp',
                  {
                    otp:'0852',
                    mobile: response.mobile,
                    email: response.email
                  }
                    )
                  }
              } 
             else {
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
              data.append('device_token',action.device_token)
              data.append('device_type',action.device_type)
             
              const response = yield call(Api.fetchDataByPOST, action.url, data);
              console.log('this is  your response',response);
              if (response.status==200) {
                Toast.show(response.messages);
                yield put({
                  type: 'User_Register_Success',
                  payload: response.data,
                });
                if(action && action.navigation){
                  action.navigation.replace('Otp',
                  {
                    otp:response.otp,
                    mobile:action.mobile,
                    user_id:response.data[0].user_id,
                    name:response.data[0].name,
                    email:response.data[0].email,
                    father_spouse_name:response.data[0].father_spouse_name,
                    mother_maiden_name:response.data[0].mother_maiden_name,
                    dob:response.data[0].dob,
                    gender:response.data[0].gender,
                  }
                    )
                  }
              } else {
                if(response.messages.email){
                  Toast.show(response.messages.email);
                }
                else{
                Toast.show(response.messages);
                }
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

                AsyncStorage.setItem(Storage.name,'')
                AsyncStorage.setItem(Storage.user_id,'')
                AsyncStorage.setItem(Storage.email,'')
                AsyncStorage.setItem(Storage.fatherName,'')
                AsyncStorage.setItem(Storage.motherName,'')
                AsyncStorage.setItem(Storage.dob,'')
                AsyncStorage.setItem(Storage.gender,'')
                AsyncStorage.setItem(Storage.mobile,'')
                
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
              setTimeout(()=>
              action.navigation.navigate('Main')
              ,2000)
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


function* changepassword(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
      data.append('password',action.password)
      data.append('newpassword',action.newpassword)

        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Change_Password_Success',
              });       
              Toast.show(response.messages);
            } else {
              yield put({
                type: 'Change_Password_Error',
              });
              Toast.show(response.messages);
            }
          }
  catch(error){
      yield put({
            type: 'Change_Password_Request',
          });
    }
}

function* feedback(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
      data.append('rating',action.rating)
      data.append('ans_key1',action.ans_key1)
      data.append('ans_key2',action.ans_key2)
      data.append('message',action.message)

        const response =yield call(Api.fetchDataByPOST, action.url, data);
            if (response.status==200) {
              yield put({
                type: 'Feedback_Success',
              });       
              Toast.show(response.messages);
              setTimeout(()=>
                 action.navigation.navigate('Main')
              ,2000)
            } else {
              yield put({
                type: 'Feedback_Error',
              });
              Toast.show(response.messages);
            }
          }
  catch(error){
      yield put({
            type: 'Feedback_Request',
          });
    }
}
function* createPin(action) {
  console.log('this is action', action);
  try {
    const data = new FormData();
    if (action.mobile) {
      data.append('mobile', action.mobile)
    } else if (action.email) {
      data.append('email', action.email)
    }
    data.append('pin', action.pin)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('thisis espo',response);
    if (response.status == 200) {
      yield put({
        type: 'Create_Pin_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      if (action && action.navigation) {
        action.navigation.replace('Login')
      }
    }
    else {
      Toast.show(response.messages);
      yield put({
        type: 'Create_Pin_Error',
      });
    }
  }
  catch (error) {
    Toast.show(error.messages)
    yield put({
      type: 'Create_Pin_Error',
    });
  }
}

function* editProfile(action) {
  try{
    const data = new FormData();
      data.append('user_id',action.user_id)
      data.append('name',action.name)
      data.append('email',action.email)
      data.append('dob',action.dob)
      data.append('gender',action.gender)
      data.append('father_spouse_name',action.father_spouse_name)
      data.append('mother_maiden_name',action.mother_maiden_name)
     
        const response =yield call(Api.fetchDataByPOST, action.url, data);
        console.log(response,'resfggdfghgf')
            if (response.status==200) {
              yield put({
                type: 'Edit_Profile_Success',
              });  
                
               AsyncStorage.setItem(Storage.name,response.data[0].name)
                AsyncStorage.setItem(Storage.email,response.data[0].email)
                AsyncStorage.setItem(Storage.fatherName,response.data[0].father_spouse_name)
                AsyncStorage.setItem(Storage.motherName,response.data[0].mother_maiden_name)
                AsyncStorage.setItem(Storage.dob,response.data[0].dob)
                AsyncStorage.setItem(Storage.gender,response.data[0].gender)
                AsyncStorage.setItem(Storage.mobile,response.data[0].mobile)
                Toast.show(response.messages);  
                action.navigation.replace('Profile')
            } else {
              yield put({
                type: 'Edit_Profile_Error',
              });
              Toast.show(response.messages);
            }
          }
  catch(error){
      yield put({
            type: 'Edit_Profile_Error',
          });
    }
}

function* getFaq(action) {
  try{
        const response =yield call(Api.fetchDataByPOST, action.url);
            if (response.status==200) {
              yield put({
                type: 'Get_Faq_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Get_Faq_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Get_Faq_Error',
          });
    }
}
function* getBlog(action) {
  try{
    const data = new FormData();
    data.append('post_category_id',action.post_category_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Get_Blog_Success',
                payload: response.data.blogpost,
              });       
            } else {
              yield put({
                type: 'Get_Blog_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Get_Blog_Error',
          });
    }
}

function* getStory(action) {
  try{
    const data = new FormData();
    data.append('post_category_id',action.post_category_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Get_Story_Success',
                payload: response.data.blogpost,
              });       
            } else {
              yield put({
                type: 'Get_Story_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Get_Story_Error',
          });
    }
}

function* bankList(action) {
  try{
    const data = new FormData();
    data.append('user_id',action.user_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Bank_List_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Bank_List_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Bank_List_Error',
          });
    }
}

function* nomineeList(action) {
  try{
    const data = new FormData();
    data.append('user_id',action.user_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Nominee_List_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Nominee_List_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Nominee_List_Error',
          });
    }
}

function* addBank(action) {
  try{
    const data = new FormData();
    data.append('user_id',action.user_id)
    data.append('bank_id',action.bank_id)
    data.append('name',action.name)
    data.append('account_number',action.account_number)
    data.append('account_type',action.account_type)
    data.append('ifsc_code',action.ifsc_code)
    data.append('other1',action.other1)
    data.append('other2',action.other2)

        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Add_Bank_Success',
                payload: response.data,
              });    
              Toast.show(response.messages)   
             action.navigation.navigate('Profile')   
            } else {
              Toast.show(response.messages)   
              yield put({
                type: 'Add_Bank_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Add_Bank_Error',
          });
    }
}
function* updateBank(action) {
 
  try{
    const data = new FormData();
    data.append('user_bank_id',action.user_bank_id)
    data.append('user_id',action.user_id)
    data.append('bank_id',action.bank_id)
    data.append('name',action.name)
    data.append('account_number',action.account_number)
    data.append('account_type',action.account_type)
    data.append('ifsc_code',action.ifsc_code)
    data.append('other1',action.other1)
    data.append('other2',action.other2)

        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Update_Bank_Success',
                payload: response.data,
              });    
              Toast.show(response.messages)  
              action.navigation.navigate('Profile')    
            } else {
              Toast.show(response.messages)  
              yield put({
                type: 'Update_Bank_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Update_Bank_Error',
          });
    }
}

function* deleteBank(action) {
 
  try{
    const data = new FormData();
    data.append('user_bank_id',action.user_bank_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Delete_Bank_Success',
                payload: response.data,
              });    

              Toast.show(response.messages)  
            } else {
              Toast.show(response.messages)    
              yield put({
                type: 'Delete_Bank_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Delete_Bank_Error',
          });
    }
}


function* getBankName(action) {
  try{
        const response =yield call(Api.fetchDataByPOST, action.url);
            if (response.status==200) {
              yield put({
                type: 'Bank_Name_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Bank_Name_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Bank_Name_Error',
          });
    }
}

function* addNominee(action) {
  try{
    const data = new FormData();
          data.append('user_id',action.user_id)
          data.append('name',action.name)
          data.append('address1',action.address1)
          data.append('address2',action.address2)
          data.append('country',action.country)
          data.append('state',action.state)
          data.append('city',action.city)
          data.append('dob',action.dob)
          data.append('guardian',action.guardian)
          data.append('relationship',action.relationship)
          data.append('guardian_relationship',action.guardian_relationship)
          data.append('pincode',action.pincode)

        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Add_Nominee_Success',
                payload: response,
              });    
              Toast.show(response.messages)  
              action.navigation.navigate('Profile')   
            } else {
              console.log('thsi is working');
              Toast.show(response.messages)    
              yield put({
                type: 'Add_Nominee_Error',
              });
            }
          }
  catch(error){
    console.log('hi tisi  s narendra');
      yield put({
            type: 'Add_Nominee_Error',
          });
    }
}

function* editNominee(action) {
  try{
    const data = new FormData();

          data.append('user_id',action.user_id)
          data.append('user_nominee_id',action.user_nominee_id)
          data.append('name',action.name)
          data.append('address1',action.address1)
          data.append('address2',action.address2)
          data.append('country',action.country)
          data.append('state',action.state)
          data.append('city',action.city)
          data.append('dob',action.dob)
          data.append('guardian',action.guardian)
          data.append('relationship',action.relationship)
          data.append('guardian_relationship',action.guardian_relationship)
          data.append('pincode',action.pincode)

        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'Edit_Nominee_Success',
                payload: response,
              });    
              Toast.show(response.messages)  
              action.navigation.navigate('Profile')     
            } else {
              console.log('thsi is working');
              Toast.show('Nominee add Error')   
              yield put({
                type: 'Edit_Nominee_Error',
              });
            }
          }
  catch(error){
    console.log('hi tisi  s narendra');
      yield put({
            type: 'Edit_Nominee_Error',
          });
    }
}

function* countryList(action) {
  try{
        const response =yield call(Api.fetchDataByPOST, action.url);
            if (response.status==200) {
              yield put({
                type: 'Country_List_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'Country_List_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'Country_List_Error',
          });
    }
}

function* stateList(action) {
  try{
        const response =yield call(Api.fetchDataByPOST, action.url);
            if (response.status==200) {
              yield put({
                type: 'State_List_Success',
                payload: response.data,
              });       
            } else {
              yield put({
                type: 'State_List_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'State_List_Error',
          });
    }
}

function* Search(action) {
  console.log('this is working',action);
  try{
    const data = new FormData();
      data.append('year',action.year)
      data.append('month',action.month)
      data.append('days',action.days)
      data.append('amount',action.amount)
      data.append('location',action.location)
      data.append('type1',action.type1)
      data.append('type2',action.type2)
      data.append('type3',action.type3)
      data.append('type4',action.type4)
      data.append('type5',action.type5)

            const response =yield call(Api.fetchDataByPOST, action.url, data);
            console.log('this is response value',response);
            if (response.status==200) {
              yield put({
                type: 'FD_Search_Success',
                payload: response.data,
              });  
               action.navigation.navigate('FDList',{
                 amount:action.amount,
                 days:action.days,
                 year:action.year,
                 month:action.month
               })     
            } else {
              Toast.show('hiu')
              yield put({
                type: 'FD_Search_Error',
              });
            }
          }
  catch(error){
   Toast.show('hi')
      yield put({
            type: 'FD_Search_Error',
          });
    }
}
function* FDDetail(action) {
  try{
    const data=new FormData()
    data.append('fixed_deposit_id',action.fixed_deposit_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'FD_Detail_Success',
                payload: response.data,
              });  
              action.navigation.navigate('FDDetail')
            } else {
              yield put({
                type: 'FD_Detail_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'FD_Detail_Error',
          });
    }
}

function* SBDetail(action) {
  try{
    const data=new FormData()
    data.append('saving_account_id',action.saving_account_id)
        const response =yield call(Api.fetchDataByPOST, action.url,data);
            if (response.status==200) {
              yield put({
                type: 'SB_Detail_Success',
                payload: response.data,
              });  
              action.navigation.navigate('AccountDetail')
            } else {
              yield put({
                type: 'SB_Detail_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'SB_Detail_Error',
          });
    }
}

function* SBSearch(action) {
  console.log('this is working',action);
  try{
    const data = new FormData();
      data.append('min_bal',action.min_bal)
      data.append('location',action.location)
      data.append('type1',action.type1)
      data.append('type2',action.type2)
      data.append('type3',action.type3)
      data.append('type4',action.type4)
      data.append('type5',action.type5)

            const response =yield call(Api.fetchDataByPOST, action.url, data);
            console.log('this is response value',response);
            if (response.status==200) {
              yield put({
                type: 'SB_Search_Success',
                payload: response.data,

              });  
               action.navigation.navigate('AccountList',{
                 balance:action.min_bal,
                 location:action.location,
                 type1:action.type1
               })     
            } else {
              Toast.show('hiu')
              yield put({
                type: 'SB_Search_Error',
              });
            }
          }
  catch(error){
   Toast.show('hi')
      yield put({
            type: 'SB_Search_Error',
          });
    }
}


function* FDCompare(action) {
  console.log('this is working',action);
  try{
    const data = new FormData();
      data.append('value_id1',action.value_id1)
      data.append('value_id2',action.value_id2)
      // data.append('user_id',action.user_id)

            const response =yield call(Api.fetchDataByPOST, action.url, data);
            console.log('this is response value',response);
            if (response.status==200) {
              yield put({
                type: 'FD_Compare_Success',
                payload: response,

              });  
               action.navigation.navigate('CompareFD')
            } else {
              yield put({
                type: 'FD_Compare_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'FD_Compare_Error',
          });
    }
}

function* SBCompare(action) {
 
  try{
    const data = new FormData();
      data.append('value_id1',action.value_id1)
      data.append('value_id2',action.value_id2)
      // data.append('user_id',action.user_id)

            const response =yield call(Api.fetchDataByPOST, action.url, data);
            console.log('this is response value',response);
            if (response.status==200) {
              yield put({
                type: 'SB_Compare_Success',
                payload: response,

              });  
               action.navigation.navigate('CompareSBAccount')
            } else {
              yield put({
                type: 'SB_Compare_Error',
              });
            }
          }
  catch(error){
      yield put({
            type: 'SB_Compare_Error',
          });
    }
}
export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
  yield takeEvery('User_MLogin_Request', mLogin);
  yield takeEvery('User_Register_Request', doRegister);
  yield takeEvery('Forget_Password_Request', forgotpasword);
  yield takeEvery('Change_Password_Request', changepassword);
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
  yield takeEvery('Feedback_Request',feedback)
  yield takeEvery('Create_Pin_Request',createPin)
  yield takeEvery('Edit_Profile_Request',editProfile)
  yield takeEvery('Get_Faq_Request',getFaq)
  yield takeEvery('Get_Blog_Request',getBlog)
  yield takeEvery('Bank_List_Request',bankList)
  yield takeEvery('Add_Bank_Request',addBank)
  yield takeEvery('Bank_Name_Request',getBankName)
  yield takeEvery('Update_Bank_Request',updateBank)
  yield takeEvery('Delete_Bank_Request',deleteBank)
  yield takeEvery('Nominee_List_Request',nomineeList)
  yield takeEvery('Add_Nominee_Request',addNominee)
  yield takeEvery('Edit_Nominee_Request',editNominee)
  yield takeEvery('Country_List_Request',countryList)
  yield takeEvery('State_List_Request',stateList)
  yield takeEvery('FD_Detail_Request',FDDetail)
  yield takeEvery('SB_Detail_Request',SBDetail)
  yield takeEvery('Get_Story_Request',getStory)
  yield takeEvery('FD_Search_Request',Search)
  yield takeEvery('SB_Search_Request',SBSearch)
  yield takeEvery('FD_Compare_Request',FDCompare)
  yield takeEvery('SB_Compare_Request',SBCompare)

}
