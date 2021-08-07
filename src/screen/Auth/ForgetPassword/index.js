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
import * as yup from 'yup';
import colors from '../../../component/colors';


const loginValidationSchema=yup.object().shape({
  email:yup.string().email('Please enter valid email').required('Email address is required'),
})
const ForgetPassword=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)

const validateUser=()=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(email)==false){
        Toast.show('Enter Valid Mobile Number')
    }
    else{
        dispatch({
          type: 'Forget_Password_Request',
          url: '',
          mobile,
          navigation: navigation,
        })
      }
}
    return(
      <Formik
      initialValues={{ email: '',password:'' }}
      onSubmit={values => console.log(values.email)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
          <ScrollView>
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
           <View style={styles.main}>
               <View style={styles.card}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/msg.png')}/>
                     <TextInput
                      placeholder='Type your email'
                      style={styles.input1}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      maxLength={40}
                      />
                  </View>
              </View>
              <View style={{width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                <Text style={{color:'#333333'}}>OR</Text>
              </View>
              <View style={styles.card}>
                    <Text style={styles.heading}>Mobile</Text>
                    <View style={styles.input}>
                     <Image source={require('../../../assets/Image/phone.png')}/>
                     <TextInput
                      placeholder='Mobile Number'
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
                <Text style={{fontSize:14,color:'red'}}>{errors.email}</Text>
                }
              </View>
             <View style={styles.button}>
                 <CustomButton
                   title='RESET MY PASSWORD'
                   onPress={()=>errors.email?Toast.show('All field required'):navigation.navigate('Login')}
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
export default ForgetPassword;
