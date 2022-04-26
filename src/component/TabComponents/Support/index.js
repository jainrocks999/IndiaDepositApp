import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import CustomButton from '../../button1';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../AsyncStorage';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../../colors';
import fontSize from '../../fontSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../component/loader';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be maximum ${max} character`).required('Please enter your name ').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid name"),
  email:yup.string().email('Please enter valid email ').required('Please enter your email '),
  mobile:yup.string().min(10,({})=>'Mobile number must be 10 digit number').required('Please enter your mobile number').matches(/^[0]?[6-9]\d{9}$/,"Please enter valid mobile number"),
  subject:yup.string(),
  message:yup.string()
})

const Support=()=>{
  const dispatch=useDispatch()
  const isFetching=useSelector(state=>state.isFetching)
  const [name1,setName1]=useState('')
  const [email1,setEmail1]=useState('')
  const [mobile1,setMobile1]=useState('')

  useEffect(async()=>{
    const name=await AsyncStorage.getItem(Storage.name)
    const email=await AsyncStorage.getItem(Storage.email)
    const mobile=await AsyncStorage.getItem(Storage.mobile)
    setName1(name)
    setEmail1(email)
    setMobile1(mobile)
  })



  const validateUser=async(values)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
  
    dispatch({
      type: 'Support_Request',
      url: 'support',
      user_id:user_id,
      name:values.name,
      email:values.email,
      mobile:values.mobile,
      subject:values.subject,
      message:values.message
  })
  }

    return(
      <Formik
      initialValues={{ name: name1,email:email1,mobile:mobile1,subject:'',message:''}}
      onSubmit={values => validateUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <KeyboardAwareScrollView
                  extraScrollHeight={10}
                  enableOnAndroid={true} 
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{flex:1}}>
                    {isFetching?<Loader/>:null}
                  <Text style={styles.better1}>How can we help you?</Text>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                          style={{color:colors.textColor}}
                          placeholder='Jhon mathew'
                          placeholderTextColor={colors.heading1}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                    {(errors.name && touched.name) &&
                      <Text style={styles.warn}>{errors.name}</Text>
                      }
                    </View>
                    <Text style={styles.better}>Email</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={{color:colors.textColor}}
                         placeholder='example@domain.com'
                         placeholderTextColor={colors.heading1}
                         onChangeText={handleChange('email')}
                         onBlur={handleBlur('email')}
                         value={values.email}
                         returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                    {(errors.email && touched.email) &&
                      <Text style={styles.warn}>{errors.email}</Text>
                      }
                    </View>
                    <Text style={styles.better}>Mobile Number</Text>
                      <View style={styles.drop}>
                        <TextInput
                       style={{color:colors.textColor}}
                        placeholder='9123456789'
                        placeholderTextColor={colors.heading1}
                        keyboardType='phone-pad'
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        value={values.mobile}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                    {(errors.mobile && touched.mobile) &&
                      <Text style={styles.warn}>{errors.mobile}</Text>
                      }
                    </View>
                    <Text style={styles.better}>Subject</Text>
                      <View style={styles.drop}>
                      <TextInput
                         style={{color:colors.textColor}}
                        placeholder=''
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('subject')}
                        onBlur={handleBlur('subject')}
                        value={values.subject}
                        returnKeyType='done'
                        />
                    </View>
                    <Text style={styles.better}>Message</Text>
                      <View style={styles.drop1}>
                      <TextInput
                        multiline = {true}
                        style={{color:colors.textColor,width:'97%'}}
                        placeholder=''
                        placeholderTextColor={colors.heading1}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={{marginTop:20}}>
                      <CustomButton
                      title='SUBMIT'
                      onPress={()=> handleSubmit()}
                      onChangeText={handleChange('message')}
                      onBlur={handleBlur('message')}
                      value={values.message}
                      />
                    </View>
                    <View style={{marginTop:80}}></View>
                    </KeyboardAwareScrollView>
                </ScrollView>
       </View>
        )}
        </Formik>
    )
}
export default Support;