import React,{useState,useEffect,useRef} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput,Alert} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import CheckBox from "@react-native-community/checkbox";
import OTPTextInput  from 'react-native-otp-textinput';
import colors from '../../../component/colors';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import OtpInputs from 'react-native-otp-inputs';
import fontSize from '../../../component/fontSize';


const loginValidationSchema=yup.object().shape({
  value:yup.string().required('Please enter your Email or Mobile number'),
  pin:yup.string().min(4,({min})=>`Pin must be 4 digits`).required('Please enter your Pin'),
})
const Login=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [visible,setVisible]=useState(true)
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const [otp,setOtp]=useState('')
    const [focus,setFocus]=useState(false)
    const next = useRef(null);

const showVisible=()=>{
  return(
    <TouchableOpacity 
      style={{alignItems:'center',justifyContent:'center'}}
      onPress={()=>visible?setVisible(false):setVisible(true)}>
      {!visible?  <Image source={require('../../../assets/Image/eye.png')}/>:
        <Image source={require('../../../assets/Image/eye1.png')}/>
    }
    </TouchableOpacity>
  )
}
const validateUser=async(values)=>{
        const device_type= DeviceInfo.getSystemName()
        let token=await AsyncStorage.getItem(Storage.token);
        if(isNaN(values.value)){  
        dispatch({
          type: 'User_Login_Request',
          url: 'signin',
          email:values.value,
          pin:values.pin,
          device_token:token,
          device_type:device_type,
          navigation:navigation,
        })
      }
        else{
          dispatch({
            type: 'User_Login_Request',
            url: 'signin',
            mobile:values.value,
            pin:values.pin,
            device_token:token,
            device_type:device_type,
            navigation: navigation,
          })
        
      }
        
}
    return(
      <Formik
      initialValues={{ value: '',pin:''}}
      onSubmit={values => validateUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
         <KeyboardAwareScrollView
         extraScrollHeight={100}
         enableOnAndroid={true} 
         keyboardShouldPersistTaps='handled'
         contentContainerStyle={{flex:1}}>
           <View style={{flex:1}}>
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
          <View style={styles.main}>
              <View style={[styles.card,{borderColor:focus?colors.bc:colors.white}]}>
                <Text style={styles.heading}>Email / Mobile</Text>
                    <View style={styles.input}>
                     <Image style={{width:24,height:36}}
                      source={require('../../../assets/Image/email-mobile.png')}/>
                     <TextInput 
                      style={styles.input1}
                      onFocus={()=>setFocus(true)}
                      placeholder='example@domain.com'
                      onChangeText={handleChange('value')}
                      onBlur={handleBlur('value')}
                      value={values.value}
                      maxLength={40}
                      returnKeyType='next'
                        onSubmitEditing={() => {
                          next.current.focus()
                        }}
                      />
                  </View>
              </View>
              
              <View style={styles.error}>
              {(errors.value && touched.value) &&
                <Text style={styles.warn}>{errors.value}</Text>
                }
              </View>
             <View style={styles.view1}>
               <Text style={styles.text1}>Enter Your Pin</Text>
             
                <View style={{width:'100%'}}>
               <OtpInputs
                ref={next}
                 handleChange={handleChange('pin')}
                 onBlur={handleBlur('pin')}
                 numberOfInputs={4}
                 keyboardType={"numeric"} secureTextEntry ={visible}
                 style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:'100%'}}
                 inputContainerStyles={styles.otp}
                 inputStyles={{fontSize:fontSize.sixteen,color:colors.textColor,alignItems:'center'}}
                 returnKeyType='go'
                 onSubmitEditing={()=>handleSubmit()}
              />
                    <View style={styles.error}>
                    {(errors.pin && touched.pin) &&
                      <Text style={styles.warn}>{errors.pin}</Text>
                      }
                    </View>
              </View>
              </View>
              <View
               style={styles.view2}>
                 <View  style={styles.view3}>
                 <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true:colors.bc, false:colors.bc }}
                  />
                  <Text style={styles.text3}>Keep me logged in</Text>
                  </View>
                <Text style={styles.text2}
                 onPress={()=>navigation.navigate('Forget')}>Forgot pin?</Text>
              </View>

              <View style={styles.button}>
                    <CustomButton
                      // onPress={()=>navigation.replace('Main')}
                    onPress={()=>handleSubmit()}
                    title='LOG IN'
                    />
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.account}>Don't have an account?</Text>
                    <Text 
                    onPress={()=>navigation.navigate('Register')} 
                    style={styles.account1}> Register here</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('LoginWithOtp')}
                style={styles.bottom}>
                  <Text style={styles.account1}>Login With OTP</Text>
                </TouchableOpacity>
          </View>
          </View>
         </KeyboardAwareScrollView>
         <StatusBar/>
       </View>
        )}
        </Formik>
    )
}
export default Login;
