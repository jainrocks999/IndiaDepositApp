import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput,Alert} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../../../component/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const loginValidationSchema=yup.object().shape({
    mobile:yup.string().min(10).
    required('Mobile number is required').
    matches(/^[0]?[789]\d{9}$/,"Please Enter valid Mobile Number"),
})
const Login=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [focus,setFocus]=useState(false)

const showVisible=()=>{
  return(
   <Image source={require('../../../assets/Image/phone.png')}/>
  )
}
const validateUser=(mobile)=>{
        dispatch({
          type: 'User_MLogin_Request',
          url: 'mlogin',
          mobile,
          navigation: navigation,
        })
}

    return(
      <Formik
      initialValues={{ mobile: ''}}
      onSubmit={values => validateUser(values.mobile)}
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
          <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')}
                style={styles.bottom}>
                  <Text 
                  style={[styles.account,{textAlign:'center'}]}>
                      {'We will send you a OTP on\nyour phone number'}</Text>
                </TouchableOpacity>
              <View style={[styles.card,{borderColor:focus?colors.bc:'white'}]}>
                   {values.mobile? <Text style={styles.heading}>Mobile</Text>:null}
                    <View style={styles.input}>      
                     {showVisible()}
                     <TextInput
                      onFocus={()=>setFocus(true)}
                      style={styles.input1}
                      placeholder='Mobile Number'
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      maxLength={13}
                      keyboardType={'phone-pad'}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={styles.warn}>{errors.mobile}</Text>
                }
              </View>
              <View style={styles.button}>
                    <CustomButton
                    // onPress={()=>navigation.navigate('Main')}
                   onPress={()=>errors.mobile ?Toast.show('Field required'):handleSubmit()}
                    title='GET OTP'
                    />
                </View>
                
                <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')}
                style={styles.bottom}>
                  <Text style={styles.account}>Login With Password</Text>
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
