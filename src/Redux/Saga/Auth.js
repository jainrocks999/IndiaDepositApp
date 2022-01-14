import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Storage from '../../component/AsyncStorage';

//Login
function* doLogin(action) {
  console.log('this is action', action.pin,action.mobile);
  try {
    const data = new FormData();
    if (action.email) {
      data.append('email', action.email);
    } else if (action.mobile) {
      data.append('mobile', action.mobile);
    }
    data.append('pin', action.pin);
    data.append('device_token', action.device_token);
    data.append('device_type', action.device_type);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is run time response', response);
    if (response.status == 200) {
      yield put({
        type: 'User_Login_Success',
        payload: response.data,
      });
      AsyncStorage.setItem(Storage.name, response.data.name);
      AsyncStorage.setItem(Storage.user_id, response.data.user_id);
      AsyncStorage.setItem(Storage.email, response.data.email);
      AsyncStorage.setItem(
        Storage.fatherName,
        response.data.father_spouse_name,
      );
      AsyncStorage.setItem(
        Storage.motherName,
        response.data.mother_maiden_name,
      );
      AsyncStorage.setItem(Storage.dob, response.data.dob);
      AsyncStorage.setItem(Storage.gender, response.data.gender),
        AsyncStorage.setItem(Storage.mobile, response.data.mobile),
        AsyncStorage.setItem(Storage.pan, response.data.pan),
        AsyncStorage.setItem(Storage.address1, response.data.address1),
        AsyncStorage.setItem(Storage.address2, response.data.address2),
        AsyncStorage.setItem(Storage.occupation, response.data.occupation),
        AsyncStorage.setItem(Storage.pincode, response.data.pincode),
        AsyncStorage.setItem(Storage.country, response.data.country),
        AsyncStorage.setItem(Storage.state, response.data.state),
        AsyncStorage.setItem(Storage.city, response.data.city),
        AsyncStorage.setItem(Storage.income_group, response.data.income_group),
        AsyncStorage.setItem(Storage.education, response.data.education),
        AsyncStorage.setItem(Storage.marital, response.data.marital_status),
        AsyncStorage.setItem(
          Storage.residential,
          response.data.residential_status,
        );
      if (action.keep == true) {
        AsyncStorage.setItem('KeepmeLogin', JSON.stringify(1));
      } else {
        AsyncStorage.setItem('KeepmeLogin', JSON.stringify(0));
      }
      Toast.show(response.messages);
      action.navigation.replace('Main');
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'User_Login_Error',
      });
    }
  } catch (error) {
    Toast.show(error.messages);
    yield put({
      type: 'User_Login_Error',
    });
  }
}

//mLogin

function* mLogin(action) {
  try {
    const data = new FormData();
    data.append('mobile', action.mobile);
    data.append('device_token', action.device_token);
    data.append('device_type', action.device_type);
    const response = yield call(Api.fetchDataByPOST, action.url, data);

    if (response.status == 200) {
      yield put({
        type: 'User_MLogin_Success',
        payload: response.data,
      });

      Toast.show(response.messages);
      AsyncStorage.setItem(Storage.Rname, response.data.data.name);
      AsyncStorage.setItem(Storage.Remail, response.data.data.email);
      AsyncStorage.setItem(Storage.Rmobile, action.mobile);
      AsyncStorage.setItem('user', response.data.data.user_id);
      action.navigation.replace('Otp', {
        otp: response.data.otp,
        mobile: action.mobile,
        type: 'LoginWithOtp',
        name: response.data.data.name,
        email: response.data.data.email,
        // father_spouse_name:response.data.data.father_spouse_name,
        // mother_maiden_name:response.data.data.mother_maiden_name,
        // dob:response.data.data.dob,
        // gender:response.data.data.gender,
        user_id: response.data.data.user_id,

        // pan:response.data.data.pan,
        // address1:response.data.data.address1,
        // address2:response.data.data.address2,
        // occupation:response.data.data.occupation,
        // pincode:response.data.data.pincode,
        // country:response.data.data.country,
        // state:response.data.data.state,
        // city:response.data.data.city,
        // income_group:response.data.data.income_group,
        // marital_status:response.data.data.marital_status,
        // residential_status:response.data.data.residential_status,
        // education:response.data.data.education,
      });
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'User_MLogin_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_MLogin_Error',
    });
  }
}

function* forgotpasword(action) {
  try {
    const data = new FormData();
    if (action.mobile) {
      data.append('mobile', action.mobile);
    } else if (action.email) {
      data.append('email', action.email);
    }
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Send_Otp_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      if (action && action.navigation) {
        action.navigation.replace('ForgotOtp', {
          otp: response.otp,
          mobile: response.mobile,
          email: response.email,
        });
      }
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Send_Otp_Error',
      });
    }
  } catch (error) {
    Toast.show(error.messages);
    yield put({
      type: 'Send_Otp_Error',
    });
  }
}

//Register
function* doRegister(action) {
  console.log('this is action values', action);
  try {
    const data = new FormData();
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('mobile', action.mobile);
    data.append('pin', action.pin);
    data.append('refferal_code', action.refferal_code);
    data.append('mobile_country_code', action.mobile_country_code);
    data.append('father_spouse_name', action.father_spouse_name);
    data.append('mother_maiden_name', action.mother_maiden_name);
    data.append('gender', action.gender);
    data.append('dob', action.dob);
    data.append('pan', action.pan);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('city', action.city);
    data.append('state', action.state);
    data.append('country', action.country);
    data.append('pincode', action.pincode);
    data.append('residential_status', action.residential_status);
    data.append('profile_pic', action.profile_pic);
    data.append('education', action.education);
    data.append('occupation', action.occupation);
    data.append('marital_status', action.marital_status);
    data.append('device_token', action.device_token);
    data.append('device_type', action.device_type);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is  your response', response);
    if (response.status == 200) {
      Toast.show(response.messages);
      yield put({
        type: 'User_Register_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      AsyncStorage.setItem(Storage.user_id, response.data[0].user_id);
      AsyncStorage.setItem(Storage.name, response.data[0].name);
      AsyncStorage.setItem(Storage.email, response.data[0].email);
      AsyncStorage.setItem(Storage.mobile, response.data[0].mobile);
      AsyncStorage.setItem('KeepmeLogin', JSON.stringify(0));
      AsyncStorage.setItem(Storage.Rname, '');
      AsyncStorage.setItem(Storage.Remail, '');
      AsyncStorage.setItem(Storage.Rmobile, '');
      AsyncStorage.setItem(Storage.RcountryCode, '');
      AsyncStorage.setItem(Storage.Rpin, '');
      AsyncStorage.setItem(Storage.Rreferal, '');

      action.navigation.replace('Main');

      // if(action && action.navigation){
      //   action.navigation.replace('Otp',
      //   {
      //     otp:response.otp,
      //     mobile:action.mobile,
      //     user_id:response.data[0].user_id,
      //     name:response.data[0].name,
      //     email:response.data[0].email,
      //     father_spouse_name:response.data[0].father_spouse_name,
      //     mother_maiden_name:response.data[0].mother_maiden_name,
      //     dob:response.data[0].dob,
      //     gender:response.data[0].gender,
      //         pan:response.data[0].pan,
      //         address1:response.data[0].address1,
      //         address2:response.data[0].address2,
      //         occupation:response.data[0].occupation,
      //         pincode:response.data[0].pincode,
      //         country:response.data[0].country,
      //         state:response.data[0].state,
      //         city:response.data[0].city,
      //         income_group:response.data[0].income_group,
      //         marital_status:response.data[0].marital_status,
      //         residential_status:response.data[0].residential_status,
      //         education:response.data[0].education,
      //   }
      //     )
      //   }
    } else {
      if (response.messages.email) {
        Toast.show(response.messages.email);
      } else {
        Toast.show(response.messages);
      }
      yield put({
        type: 'User_Register_Error',
      });
    }
  } catch (error) {
    Toast.show(error.message);
    console.log(error.message);
    yield put({
      type: 'User_Register_Error',
    });
  }
}
function* logout(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'User_Logout_Success',
        payload: response.user,
      });
      Toast.show(response.messages);
      action.navigation.replace('Login');
      AsyncStorage.setItem('KeepmeLogin', JSON.stringify(0));
      AsyncStorage.setItem(Storage.name, '');
      AsyncStorage.setItem(Storage.user_id, '');
      AsyncStorage.setItem(Storage.email, '');
      AsyncStorage.setItem(Storage.fatherName, '');
      AsyncStorage.setItem(Storage.motherName, '');
      AsyncStorage.setItem(Storage.dob, '');
      AsyncStorage.setItem(Storage.gender, '');
      AsyncStorage.setItem(Storage.mobile, '');
      AsyncStorage.setItem(Storage.pan, ''),
        AsyncStorage.setItem(Storage.address1, ''),
        AsyncStorage.setItem(Storage.address2, ''),
        AsyncStorage.setItem(Storage.occupation, ''),
        AsyncStorage.setItem(Storage.pincode, ''),
        AsyncStorage.setItem(Storage.country, ''),
        AsyncStorage.setItem(Storage.state, ''),
        AsyncStorage.setItem(Storage.city, ''),
        AsyncStorage.setItem(Storage.income_group, ''),
        AsyncStorage.setItem(Storage.education, ''),
        AsyncStorage.setItem(Storage.marital, ''),
        AsyncStorage.setItem(Storage.residential, '');
      AsyncStorage.setItem(Storage.stateId, ''),
        AsyncStorage.setItem(Storage.cityId, '');
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'User_Logout_Error',
      });
    }
  } catch (error) {
    Toast.show(error.message);
    yield put({
      type: 'User_Logout_Error',
    });
  }
}
function* aboutus(action) {
  try {
    const data = new FormData();

    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'About_Us_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'About_Us_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'About_Us_Error',
    });
  }
}

function* contacts(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Contact_Detail_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Contact_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Contact_Detail_Error',
    });
  }
}
function* faq(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Faq_Success',
        payload: response.data[0].value,
      });
    } else {
      yield put({
        type: 'Faq_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Faq_Error',
    });
  }
}
function* privacy(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Privacy_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Privacy_Error',
      });
    }
  } catch (error) {
    console.log('th narendra ',error);
    yield put({
      type: 'Privacy_Error',
    });
  }
}

function* security(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Security_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Security_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Security_Error',
    });
  }
}
function* TermAndCondition(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'TermAndCondition_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'TermAndCondition_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'TermAndCondition_Error',
    });
  }
}
function* trending(action) {
  try {
    const data = new FormData();
    data.append('key', action.key);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Trending_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Trending_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Trending_Error',
    });
  }
}

function* notification(action) {
  console.log('thisi si your action', action);
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Notification_Success',
        payload: response.data,
      });
    } else if (response.status == 500) {
      yield put({
        type: 'Notification_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Notification_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Notification_Error',
    });
  }
}
// support values
function* support(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('mobile', action.mobile);
    data.append('subject', action.subject);
    data.append('message', action.message);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Support_Success',
      });
      Toast.show(response.messages);
      setTimeout(() => action.navigation.navigate('Main'), 2000);
    } else {
      yield put({
        type: 'Support_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Support_Error',
    });
  }
}

function* contact(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('mobile', action.mobile);
    data.append('message', action.message);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Contact_Us_Success',
      });
      // action.navigation.navigate('Contact')
      Toast.show(response.messages);
    } else {
      yield put({
        type: 'Contact_Us_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Contact_Us_Error',
    });
  }
}

function* changepassword(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('password', action.password);
    data.append('newpassword', action.newpassword);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Change_Password_Success',
      });
      action.navigation.navigate('Profile')
      Toast.show(response.messages);
    } else {
      yield put({
        type: 'Change_Password_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Change_Password_Request',
    });
  }
}

function* feedback(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('information_rating', action.information_rating);
    data.append('information_msg_rating', action.information_msg_rating);
    data.append('navigation_rating', action.navigation_rating);
    data.append('navigation_msg_rating', action.navigation_msg_rating);
    data.append('product_rating', action.product_rating);
    data.append('product_msg_rating', action.product_msg_rating);
    data.append('onboarding_rating', action.onboarding_rating);
    data.append('onboarding_msg_rating', action.onboarding_msg_rating);
    data.append('service_rating', action.service_rating);
    data.append('service_msg_rating', action.service_msg_rating);
    data.append('message', action.message);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Feedback_Success',
      });
      Toast.show(response.messages);
      setTimeout(() => action.navigation.navigate('Main'), 2000);
    } else {
      yield put({
        type: 'Feedback_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Feedback_Error',
    });
  }
}
function* createPin(action) {
  console.log('this is action', action);
  try {
    const data = new FormData();
    if (action.mobile) {
      data.append('mobile', action.mobile);
    } else if (action.email) {
      data.append('email', action.email);
    }
    data.append('pin', action.pin);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('thisis espo', response);
    if (response.status == 200) {
      yield put({
        type: 'Create_Pin_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      if (action && action.navigation) {
        action.navigation.replace('Login');
      }
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Create_Pin_Error',
      });
    }
  } catch (error) {
    Toast.show(error.messages);
    yield put({
      type: 'Create_Pin_Error',
    });
  }
}

function* editProfile(action) {
  console.log('this is action  value', action);
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('dob', action.dob);
    data.append('gender', action.gender);
    data.append('father_spouse_name', action.father_spouse_name);
    data.append('mother_maiden_name', action.mother_maiden_name);
    data.append('pan', action.pan);
    data.append('mobile', action.mobile);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('occupation', action.occupation);
    data.append('pincode', action.pincode);
    data.append('country', action.country);
    data.append('state', action.state);
    data.append('city', action.city);
    data.append('income_group', action.income_group);
    data.append('education', action.education);
    data.append('marital_status', action.marital_status);
    data.append('residential_status', action.residential_status);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is ser response', response);
    if (response.status == 200) {
      yield put({
        type: 'Edit_Profile_Success',
      });
      AsyncStorage.setItem(Storage.name, response.data[0].name);
      AsyncStorage.setItem(Storage.email, response.data[0].email);
      AsyncStorage.setItem(Storage.mobile, response.data[0].mobile);
      Toast.show(response.messages);
      action.navigation.replace('Profile');
    } else {
      yield put({
        type: 'Edit_Profile_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Edit_Profile_Error',
    });
  }
}

function* AddFamily(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('dob', action.dob);
    data.append('gender', action.gender);
    data.append('father_spouse_name', action.father_spouse_name);
    data.append('mother_maiden_name', action.mother_maiden_name);
    data.append('pan', action.pan);
    data.append('mobile', action.mobile);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('occupation', action.occupation);
    data.append('pincode', action.pincode);
    data.append('country', action.country);
    data.append('state', action.state);
    data.append('city', action.city);
    data.append('relation', action.relation);
    data.append('income_group', action.income_group);
    data.append('education', action.education);
    data.append('marital_status', action.marital_status);
    data.append('residential_status', action.residential_status);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is user response', response);
    if (response.status == 200) {
      yield put({
        type: 'Add_Family_Success',
      });
      Toast.show(response.messages);
      action.navigation.replace('Profile');
    } else {
      yield put({
        type: 'Add_Family_Error',
      });
      Toast.show(response.Message);
    }
  } catch (error) {
    yield put({
      type: 'Add_Family_Error',
    });
  }
}

function* EditFamily(action) {
  console.log('thisis is action value-----------------------', action);
  try {
    const data = new FormData();
    data.append('family_id', action.family_id);
    data.append('name', action.name);
    data.append('email', action.email);
    data.append('dob', action.dob);
    data.append('gender', action.gender);
    data.append('father_spouse_name', action.father_spouse_name);
    data.append('mother_maiden_name', action.mother_maiden_name);
    data.append('pan', action.pan);
    data.append('relation', action.relation);
    data.append('mobile', action.mobile);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('occupation', action.occupation);
    data.append('pincode', action.pincode);
    data.append('country', action.country);
    data.append('state', action.state);
    data.append('city', action.city);
    data.append('income_group', action.income_group);
    data.append('education', action.education);
    data.append('marital_status', action.marital_status);
    data.append('residential_status', action.residential_status);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this isi response value', response);
    if (response.status == 200) {
      yield put({
        type: 'Edit_Family_Success',
      });
      Toast.show(response.messages);
      action.navigation.replace('Profile');
    } else {
      yield put({
        type: 'Edit_Family_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Edit_Family_Error',
    });
  }
}

function* getFaq(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Get_Faq_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Get_Faq_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Faq_Error',
    });
  }
}
function* getBlog(action) {
  try {
    const data = new FormData();
    data.append('post_category_id', action.post_category_id);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Get_Blog_Success',
        payload: response.data.blogpost,
      });
    } else {
      yield put({
        type: 'Get_Blog_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Blog_Error',
    });
  }
}

function* userDetails(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'User_Detail_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'User_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_Detail_Error',
    });
  }
}

function* getStory(action) {
  try {
    const data = new FormData();
    data.append('post_category_id', action.post_category_id);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Get_Story_Success',
        payload: response.data.blogpost,
      });
    } else {
      yield put({
        type: 'Get_Story_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Story_Error',
    });
  }
}

function* bankList(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Bank_List_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Bank_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Bank_List_Error',
    });
  }
}

function* nomineeList(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Nominee_List_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Nominee_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Nominee_List_Error',
    });
  }
}

function* addBank(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('bank_id', action.bank_id);
    data.append('account_number', action.account_number);
    data.append('account_type', action.account_type);
    data.append('ifsc_code', action.ifsc_code);
    data.append('other1', action.other1);
    data.append('other2', action.other2);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Add_Bank_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      action.navigation.navigate('Profile');
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Add_Bank_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Add_Bank_Error',
    });
  }
}
function* updateBank(action) {
  try {
    const data = new FormData();
    data.append('user_bank_id', action.user_bank_id);
    data.append('user_id', action.user_id);
    data.append('bank_id', action.bank_id);
    data.append('name', action.name);
    data.append('account_number', action.account_number);
    data.append('account_type', action.account_type);
    data.append('ifsc_code', action.ifsc_code);
    data.append('other1', action.other1);
    data.append('other2', action.other2);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Update_Bank_Success',
        payload: response.data,
      });
      Toast.show(response.messages);
      action.navigation.navigate('Profile');
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Update_Bank_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Update_Bank_Error',
    });
  }
}

function* deleteBank(action) {
  try {
    const data = new FormData();
    data.append('user_bank_id', action.user_bank_id);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Delete_Bank_Success',
        payload: response.data,
      });

      Toast.show(response.messages);
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Delete_Bank_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Delete_Bank_Error',
    });
  }
}

function* getBankName(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Bank_Name_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Bank_Name_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Bank_Name_Error',
    });
  }
}

function* addNominee(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('name', action.name);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('country', action.country);
    data.append('state', action.state);
    data.append('city', action.city);
    data.append('dob', action.dob);
    data.append('guardian', action.guardian);
    data.append('relationship', action.relationship);
    data.append('guardian_relationship', action.guardian_relationship);
    data.append('pincode', action.pincode);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Add_Nominee_Success',
        payload: response,
      });
      Toast.show(response.messages);
      action.navigation.navigate('Profile');
    } else {
      console.log('thsi is working');
      Toast.show(response.messages);
      yield put({
        type: 'Add_Nominee_Error',
      });
    }
  } catch (error) {
    console.log('hi tisi  s narendra');
    yield put({
      type: 'Add_Nominee_Error',
    });
  }
}

function* editNominee(action) {
  try {
    const data = new FormData();

    data.append('user_id', action.user_id);
    data.append('user_nominee_id', action.user_nominee_id);
    data.append('name', action.name);
    data.append('address1', action.address1);
    data.append('address2', action.address2);
    data.append('country', action.country);
    data.append('state', action.state);
    data.append('city', action.city);
    data.append('dob', action.dob);
    data.append('guardian', action.guardian);
    data.append('relationship', action.relationship);
    data.append('guardian_relationship', action.guardian_relationship);
    data.append('pincode', action.pincode);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Edit_Nominee_Success',
        payload: response,
      });
      Toast.show(response.messages);
      action.navigation.navigate('Profile');
    } else {
      console.log('thsi is working');
      Toast.show('Nominee add Error');
      yield put({
        type: 'Edit_Nominee_Error',
      });
    }
  } catch (error) {
    console.log('hi tisi  s narendra');
    yield put({
      type: 'Edit_Nominee_Error',
    });
  }
}

function* countryList(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Country_List_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Country_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Country_List_Error',
    });
  }
}

function* stateList(action) {
  try {
    const data = new FormData();
    data.append('country_id', action.country_id);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is user response', response);
    // Alert.alert('hi',response)
    if (response.status == 200) {
      yield put({
        type: 'State_List_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'State_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'State_List_Error',
    });
  }
}

function* cityList(action) {
  try {
    const data = new FormData();
    data.append('state_id', action.state_id);
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'City_List_Success',
        payload: response.data,
      });
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'City_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'City_List_Error',
    });
  }
}

function* Search(action) {
  console.log('this is actio data',action);
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('year', action.year);
    data.append('month', action.month);
    data.append('days', action.days);
    data.append('amount', action.amount);
    data.append('location', action.location);
    data.append('type1', JSON.stringify(action.type1));
    data.append('bank_id', JSON.stringify(action.bank_id));
    data.append('interest_rate', action.interest_rate);
    data.append('nationalized', action.nationalized);
    data.append('sb_account_required', action.sb_account_required);
    data.append('offer', action.offer);
    data.append('interest_payout', action.interest_payout);
    data.append('premature_penalty', action.premature_penalty);
    data.append('loan', action.loan);
    data.append('order_on', action.order_on);
    data.append('order_to', action.order_to);
    data.append('b_lat', action.b_lat);
    data.append('b_long', action.b_long);
    // Modification Type
    data.append('btype', action.b_type);
    // data.append('premature_withdrawal_rate', action.premature_withdrawal_rate);
    // data.append('load_lending_rate', action.load_lending_rate);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is user response-----------------------------------------------------------------------------------------', response);
    if (response.status == 200) {
      yield put({
        type: 'FD_Search_Success',
        payload: response.data,
      });
      if (response.data) {
        action.navigation.navigate('FDList', {
          amount: action.amount,
          days: action.days,
          year: action.year,
          month: action.month,
          location: action.location,
          type1: action.type1,
          order_on: action.order_on,
          order_to: action.order_to,
          bank_id:action.bank_id,
          interest_rate:action.interest_rate,
          nationalized:action.nationalized,
          sb_account_required:action.sb_account_required,
          offer:action.offer,
          interest_payout:action.interest_payout,
          premature_penalty:action.premature_penalty,
          loan:action.loan,
          b_lat:action.b_lat,
          b_long:action.b_long

        });
      } else if (action.filter == 'true') {
        action.navigation.navigate('FDList', {
          amount: action.amount,
          days: action.days,
          year: action.year,
          month: action.month,
          location: action.location,
          type1: action.type1,
          order_on: action.order_on,
          order_to: action.order_to,
          bank_id:action.bank_id,
          interest_rate:action.interest_rate,
          nationalized:action.nationalized,
          sb_account_required:action.sb_account_required,
          offer:action.offer,
          interest_payout:action.interest_payout,
          premature_penalty:action.premature_penalty,
          loan:action.loan,
          b_lat:action.b_lat,
          b_long:action.b_long
        });
      }
    } else {
      if (action.data == 'FdList') {
        yield put({
          type: 'FD_Search_Success',
          payload: response.data,
        });
        action.navigation.navigate('FDList', {
          amount: action.amount,
          days: action.days,
          year: action.year,
          month: action.month,
          location: action.location,
          type1: action.type1,
          order_on: action.order_on,
          order_to: action.order_to,
          bank_id:action.bank_id,
          interest_rate:action.interest_rate,
          nationalized:action.nationalized,
          sb_account_required:action.sb_account_required,
          offer:action.offer,
          interest_payout:action.interest_payout,
          premature_penalty:action.premature_penalty,
          loan:action.loan,
          b_lat:action.b_lat,
          b_long:action.b_long
        });
      } else {
        yield put({
          type: 'FD_Search_Error',
        });
      }
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'FD_Search_Error',
    });
  }
}
function* FDDetail(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('fixed_deposit_id', action.fixed_deposit_id);
    data.append('principal_amount', action.principal_amount);
    data.append('rate', action.rate);
    data.append('year', action.year);
    data.append('month', action.month);
    data.append('days', action.days);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'FD_Detail_Success',
        payload: response.data,
      });
      action.navigation.navigate('FDDetail', {
        tenure: action.year,
        amount: action.principal_amount,
        year: action.year,
        month: action.month,
        days: action.days,
        pincode: action.pincode,
      });
    } else {
      yield put({
        type: 'FD_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'FD_Detail_Error',
    });
  }
}

function* SBDetail(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('saving_account_id', action.saving_account_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'SB_Detail_Success',
        payload: response.data,
      });
      action.navigation.navigate('AccountDetail', {
        branch_type: action.branch_type,
        pincode: action.pincode,
      });
    } else {
      yield put({
        type: 'SB_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'SB_Detail_Error',
    });
  }
}

function* SBSearch(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('min_bal', action.min_bal);
    data.append('location', action.location);
    data.append('type1', JSON.stringify(action.type1));
    data.append('bank_id', JSON.stringify(action.bank_id));
    data.append('interest_rate', action.interest_rate);
    data.append('nationalized', action.nationalized);
    data.append('offer', action.offer);
    data.append('insurance', action.insurance);
    data.append('account_type',action.account_type)
    data.append('account_sub_type', action.account_sub_type);
    data.append('non_maintenance_penalty', action.non_maintenance_penalty);
    data.append('debit_card_amc', action.debit_card_amc);
    data.append('order_on', action.order_on);
    data.append('order_to', action.order_to);
    data.append('b_lat', action.b_lat);
    data.append('b_long', action.b_long);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is response value', response);
    if (response.status == 200) {
      yield put({
        type: 'SB_Search_Success',
        payload: response.data,
      });
      action.navigation.navigate('AccountList', {
        balance: action.min_bal,
        location: action.location,
        type1: action.type1,
        bank_id:action.bank_id,
        interest_rate:action.interest_rate,
        nationalized:action.nationalized,
        offer:action.offer,
        insurance:action.insurance,
        account_type:action.account_type,
        account_sub_type:action.account_sub_type,
        non_maintenance_penalty:action.non_maintenance_penalty,
        debit_card_amc:action.debit_card_amc,
        order_on:action.order_on,
        order_to:action.order_to,
        b_lat:action.b_lat,
        b_long:action.b_long,
      });
    } else {
      if (action.data == 'AccountList') {
        yield put({
          type: 'SB_Search_Success',
          payload: response.data,
        });
        action.navigation.navigate('AccountList', {
          balance: action.min_bal,
        location: action.location,
        type1: action.type1,
        bank_id:action.bank_id,
        interest_rate:action.interest_rate,
        nationalized:action.nationalized,
        offer:action.offer,
        insurance:action.insurance,
        account_type:action.account_type,
        account_sub_type:action.account_sub_type,
        non_maintenance_penalty:action.non_maintenance_penalty,
        debit_card_amc:action.debit_card_amc,
        order_on:action.order_on,
        order_to:action.order_to,
        b_lat:action.b_lat,
        b_long:action.b_long,
        });
      } else {
        yield put({
          type: 'SB_Search_Error',
        });
      }
      Toast.show(response.messages);
    }
  } catch (error) {
    //  Toast.show('hi')
    yield put({
      type: 'SB_Search_Error',
    });
  }
}

function* FDCompare(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('value_id1', action.value_id1);
    data.append('value_id2', action.value_id2);
    data.append('user_id', action.user_id);
    data.append('year', action.year);
    data.append('days', action.days);
    data.append('month', action.month);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is response value', response);
    if (response.status == 200) {
      yield put({
        type: 'FD_Compare_Success',
        payload: response,
      });
      Toast.show(response.messages);
      action.navigation.navigate('CompareFD', {
        period: action.period,
        amount: action.amount,
        year: action.year,
        month: action.month,
        days: action.days,
      });
    } else {
      yield put({
        type: 'FD_Compare_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'FD_Compare_Error',
    });
  }
}

function* SBCompare(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('value_id1', action.value_id1);
    data.append('value_id2', action.value_id2);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is response value', response);
    if (response.status == 200) {
      yield put({
        type: 'SB_Compare_Success',
        payload: response,
      });
      action.navigation.navigate('CompareSBAccount', {
        branch_type1: action.branch_type1,
        branch_type2: action.branch_type2,
        location: action.location,
      });
    } else {
      yield put({
        type: 'SB_Compare_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'SB_Compare_Error',
    });
  }
}
function* SendOtp(action) {
  try {
    const data = new FormData();
    data.append('mobile', action.mobile);
    data.append('old_email', action.email);
    data.append('refferal_code', action.referal);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Send_RegOtp_Success',
        payload: response,
      });
      AsyncStorage.setItem(Storage.Rname, action.name);
      AsyncStorage.setItem(Storage.Remail, action.email);
      AsyncStorage.setItem(Storage.Rmobile, action.mobile);
      AsyncStorage.setItem(Storage.RcountryCode, action.code);
      AsyncStorage.setItem(Storage.Rpin, action.pin);
      AsyncStorage.setItem(Storage.Rreferal, action.referal);
      Toast.show(response.messages);
      action.navigation.push('Otp', {
        type: 'Register',
        otp: response.otp,
        mobile: action.mobile,
      });
    } else {
      yield put({
        type: 'Send_RegOtp_Error',
      });
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'Send_RegOtp_Error',
    });
  }
}

function* ResendOtp(action) {
  try {
    const data = new FormData();
    data.append('mobile', action.mobile);
    data.append('otpwithoutconfrim', action.boolean);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Resend_Otp_Success',
        payload: response,
      });
      Toast.show(response.messages);
      action.navigation.push('Otp', {
        mobile: action.mobile,
        pin: action.pin,
        otp: response.otp,
        type: action.type1,
        user_id: action.user_id,
        attemptbool: response.attemptbool,
        boolean2: action.boolean2,
        attempt: response.attempt,
      });
    } else {
      Toast.show(response.messages);

      yield put({
        type: 'Resend_Otp_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Resend_Otp_Error',
    });
  }
}
function* verifydOtp(action) {
  try {
    const data = new FormData();
    if (action.email) {
      data.append('email', action.mobile);
    } else {
      data.append('mobile', action.mobile);
    }
    data.append('otpwithoutconfrim', action.boolean);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is response', response);
    if (response.status == 200) {
      yield put({
        type: 'Verify_Otp_Success',
        payload: response,
      });
      // Toast.show(response.messages)
      action.navigation.push('Otp', {
        mobile: action.mobile,
        otp: action.otp,
        type: action.type1,
        user_id: action.user_id,
        attemptbool: response.attemptbool,
      });
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Verify_Otp_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Verify_Otp_Error',
    });
  }
}
function* verifydOtpForgot(action) {
  try {
    const data = new FormData();
    if (action.email) {
      data.append('email', action.email);
    } else {
      data.append('mobile', action.mobile);
    }
    data.append('otpwithoutconfrim', action.boolean);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Verifyf_Otp_Success',
        payload: response,
      });
      action.navigation.push('ForgotOtp', {
        mobile: action.mobile,
        otp: action.otp,
        attemptbool: response.attemptbool,
        email: action.email,
      });
    } else {
      yield put({
        type: 'Verifyf_Otp_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Verifyf_Otp_Error',
    });
  }
}
function* ResenOtp(action) {
  try {
    const data = new FormData();
    if (action.mobile) {
      data.append('mobile', action.mobile);
      data.append('otpwithoutconfrim', action.boolean);
    } else if (action.email) {
      data.append('email', action.email);
      data.append('otpwithoutconfrim', action.boolean);
    }
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this.respasdfjkldasjfdkljdsaklfjlkdf', response);
    if (response.status == 200) {
      yield put({
        type: 'Resen_Otp_Success',
        payload: response,
      });
      Toast.show(response.messages);
      if (action && action.navigation) {
        action.navigation.replace('ForgotOtp', {
          otp: response.otp,
          mobile: response.mobile,
          email: response.email,
          attemptbool: response.attemptbool,
          boolean2: action.boolean2,
        });
      }
    } else {
      Toast.show(response.messages);

      yield put({
        type: 'Resen_Otp_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Resen_Otp_Error',
    });
  }
}

function* FamilyList(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'Family_List_Success',
        payload: response.data,
      });
      // Toast.show(response.messages)
    } else {
      yield put({
        type: 'Family_List_Error',
      });
      // Toast.show(response.messages)
    }
  } catch (error) {
    yield put({
      type: 'Family_List_Error',
    });
  }
}
function* createFD(action) {
  try {
    const data = new FormData();
    data.append('formtype', action.formtype);
    data.append('deposit_option', action.deposit_option);
    data.append(
      'interest_calculation_frequency',
      action.interest_calculation_frequency,
    );
    data.append('amount', action.amount);
    data.append('tenure', action.tenure);
    data.append('name', action.name);
    data.append('mobile_number', action.mobile_number);
    data.append('email', action.email);
    data.append('address_communication', action.address_communication);
    data.append('address_permanent', action.address_permanent);
    data.append('qualifications', action.qualifications);
    data.append('mother_name', action.mother_name);
    data.append('father_name', action.father_name);
    data.append('marital_status', action.marital_status);
    data.append('my_fixed_deposit_id', action.my_fixed_deposit_id);
    data.append('spouse_name', action.spouse_name);
    data.append('occupation', action.occupation);
    data.append('annual_income', action.annual_income);
    data.append('fd_user_id', action.fd_user_id);
    data.append('user_id', action.user_id);
    data.append('cheque_copy', action.cheque_copy);
    data.append('address_proof', action.address_proof);
    data.append('pan_card', action.pan_card);
    data.append('user_photo', action.user_photo);
    data.append('nominee_name', action.nominee_name);
    data.append('signature_copy', action.signature_copy);
    data.append('user_relation', action.user_relation);
    data.append('relationship', action.relationship);
    data.append('user_dob', action.user_dob);
    data.append('pan', action.pan);
    data.append('dob', action.dob);
    data.append('nominee_address', action.nominee_address);

    data.append('maturity_amount', action.maturity_amount);
    data.append('maturity_interest', action.maturity_interest);
    data.append('bank_name', action.bank_name);
    data.append('bank_logo', action.bank_logo);
    data.append('type', action.type1);
    data.append('interest_rate', action.interest_rate);
    data.append('fd_joint_applicants_id', action.fd_joint_applicants_id);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log(
      'this is user response value dsfjdklfjdkfj jkljkl jdklfjklfj',
      response,
    );
    if (response.status == 200) {
      yield put({
        type: 'Create_FD_Success',
        payload: response.data,
      });
      if (action && action.navigation) {
        if (action.formtype == 'selectplan') {
          action.navigation.navigate('UserSelection', {
            my_fixed_deposit_id: response.my_fixed_deposit_id,
          });
        } else if (action.formtype == 'userinfo') {
          if (action.secondaryUserData.length > 0) {
            AsyncStorage.setItem('primary_user_name',action.name)
            action.navigation.navigate('SecondaryUserInfo', {
              my_fixed_deposit_id: action.my_fixed_deposit_id,
              data: action.secondaryUserData,
            });
            AsyncStorage.setItem(
              'fd_user_id',
              JSON.stringify(response.my_fd_user),
            );
          } else {
            AsyncStorage.setItem('primary_user_name',action.name)
            action.navigation.navigate('UploadDocument', {
              my_fixed_deposit_id: action.my_fixed_deposit_id,
            });
            AsyncStorage.setItem(
              'fd_user_id',
              JSON.stringify(response.my_fd_user),
            );
          }
        } else if (action.formtype == 'secondaryuser') {
          if (action.secondarySecondData) {
            if (action.secondarySecondData.length > 1) {
              if (action.type1 == 'final') {
                action.navigation.navigate('UploadDocument', {
                  my_fixed_deposit_id: action.my_fixed_deposit_id,
                });
                AsyncStorage.setItem('secondary_user_name2',action.name)
                AsyncStorage.setItem(
                  'fd_user_id2',
                  JSON.stringify(response.my_fd_user),
                );
              } else {
                AsyncStorage.setItem('secondary_user_name1',action.name)
                action.navigation.navigate('SecondaryUserTwo', {
                  my_fixed_deposit_id: action.my_fixed_deposit_id,
                  data: action.secondarySecondData,
                });
                AsyncStorage.setItem(
                  'fd_user_id1',
                  JSON.stringify(response.my_fd_user),
                );
              }
            } else {
              if (action.type1 == 'final') {
                action.navigation.navigate('UploadDocument', {
                  my_fixed_deposit_id: action.my_fixed_deposit_id,
                });
                AsyncStorage.setItem('secondary_user_name2',action.name)
                AsyncStorage.setItem(
                  'fd_user_id2',
                  JSON.stringify(response.my_fd_user),
                );
              } else {
                action.navigation.navigate('UploadDocument', {
                  my_fixed_deposit_id: action.my_fixed_deposit_id,
                });
                AsyncStorage.setItem('secondary_user_name1',action.name)
                AsyncStorage.setItem(
                  'fd_user_id1',
                  JSON.stringify(response.my_fd_user),
                );
              }
            }
          } else {
            AsyncStorage.setItem(
              'fd_user_id2',
              JSON.stringify(response.my_fd_user),
            );
            AsyncStorage.setItem('secondary_user_name2',action.name)
            action.navigation.navigate('UploadDocument', {
              my_fixed_deposit_id: action.my_fixed_deposit_id,
            });
          }
        } else if (action.formtype == 'dcoument') {
          action.navigation.navigate('Nominee');
        } else if (action.formtype == 'nomineedetail') {
          action.navigation.navigate('RedeemAccountDetail', {
            my_fixed_deposit_id: response.my_fixed_deposit_id,
            amount: response.amount,
          });
        }
      }
    } else {
      Toast.show(response.messages);
      yield put({
        type: 'Create_FD_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Create_FD_Error',
    });
  }
}

function* myFDList(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('fd_status', action.fd_status);
    if (action.bank_name) {
      data.append('bank_name', action.bank_name);
    }

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'MYFD_List_Success',
        payload: response.userdata,
      });
    } else {
      yield put({
        type: 'MYFD_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'MYFD_List_Error',
    });
  }
}

function* myFdDetail(action) {
  try {
    const data = new FormData();
    data.append('my_fixed_deposit_id', action.my_fixed_deposit_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'MYFD_Detail_Success',
        payload: response.data,
      });
      if (action && action.navigation) {
        action.navigation.navigate('MyFDDetailPage');
      }
    } else {
      yield put({
        type: 'MYFD_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'MYFD_Detail_Error',
    });
  }
}
// nbfc flow
function* NBFCSearch(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('year', action.year);
    data.append('month', action.month);
    data.append('days', action.days);
    data.append('amount', action.amount);
    data.append('type1', JSON.stringify(action.type1));
    data.append('bank_id', JSON.stringify(action.bank_id));
    data.append('interest_rate', action.interest_rate);
    data.append('premature_penalty', action.premature_penalty);
    data.append('loan', action.loan);
    data.append('order_on', action.order_on);
    data.append('order_to', action.order_to);
    data.append('btype', action.btype);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this uskgflgk', response.data);
    if (response.status == 200) {
      yield put({
        type: 'NBFC_Search_Success',
        payload: response.data,
      });
      action.navigation.navigate('NBFCList', {
        amount: action.amount,
        days: action.days,
        year: action.year,
        month: action.month,
        type1: action.type1,
        order_on: action.order_on,
        order_to: action.order_to,
        bank_id:action.bank_id,
        interest_rate:action.interest_rate,
        premature_penalty:action.premature_penalty,
        loan:action.loan
      });
    } else {
      if (action.data == 'FdList') {
        yield put({
          type: 'NBFC_Search_Success',
          payload: response.data,
        });
        action.navigation.navigate('NBFCList', {
          amount: action.amount,
          days: action.days,
          year: action.year,
          month: action.month,
          location: action.location,
          type1: action.type1,
          order_on: action.order_on,
          order_to: action.order_to,
        });
      } else {
        yield put({
          type: 'NBFC_Search_Error',
        });
      }
      Toast.show(response.messages);
    }
  } catch (error) {
    yield put({
      type: 'NBFC_Search_Error',
    });
  }
}

function* NBFCDetail(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('fixed_deposit_id', action.fixed_deposit_id);
    data.append('principal_amount', action.principal_amount);
    data.append('rate', action.rate);
    data.append('year', action.year);
    data.append('month', action.month);
    data.append('days', action.days);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'NBFC_Detail_Success',
        payload: response.data,
      });
      action.navigation.navigate('NBFCAccountDetail', {
        tenure: action.year,
        amount: action.principal_amount,
        year: action.year,
        month: action.month,
        days: action.days,
        pincode: action.pincode,
      });
    } else {
      yield put({
        type: 'NBFC_Detail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'NBFC_Detail_Error',
    });
  }
}

function* NBFCCompare(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('value_id1', action.value_id1);
    data.append('value_id2', action.value_id2);
    data.append('user_id', action.user_id);
    data.append('year', action.year);
    data.append('days', action.days);
    data.append('month', action.month);

    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'NBFC_Compare_Success',
        payload: response,
      });
      action.navigation.navigate('NBFCCompare', {
        period: action.period,
        amount: action.amount,
        year: action.year,
        month: action.month,
        days: action.days,
      });
    } else {
      yield put({
        type: 'NBFC_Compare_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'NBFC_Compare_Error',
    });
  }
}

function* getNBFCName(action) {
  try {
    const data = new FormData();
    data.append('user_id', action.user_id);
    data.append('btype', 2);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == 200) {
      yield put({
        type: 'NBFC_Name_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'NBFC_Name_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'NBFC_Name_Error',
    });
  }
}

export default function* authSaga() {
  yield takeEvery('Verify_Otp_Request', verifydOtp);
  yield takeEvery('Verifyf_Otp_Request', verifydOtpForgot);
  yield takeEvery('Resend_Otp_Request', ResendOtp);
  yield takeEvery('Resen_Otp_Request', ResenOtp);
  yield takeEvery('Send_RegOtp_Request', SendOtp);
  yield takeEvery('User_Login_Request', doLogin);
  yield takeEvery('User_Detail_Request', userDetails);
  yield takeEvery('User_MLogin_Request', mLogin);
  yield takeEvery('User_Register_Request', doRegister);
  yield takeEvery('Send_Otp_Request', forgotpasword);
  yield takeEvery('Change_Password_Request', changepassword);
  yield takeEvery('User_Logout_Request', logout);
  yield takeEvery('About_Us_Request', aboutus);
  yield takeEvery('Contact_Detail_Request', contacts);
  yield takeEvery('Faq_Request', faq);
  yield takeEvery('Privacy_Request', privacy);
  yield takeEvery('Security_Request', security);
  yield takeEvery('Trending_Request', trending);
  yield takeEvery('TermAndCondition_Request', TermAndCondition);
  yield takeEvery('Notification_Request', notification);
  yield takeEvery('Support_Request', support);
  yield takeEvery('Contact_Us_Request', contact);
  yield takeEvery('Feedback_Request', feedback);
  yield takeEvery('Create_Pin_Request', createPin);
  yield takeEvery('Edit_Profile_Request', editProfile);
  yield takeEvery('Get_Faq_Request', getFaq);
  yield takeEvery('Get_Blog_Request', getBlog);
  yield takeEvery('Bank_List_Request', bankList);
  yield takeEvery('Add_Bank_Request', addBank);
  yield takeEvery('Bank_Name_Request', getBankName);
  yield takeEvery('Update_Bank_Request', updateBank);
  yield takeEvery('Delete_Bank_Request', deleteBank);
  yield takeEvery('Nominee_List_Request', nomineeList);
  yield takeEvery('Add_Nominee_Request', addNominee);
  yield takeEvery('Edit_Nominee_Request', editNominee);
  yield takeEvery('Country_List_Request', countryList);
  yield takeEvery('State_List_Request', stateList);
  yield takeEvery('City_List_Request', cityList);
  yield takeEvery('FD_Detail_Request', FDDetail);
  yield takeEvery('SB_Detail_Request', SBDetail);
  yield takeEvery('Get_Story_Request', getStory);
  yield takeEvery('FD_Search_Request', Search);
  yield takeEvery('SB_Search_Request', SBSearch);

  yield takeEvery('FD_Compare_Request', FDCompare);
  yield takeEvery('SB_Compare_Request', SBCompare);
  yield takeEvery('Add_Family_Request', AddFamily);
  yield takeEvery('Edit_Family_Request', EditFamily);
  yield takeEvery('Family_List_Request', FamilyList);
  yield takeEvery('Create_FD_Request', createFD);
  yield takeEvery('MYFD_List_Request', myFDList);
  yield takeEvery('MYFD_Detail_Request', myFdDetail);

  yield takeEvery('NBFC_Search_Request', NBFCSearch);
  yield takeEvery('NBFC_Detail_Request', NBFCDetail);
  yield takeEvery('NBFC_Compare_Request', NBFCCompare);
  yield takeEvery('NBFC_Name_Request', getNBFCName);
}
