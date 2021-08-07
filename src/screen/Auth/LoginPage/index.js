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

const loginValidationSchema=yup.object().shape({
  email:yup.string().email('Please enter valid email').required('Email address is required'),
  password:yup.string().min(8,({min})=>`Password must be atleast ${min} charrecter`).
  required('Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
})
const Login=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [visible,setVisible]=useState(true)
    const [toggleCheckBox,setToggleCheckBox]=useState(false)

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
const validateUser=(email,password)=>{
        console.log('this is user login detail',email,password);
        dispatch({
          type: 'User_Login_Request',
          url: 'signin',
          email,
          password,
          navigation: navigation,
        })
}

    return(
      <Formik
      initialValues={{ email: '',password:'' }}
      onSubmit={values => validateUser(values.email,values.password)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
         <ScrollView>
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image style={styles.image} 
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
          <View style={styles.main}>
             
              <View style={styles.card}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/msg.png')}/>
                     <TextInput 
                      style={styles.input1}
                      placeholder='Email'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      maxLength={40}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.email && touched.email) &&
                <Text style={styles.warn}>{errors.email}</Text>
                }
              </View>
             
             
              <View style={styles.card}>
                    <Text style={styles.heading}>Password</Text>
                    <View style={styles.input}>      
                     {showVisible()}
                     <TextInput
                    style={styles.input1}
                    placeholder='Password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={visible}
                    maxLength={20}
                    />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.password && touched.password) &&
                <Text style={styles.warn}>{errors.password}</Text>
                }
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
                  <Text style={{fontSize:12,fontFamily:'Montserrat-Normal'}}>keep me logged in</Text>
                  </View>
                <Text style={{fontSize:12,fontFamily:'Montserrat-Normal'}}
                 onPress={()=>navigation.navigate('Forget')}>Forgot password?</Text>
              </View>

              <View style={styles.button}>
                    <CustomButton
                    // onPress={()=>navigation.navigate('Main')}
                   onPress={()=>errors.password || errors.email?Toast.show('All field required'):handleSubmit()}
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
         </ScrollView>
         <StatusBar/>
       </View>
        )}
        </Formik>
    )
}
export default Login;
