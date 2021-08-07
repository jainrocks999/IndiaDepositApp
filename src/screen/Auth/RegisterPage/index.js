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
import CheckBox from "@react-native-community/checkbox";


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
    const [toggleCheckBox,setToggleCheckBox]=useState(false)

    
    const validateUser=(name,email,mobile,password)=>{
      console.log('this is your registered data',name,email,mobile,password);
      dispatch({
       type: 'User_Register_Request',
       url: 'adduserdetails',
       name,
       email,
       mobile,
       password,
       mobile_country_code:0,
       father_spouse_name:0,
       mother_maiden_name:0,
       gender:0,
       dob:0,
       pan:0,
       address1:0,
       address2:0,
       city:0,
       state:0,
       country:0,
       pincode:0,
       residential_status:0,
       profile_pic:0,
       education:0,
       occupation:0,
       marital_status:0,
       navigation: navigation,
     })
}

    return(
      <Formik
      initialValues={{ email: '',password:'',name:'',mobile:'',confirm:''}}
      onSubmit={values => validateUser(values.name,values.email,values.mobile,values.password)}
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
                    <Text style={styles.heading}>Full Name</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/profile.png')}/>
                     <TextInput 
                        style={styles.input1}
                        placeholder='Full Name'
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        maxLength={40}
                        />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.name && touched.name) &&
                <Text style={styles.warn}>{errors.name}</Text>
                }
              </View>
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
                    <Text style={styles.heading}>Mobile</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/phone.png')}/>
                     <TextInput 
                      style={styles.input1}
                      placeholder='Mobile'
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      keyboardType={'number-pad'}
                      maxLength={11}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={{fontSize:14,color:'red'}}>{errors.mobile}</Text>
                }
              </View>
              <View style={styles.card}>
                    <Text style={styles.heading}>Password</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      style={styles.input1}
                      placeholder='Password'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.password && touched.password) &&
                <Text style={styles.warn}>{errors.password}</Text>
                }
              </View>
              <View style={styles.card}>
                    <Text style={styles.heading}>Confirm Password</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      style={styles.input1}
                      placeholder='Confim Password'
                      onChangeText={handleChange('confirm')}
                      onBlur={handleBlur('confirm')}
                      value={values.confirm}
                      />
                  </View>
              </View>
              
              <View style={styles.error}>
              {(errors.confirm && touched.confirm) &&
                <Text style={styles.warn}>{errors.confirm}</Text>
                }
              </View>
              {/* <View
               style={{marginTop:0,flexDirection:'row',alignItems:'center'}}>
                 <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#5A4392', false: '#5A4392' }}
                  />
                  <Text style={{fontSize:12,fontFamily:'Montserrat-Normal'}}>Subscribe with newsletter</Text>
              </View> */}
              <View
               style={{flexDirection:'row',alignItems:'center'}}>
                 <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#5A4392', false: '#5A4392' }}
                  />
                  <Text style={{fontSize:12,fontFamily:'Montserrat-Normal',color:colors.textColor}}>{'I agree with Terms & Conditions and Privacy Policy'} </Text>
              </View>

              <View style={styles.button}>
                 <CustomButton
                  onPress={()=>
                    errors.password || errors.email ||
                    errors.name || errors.mobile || errors.confirm?
                    Toast.show('All field required'):
                    handleSubmit()}
                    title='SIGN UP'
                 />
             </View>
             <View style={styles.bottom}>
                 <Text style={styles.account}>Already have an account?</Text>
                 <Text 
                 onPress={()=>navigation.navigate('Login')} 
                 style={styles.account1}> Login here</Text>
             </View>
             <View style={{width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:30}}>
               <Text style={{color:'#333333'}}>OR</Text>
             </View>
             <View style={{width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:0}}>
               <Text style={{fontSize:11,color:'#777777'}}>ENTER REFERRAL CODE</Text>
               <View style={{width:'60%',
               borderWidth:1,
               borderRadius:10,
               borderStyle:'dotted',
               justifyContent:'center',
               alignItems:'center',
               height:40,
               marginTop:10,marginBottom:20
               }}>
               <TextInput
               
               />
               </View>
             </View>
             <View style={[styles.button,{marginBottom:20}]}>
                 <CustomButton
                  // onPress={()=>
                  //   errors.password || errors.email ||
                  //   errors.name || errors.mobile || errors.confirm?
                  //   Toast.show('All field required'):
                  //   handleSubmit()}
                    title='SIGN UP'
                 />
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
