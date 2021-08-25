import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import CustomButton from '../../button1';
import Loader from '../../header';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../AsyncStorage';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../../colors';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Name is required'),
  email:yup.string().email('Please enter valid email').required('Email address is required'),
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[6-9]\d{9}$/,"Please Enter valid Mobile Number"),
  subject:yup.string(),
  message:yup.string()
})

const Support=()=>{
  const dispatch=useDispatch()
  const isFetching=useSelector(state=>state.isFetching)

  const validateUser=async(values)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    console.log('thisi is ',values);
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
      initialValues={{ name: '',email:'',mobile:'',subject:'',message:''}}
      onSubmit={values => validateUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                  <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000',fontSize:15}}>How can we help you?</Text>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={{height:35,color:colors.textColor}}
                         placeholder='Jhon Mathew'
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         value={values.name}
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
                        style={{height:35,color:colors.textColor}}
                         placeholder='Username@gmail.com'
                         onChangeText={handleChange('email')}
                         onBlur={handleBlur('email')}
                         value={values.email}
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
                       style={{height:35,color:colors.textColor}}
                        placeholder='Mobile Number'
                        keyboardType='phone-pad'
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        value={values.mobile}
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
                        style={{height:35,color:colors.textColor}}
                        placeholder=''
                        onChangeText={handleChange('subject')}
                        onBlur={handleBlur('subject')}
                        value={values.subject}
                        />
                    </View>
                    <Text style={styles.better}>Message</Text>
                      <View style={styles.drop1}>
                      <TextInput
                        multiline = {true}
                        style={{height:70,color:colors.textColor}}
                        placeholder=''
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
                </ScrollView>
       </View>
        )}
        </Formik>
    )
}
export default Support;