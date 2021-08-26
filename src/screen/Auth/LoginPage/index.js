import React,{useState,useEffect} from 'react';
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

const loginValidationSchema=yup.object().shape({
  value:yup.string().required('Email or Mobile is required'),
})
const Login=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [visible,setVisible]=useState(true)
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const [otp,setOtp]=useState('')
    const [focus,setFocus]=useState(false)

const showVisible=()=>{
  return(
    <TouchableOpacity 
      onPress={()=>visible?setVisible(false):setVisible(true)}>
      {!visible?  <Image source={require('../../../assets/Image/eye.png')}/>:
        <Image source={require('../../../assets/Image/eye1.png')}/>
    }
    </TouchableOpacity>
  )
}
const validateUser=(value)=>{
        if(isNaN(value))
        dispatch({
          type: 'User_Login_Request',
          url: 'signin',
          email:value,
          pin:otp,
          navigation:navigation,
        })
        else{
          dispatch({
            type: 'User_Login_Request',
            url: 'signin',
            mobile:value,
            pin:otp,
            navigation: navigation,
          })
        }
        
}

const call=()=>{
  setFocus(false)
}
    return(
      <Formik
      initialValues={{ value: ''}}
      onSubmit={values => validateUser(values.value)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
         <KeyboardAwareScrollView>
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image style={styles.image} 
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
          <View style={styles.main}>
              <View style={[styles.card,{borderColor:focus?colors.bc:'#fff'}]}>
                {values.value? <Text style={styles.heading}>Email / Mobile</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/msg.png')}/>
                     <TextInput 
                      style={styles.input1}
                      onFocus={()=>setFocus(true)}
                      placeholder='Email / Mobile'
                      onChangeText={handleChange('value')}
                      onBlur={handleBlur('value')}
                      value={values.value}
                      maxLength={40}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.value && touched.value) &&
                <Text style={styles.warn}>{errors.value}</Text>
                }
              </View>
             <View style={{width:'100%',marginTop:20}}>
               <Text style={{marginLeft:4,color:colors.textColor,fontFamily:'Montserrat-Normal',fontSize:13}}>Enter Your Pin</Text>
              <OTPTextInput
              containerStyle={styles.OtpInput}
              handleTextChange={(code)=>setOtp(code)}
              inputCount={4}
              textInputStyle={styles.otp}
              offTintColor={'white'}
              tintColor={'white'}
              />
              </View>
             
              <View
               style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#5A4392', false: '#5A4392' }}
                  />
                  <Text style={{fontSize:12,fontFamily:'Montserrat-Normal',color:colors.textColor}}>keep me logged in</Text>
                  </View>
                <Text style={{fontSize:12,fontFamily:'Montserrat-Normal',color:colors.textColor}}
                 onPress={()=>navigation.navigate('Forget')}>Forgot pin?</Text>
              </View>

              <View style={styles.button}>
                    <CustomButton
                    //  onPress={()=>navigation.replace('Main')}
                   onPress={()=>errors.value || otp==''?Toast.show('All field required'):handleSubmit()}
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
                  <Text style={styles.account}>Login With OTP</Text>
                </TouchableOpacity>
          </View>
         </KeyboardAwareScrollView>
         <StatusBar/>
       </View>
        )}
        </Formik>
    )
}
export default Login;
