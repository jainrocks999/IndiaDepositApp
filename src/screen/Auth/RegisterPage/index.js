import React,{useState,useEffect,useRef} from 'react';
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
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Please enter your Full Name '),
  email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
  mobile:yup.string().min(10,({})=>'Mobile Number must be 10 digit number').required('Please enter your Mobile number').matches(/^[0]?[6-9]\d{9}$/,"Please enter valid Mobile Number"),
  pin:yup.string().min(4,({min})=>`Pin must be 4 digits`).required('Please enter Pin'),
  confirmPin:yup.string().when("pin", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("pin")],
      "Both pin need to be the same"
    )
  }).required('Please confirm Pin'),
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
    const [visible,setVisible]=useState(true)
    const [visible1,setVisible1]=useState(true)

    const ref=useRef(null)
    const ref1=useRef(null)
    const ref2=useRef(null)
    const ref3=useRef(null)
    const ref4=useRef(null)

  
    const validateUser=async(name,email,mobile,pin)=>{
      const device_type= DeviceInfo.getSystemName()
      let token=await AsyncStorage.getItem(Storage.token);
      console.log('testing',device_type,token);
      if( toggleCheckBox==false ){
        Toast.show('Please Confirm Terms and Condition')
      }
      else{
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
       device_token:token,
       device_type:device_type
    })
  }
}

const showVisible=()=>{
  return(
    <TouchableOpacity 
     
        onPress={()=>visible?setVisible(false):setVisible(true)}>
        {!visible?<Image 
        style={{width:24,height:24,marginLeft:'25%'}} 
        source={require('../../../assets/Image/eye.png')}/>:
        <Image style={{width:24,height:24,marginLeft:'25%'}} 
        source={require('../../../assets/Image/eye1.png')}/>
      }
      </TouchableOpacity>
    )
  }    
const showVisible1=()=>{
    return(
      <TouchableOpacity 
          onPress={()=>visible1?setVisible1(false):setVisible1(true)}>
          {!visible1?<Image 
          style={{width:24,height:24,marginLeft:'25%'}} 
          source={require('../../../assets/Image/eye.png')}/>:
          <Image style={{width:24,height:24,marginLeft:'25%'}} 
          resizeMode='contain'
          source={require('../../../assets/Image/eye1.png')}/>
        }
        </TouchableOpacity>
      )
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
         <ScrollView>
         <KeyboardAwareScrollView
        extraScrollHeight={10}
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
              <View style={[styles.card,{borderColor:fBorder?colors.bc:'white'}]}>
                  <Text style={styles.heading}>Full Name</Text>
                    <View style={styles.input}>
                     <Image style={styles.image} source={require('../../../assets/Image/profile.png')}/>
                     <TextInput 
                        onFocus={()=>setFBorder(true)}
                        style={[styles.input1,{marginLeft:10}]}
                        placeholder='John Methew'
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        maxLength={40}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                          ref.current.focus()
                        }}
                        //blurOnSubmit={false}
                        />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.name && touched.name) &&
                <Text style={styles.warn}>{errors.name}</Text>
                }
              </View>
              <View style={[styles.card,{borderColor:eBorder?colors.bc:'white'}]}>
                  <Text style={styles.heading}>Email</Text>
                    <View style={styles.input}>
                     <Image
                     style={styles.image}
                      source={require('../../../assets/Image/msg.png')}/>
                     <TextInput 
                      ref={ref}
                      onFocus={()=>setEBorder(true)}
                      style={styles.input1}
                      placeholder='example@domain.com'
                      placeholderTextColor={colors.heading1}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      maxLength={40}
                      returnKeyType='next'
                      onSubmitEditing={() => {
                        ref1.current.focus()
                      }}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.email && touched.email) &&
                <Text style={styles.warn}>{errors.email}</Text>
                }
              </View>
              <View style={[styles.card,{borderColor:mBorder?colors.bc:'white'}]}>
                   <Text style={styles.heading}>Mobile</Text>
                    <View style={styles.input}>
                     <Image 
                     style={styles.image}
                     source={require('../../../assets/Image/phone.png')}/>
                     <TextInput 
                      ref={ref1}
                      onFocus={()=>setMBorder(true)}
                      style={styles.input1}
                      placeholder='9123456789'
                      placeholderTextColor={colors.heading1}
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      keyboardType={'number-pad'}
                      maxLength={11}
                      returnKeyType='next'
                      onSubmitEditing={() => {
                        ref2.current.focus()
                      }}
                      />
                  </View>
              </View>
              <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={styles.warn}>{errors.mobile}</Text>
                }
              </View>
              <View style={styles.view2}>
                <View style={styles.view1}>
                <View style={[styles.card1,{borderColor:pBorder?colors.bc:'white'}]}>
                  <Text style={styles.heading}>Set Your Pin</Text>
                    <View style={styles.input}>
                     <Image 
                     style={styles.image}
                     source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      ref={ref2}
                      onFocus={()=>setPBorder(true)}
                      style={[styles.input2]}
                      placeholder='0000'
                      placeholderTextColor={colors.heading1}
                      onChangeText={handleChange('pin')}
                      onBlur={handleBlur('pin')}
                      value={values.pin}
                      keyboardType={'number-pad'}
                      returnKeyType='next'
                      maxLength={4}
                      onSubmitEditing={() => {
                        ref3.current.focus()
                      }}
                      secureTextEntry={visible}
                       />
                     
                       {showVisible()}
                     
                    </View>
                  </View>
                  <View style={styles.error}>
                {(errors.pin && touched.pin) &&
                  <Text style={styles.warn}>{errors.pin}</Text>}
                </View>
                </View>
                <View  style={styles.view1}>
                <View style={[styles.card1,{borderColor:cBorder?colors.bc:'white'}]}>
                   <Text style={styles.heading}>Confirm Pin</Text>
                    <View style={styles.input}>
                     <Image
                     style={styles.image}
                     source={require('../../../assets/Image/lock.png')}/>
                     <TextInput 
                      ref={ref3}
                      onFocus={()=>setCBorder(true)}
                      style={[styles.input2]}
                      placeholder='0000'
                      placeholderTextColor={colors.heading1}
                      onChangeText={handleChange('confirmPin')}
                      onBlur={handleBlur('confirmPin')}
                      maxLength={4}
                      value={values.confirmPin}
                      keyboardType={'number-pad'}
                      returnKeyType='next'
                      onSubmitEditing={() => {
                        ref4.current.focus()
                      }}
                       secureTextEntry={visible1}
                       />
                        {showVisible1()}
                    </View>
                  </View>
                  <View style={styles.error}>
                {(errors.confirmPin && touched.confirmPin) &&
                  <Text style={styles.warn}>{errors.confirmPin}</Text>}
                </View>
                </View>
              </View>
             
              <View style={[styles.card,{borderColor:bBorder?colors.bc:'white'}]}>
                   <Text style={styles.heading}>Enter Referral Code (Optional)</Text>
                    <View style={styles.input}>
                     <TextInput 
                     ref={ref4}
                      onFocus={()=>setBBorder(true)}
                      style={[styles.input1,{marginLeft:-3,}]}
                      placeholder='BA52RT'
                      placeholderTextColor={colors.heading1}
                      onChangeText={handleChange('referal')}
                      value={values.referal}
                      returnKeyType='done'
                      
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
                  <Text style={styles.agree}>
                    {'I agree with '}
                    <Text style={styles.agree1}>{`Terms & Conditions`}</Text>
                    <Text> and </Text>
                    <Text style={styles.agree1}>{`Privacy Policy`}</Text>
                    
                     </Text>
              </View>
              <View style={styles.button}>
                 <CustomButton
                  onPress={()=>
                  // navigation.navigate('Main')
                 handleSubmit()
                  }
                    title='SIGN UP'
                 />
             </View>
             <View style={[styles.bottom]}>
                 <Text style={styles.account}>Already have an account?</Text>
                 <Text 
                 onPress={()=>navigation.navigate('Login')} 
                 style={styles.account1}> Login here</Text>
             </View>
          </View>
          </View>
         </KeyboardAwareScrollView>
         </ScrollView>
         <StatusBar/>
       </View>
         )}
         </Formik>
    )
}
export default RegisterPage;
