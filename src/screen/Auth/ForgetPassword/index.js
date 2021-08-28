import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import { Formik } from 'formik';
import fontSize from '../../../component/fontSize';
import * as yup from 'yup';
import colors from '../../../component/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const loginValidationSchema=yup.object().shape({
  email:yup.string().email('Please enter valid email'),
  mobile:yup.string(),
})
const ForgetPassword=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [focus,setFocus]=useState(false)
    const [focus1,setFocus1]=useState(false)

const validateUser=(email,mobile)=>{
    if(email && mobile){
       Toast.show('Please Enter Email or Mobile Number')
    }
    else if(email){
         console.log('this is working');
         dispatch({
          type: 'Forget_Password_Request',
          url: 'forgetpassword',
          email,
        })
    }
    else if(mobile){
      console.log('this is working1');
      dispatch({
        type: 'Forget_Password_Request',
        url: 'forgetpassword',
        mobile,
      })
    }
  }
  const showBorder=()=>{
    setFocus(true)
    setFocus1(false)
  }
  const showBorder1=()=>{
    setFocus1(true)
    setFocus(false)
   
  }


    return(
      <Formik
      initialValues={{ email: '',mobile:'' }}
      onSubmit={values => validateUser(values.email,values.mobile)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
          <KeyboardAwareScrollView>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={require('../../../assets/Image/arrowBack.png')}/>
            </TouchableOpacity>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
              <View style={{width:'5%'}}></View>
          </View>
           <View style={styles.main}>
           <View style={[styles.card,{borderColor:focus?colors.bc:'#fff'}]}>
                   {values.email? <Text style={styles.heading}>Email</Text> :null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/msg.png')}/>
                     <TextInput
                      onFocus={()=>setFocus(true)}
                      placeholder='Email Address'
                      style={styles.input1}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      maxLength={40}
                      />
                  </View>
              </View>
              <View style={styles.error}>
                   {(errors.email && touched.email) &&
                <Text style={styles.error1}>{errors.email}</Text>
                }
              </View>
              <View style={{width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:15}}>
                <Text style={{color:colors.textColor}}>OR</Text>
              </View>
              <View style={[styles.card,{borderColor:focus1?colors.bc:'#fff'}]}>
                   {values.mobile? <Text style={styles.heading}>Mobile</Text> :null}
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/phone.png')}/>
                     <TextInput
                      onFocus={()=>setFocus1()}
                      placeholder='Mobile Number'
                      style={styles.input1}
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      maxLength={11}
                      keyboardType={'phone-pad'}
                      />
                  </View>
              </View>
              <View style={styles.error}>
                   {(errors.mobile && touched.mobile) &&
                <Text style={styles.error2}>{errors.mobile}</Text>
                }
              </View>
             <View style={styles.button}>
                 <CustomButton
                   title='RESET MY PASSWORD'
                   onPress={()=>values.email=='' || values.mobile=='' ?Toast.show('Please Enter Email or Mobile Number'):handleSubmit()}
                 />
             </View>
            
           </View>
         </KeyboardAwareScrollView>
         <StatusBar/>
       </View>
         )}
         </Formik>
    )
}
export default ForgetPassword;
