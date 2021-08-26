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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fontSize from '../../../component/fontSize';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Name is required'),
  email:yup.string().email('Please enter valid email').required('Email address is required'),
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[6-9]\d{9}$/,"Please Enter valid Mobile Number"),
  pin:yup.string().required('Pin required'),
  confirmPin:yup.string().when("pin", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("pin")],
      "Both pin need to be the same"
    )
  }).required('Confirm Pin required'),
  referal:yup.string(),
})

const RegisterPage=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const [fBorder,setFBorder]=useState(false)
    const [eBorder,setEBorder]=useState(false)
    const [mBorder,setMBorder]=useState(false)
    const [pBorder,setPBorder]=useState(false)
    const [cBorder,setCBorder]=useState(false)
    const [bBorder,setBBorder]=useState(false)
  
    const validateUser=(name,email,mobile,pin)=>{
      console.log('this is your registered data',name,email,mobile,pin);
      dispatch({
       type: 'User_Register_Request',
       url: 'adduserdetails',
       name,
       email,
       mobile,
       pin,
       refferal_code:0,
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
      initialValues={{ email: '',mobile:'',name:'',pin:'',confirmPin:'',referal:''}}
      onSubmit={values => validateUser(values.name,values.email,values.mobile,values.pin)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
         <KeyboardAwareScrollView 
        
          >
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image style={styles.image} 
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
          <View style={styles.main}>
              <View style={[styles.card,{borderColor:fBorder?colors.bc:'white'}]}>
                   {values.name? <Text style={styles.heading}>Full Name</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/profile.png')}/>
                     <TextInput 
                        onFocus={()=>setFBorder(true)}
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
              <View style={[styles.card,{borderColor:eBorder?colors.bc:'white'}]}>
                   {values.email? <Text style={styles.heading}>Email</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/msg.png')}/>
                     <TextInput 
                      onFocus={()=>setEBorder(true)}
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
              <View style={[styles.card,{borderColor:mBorder?colors.bc:'white'}]}>
                   {values.mobile? <Text style={styles.heading}>Mobile</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/phone.png')}/>
                     <TextInput 
                      onFocus={()=>setMBorder(true)}
                      style={styles.input1}
                      placeholder='Mobile'
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      keyboardType={'phone-pad'}
                      maxLength={11}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={{fontSize:fontSize.fourteen,color:'red'}}>{errors.mobile}</Text>
                }
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:'47%'}}>
                <View style={[styles.card1,{borderColor:pBorder?colors.bc:'white'}]}>
                   {values.pin? <Text style={styles.heading}>Set Your Pin</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      onFocus={()=>setPBorder(true)}
                      style={styles.input2}
                      placeholder='Set Your Pin'
                      onChangeText={handleChange('pin')}
                      onBlur={handleBlur('pin')}
                      value={values.pin}
                      keyboardType={'number-pad'}
                       />
                    
                    </View>
                  </View>
                  <View style={styles.error}>
                {(errors.pin && touched.pin) &&
                  <Text style={styles.warn}>{errors.pin}</Text>}
                </View>
                </View>
                <View  style={{  width:'47%'}}>
                <View style={[styles.card1,{borderColor:cBorder?colors.bc:'white'}]}>
                   {values.confirmPin? <Text style={styles.heading}>Confirm Pin</Text>:null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      onFocus={()=>setCBorder(true)}
                      style={styles.input1}
                      placeholder='Confirm Pin'
                      onChangeText={handleChange('confirmPin')}
                      onBlur={handleBlur('confirmPin')}
                      value={values.confirmPin}
                      keyboardType={'number-pad'}
                       />
                    </View>
                  </View>
                  <View style={styles.error}>
                {(errors.confirmPin && touched.confirmPin) &&
                  <Text style={styles.warn}>{errors.confirmPin}</Text>}
                </View>
                </View>
              </View>
             
              <View style={[styles.card,{borderColor:bBorder?colors.bc:'white'}]}>
                   {values.referal? <Text style={styles.heading}>Enter Referral Code</Text>:null}
                    <View style={styles.input}>
                     <TextInput 
                       onFocus={()=>setBBorder(true)}
                      style={[styles.input1,{marginLeft:-3,}]}
                      placeholder='BA52RT'
                      onChangeText={handleChange('referal')}
                     // onBlur={handleBlur('referal')}
                      value={values.referal}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.referal && touched.referal) &&
                <Text style={styles.warn}>{errors.referal}</Text>
                }
              </View>
              <View
               style={{flexDirection:'row',alignItems:'center'}}>
                 <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#5A4392', false: '#5A4392' }}
                  />
                  <Text style={styles.agree}>{'I agree with Terms & Conditions and Privacy Policy'} </Text>
              </View>
              <View style={styles.button}>
                 <CustomButton
                  onPress={()=>
                    errors.password || errors.email ||
                    errors.name || errors.mobile || errors.confirm?
                    Toast.show('All field required'):
                    toggleCheckBox==false? Toast.show('Please Confirm Terms and Condition') :
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
          </View>
         </KeyboardAwareScrollView>
         <StatusBar/>
       </View>
         )}
         </Formik>
    )
}
export default RegisterPage;
