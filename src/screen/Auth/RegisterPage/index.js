import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../../../component/colors';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Name is required'),
  email:yup.string().email('Please enter valid email').required('Email address is required'),
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[789]\d{9}$/,"Please Enter valid Mobile Number"),
  password:yup.string().min(8,({min})=>`Password must be atleast ${min} charrecter`).
  required('Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirm:yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
  }).
  required('Confirm Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
})


const RegisterPage=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    
    const validateUser=()=>{
      Toast.show('Registration Successfull')
      navigation.navigate('Otp')
    }
    return(
      <Formik
      initialValues={{ email: '',password:'',name:'',password:'',confirm:''}}
      onSubmit={values => validateUser()}
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
               <Text style={styles.text}>SIGN UP</Text>
           </View>
           <View style={styles.main}>
            <View style={styles.mainCon}>
            <View style={styles.view1}>
              <TextInput 
              style={styles.input1}
              placeholder='Full Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.name && touched.name) &&
                <Text style={styles.warn}>{errors.name}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
             
              <TextInput 
              style={styles.input1}
              placeholder='Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/message.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.email && touched.email) &&
                <Text style={styles.warn}>{errors.email}</Text>
                }
              </View>
            <View style={[styles.view2,{marginTop:10}]}>
              <View style={styles.mobile}>
                <Text style={{color:colors.textColor}}>+91</Text>
              </View>
              <View style={styles.view3}>
              <TextInput 
              style={styles.input2}
              placeholder='Mobile'
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType={'number-pad'}
              maxLength={11}
              />
              <Image style={{marginRight:10}} 
              source={require('../../../assets/Images/mobile.png')}/>
              </View>
            </View>
            <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={{fontSize:14,color:'red'}}>{errors.mobile}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Password'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              />
              <Image source={require('../../../assets/Images/lock.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.password && touched.password) &&
                <Text style={styles.warn}>{errors.password}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Confim Password'
              onChangeText={handleChange('confirm')}
              onBlur={handleBlur('confirm')}
              value={values.confirm}
              />

              <Image source={require('../../../assets/Images/lock.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.confirm && touched.confirm) &&
                <Text style={styles.warn}>{errors.confirm}</Text>
                }
              </View>
            </View>
             <View style={styles.button}>
                 <CustomButton
                  onPress={()=>errors.password || errors.email ||
                    errors.name || errors.mobile || errors.confirm?
                    Toast.show('All field required'):handleSubmit()}
                 title='REGISTER NOW'
                 />
             </View>
             <View style={styles.bottom}>
                 <Text style={styles.account}>Already have an account?</Text>
                 <Text 
                 onPress={()=>navigation.navigate('Login')} 
                 style={styles.account}> Login here</Text>
             </View>
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
         )}
         </Formik>
    )
}
export default RegisterPage;
