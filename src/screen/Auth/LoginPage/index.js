import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput,Alert} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import colors from '../../../component/colors';
import CheckBox from '@react-native-community/checkbox';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginValidationSchema=yup.object().shape({
  email:yup.string().required('Email address or mobile number is required'),
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

useEffect(async()=>{
 
},[])
const showVisible=()=>{
  return(
    <TouchableOpacity 
      onPress={()=>visible?setVisible(false):setVisible(true)}>
      {!visible?<Image 
      style={{width:19,height:13}} 
      source={require('../../../assets/Images/eye.png')}/>:
      <Image style={{width:19,height:13}} 
      source={require('../../../assets/Images/eye1.png')}/>
    }
    </TouchableOpacity>
  )
}
const keepme = async (newValue) => {
    setToggleCheckBox(newValue);
  };
const validateUser=(email,password)=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mob = /^[0]?[789]\d{9}$/;
      if(isNaN(email))
      {
          if(reg.test(email)==false){
            Toast.show('Please Enter Valid Email Address')
            return false;
          }
      }
      else
      {
          if(mob.test(email)==false){
            Toast.show('Please Enter Valid Mobile number')
          }
      }
    navigation.replace('DashBoardPage')
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
                    <Image style={styles.image} 
                    source={require('../../../assets/Images/IndiaDeposit_Primary.png')}/>
                </View>

                <View style={styles.textView}>
                  <Text style={styles.text}>LOG IN</Text>
                </View>

                <View style={styles.main}>
                  <View style={styles.second}>
                    <View style={styles.imageView}>
                        <Image style={styles.image1} 
                        source={require('../../../assets/Images/message.png')}/>
                    </View>

                    <View style={styles.input}>
                        <TextInput
                        style={styles.input1}
                        placeholder='Email Address /  Mobile Number'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        maxLength={40}
                        />
                    </View>
                  </View> 
                    <View style={styles.error}>
                      {(errors.email && touched.email) &&
                        <Text style={styles.text1}>{errors.email}</Text>
                        }
                    </View>
                   <View style={[styles.second,{marginTop:10}]}>
                    <View style={styles.imageView}>
                    {showVisible()}
                    </View>
                    <View style={styles.input}>
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
                    <Text style={styles.text1}>{errors.password}</Text>}
                    </View>
                  <View style={styles.main1}>
                  <View style={styles.check}>
                  <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={(newValue) => keepme(newValue)}
                      boxType="square"
                      onFillColor={colors.textColor}
                      tintColors={{ true: colors.textColor, false: colors.textColor }}
                    />
                    <Text style={styles.keep}>Keep me logged in</Text>
                    </View>
                    <Text 
                    onPress={()=>navigation.navigate('Forget')} 
                    style={styles.forgot}>Forget Password ?</Text>
                  </View> 
                <View style={styles.button}>
                    <CustomButton
                     onPress={()=>navigation.navigate('DashBoardPage')}
                  // onPress={()=>errors.password || errors.email?Toast.show('All field required'):handleSubmit()}
                    title='LOG IN'
                    />
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.account}>Don't have an account?</Text>
                    <Text 
                    onPress={()=>navigation.navigate('Register')} 
                    style={styles.account}> Register here</Text>
                </View>
              </View>
         </ScrollView>
         <StatusBar/>
       </View>
        )}
        </Formik>
    )
}
export default Login;
