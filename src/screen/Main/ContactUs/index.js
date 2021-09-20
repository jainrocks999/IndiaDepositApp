import React,{useRef} from 'react';
import { View,Text,Image,ScrollView,Linking,TouchableOpacity,TextInput,Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import Button from '../../../component/button1';
import { Formik } from 'formik';
import * as yup from 'yup';
import BottomTab from '../../../component/StoreButtomTab';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import fontSize from '../../../component/fontSize';
const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Please enter your Name '),
  email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
  mobile:yup.string().min(10,({})=>'Mobile Number must be 10 digit number').required('Please enter your Mobile number').matches(/^[0]?[6-9]\d{9}$/,"Please enter valid Mobile Number"),
  message:yup.string()
})

const Contact=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const next1 = useRef(null);
    const next2 = useRef(null);
    const next3 = useRef(null);
    

  const validateUser=async(values)=>{
   const user_id=await AsyncStorage.getItem(Storage.user_id)
   Keyboard.dismiss()
    dispatch({
      type: 'Contact_Us_Request',
      url: 'contact',
      user_id:user_id,
      name:values.name,
      email:values.email,
      mobile:values.mobile,
      message:values.message
  })
  }
    return(
      <Formik
      initialValues={{ email: '',mobile:'',name:'',message:''}}
      onSubmit={values => validateUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
          <Header 
          title='CONTACT US'
          source={require('../../../assets/Images/arrow.png')}
          onPress={()=>navigation.goBack()}
          />
          <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
            <View style={styles.card}>
            
            <View style={styles.header}>
              <Text style={styles.toll}>TOLL FREE NUMBER</Text>
              <View style={[styles.view,{ marginTop:21}]}>
                  <Text style={styles.num}>1800000000</Text>
                    <TouchableOpacity 
                    onPress={()=>Linking.openURL(`tel:1800000000`)}
                    style={styles.button}>
                        <Image 
                        style={{width:16,height:20}}
                        source={require('../../../assets/Image/call.png')}/>
                        <Text style={styles.call}>CALL</Text>
                    </TouchableOpacity>
              </View>
              <View style={[styles.view,{ marginTop:16}]}>
                  <Text style={styles.num}>18110000000</Text>
                    <TouchableOpacity
                    onPress={()=>Linking.openURL(`tel:18110000000`)}
                    style={styles.button}>
                        <Image
                         style={{width:16,height:20}}
                        source={require('../../../assets/Image/call.png')}/>
                        <Text style={styles.call}>CALL</Text>
                    </TouchableOpacity>
              </View>
            </View>
           
            <View style={styles.line}></View>
            <View style={styles.main}>
              <Text style={styles.toll}>FOLLW US ON</Text>
               <View style={styles.bottom}>
                <View style={styles.view1}>
                  <View style={styles.view2}>
                      <View style={styles.fb}>
                      <Image source={require('../../../assets/Images/fb.png')}/>
                      </View>
                      <Text style={styles.text1}>@indiadeposit</Text>
                  </View>
                  <View style={styles.view2}>
                      <View style={styles.fb}>
                      <Image source={require('../../../assets/Images/in.png')}/>
                      </View>
                      <Text style={styles.text1}>@indiadeposit</Text>
                  </View>
               </View>
               <View style={[styles.view1,{marginTop:20}]}>
               <View style={styles.view2}>
                      <View style={styles.fb}>
                      <Image source={require('../../../assets/Images/twitter.png')}/>
                      </View>
                      <Text style={styles.text1}>@indiadeposit</Text>
               </View>
               <View style={styles.view2}>
                    <View style={styles.fb}>
                    <Image source={require('../../../assets/Images/insta.png')}/>
                    </View>
                    <Text style={styles.text1}>@indiadeposit</Text>
               </View>
               </View>
               </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.main}>
              <Text style={styles.toll}>WRITE US ON EMAIL</Text>
               <View style={{marginTop:18}}>
                 <Text style={styles.india}>customercare@indiadeposit</Text>
               </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.main}>
              <Text style={styles.toll}>GET IN TOUCH</Text>
              <View style={{marginTop:20}}>
              <View style={styles.input}>
                <TextInput
                
                style={{color:colors.textColor}}
                placeholder='Name'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                maxLength={40}
                returnKeyType='next'
                onSubmitEditing={() => {
                  next1.current.focus()
                }}
                blurOnSubmit={false}
                />
              </View>
              <View style={styles.error}>
              {(errors.name && touched.name) &&
                <Text style={styles.warn}>{errors.name}</Text>
                }
              </View>
              <View style={[styles.input,{marginTop:15}]}>
              <TextInput
                ref={next1}
                style={{color:colors.textColor}}
                placeholder='example@domain.com'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                maxLength={40}
                returnKeyType='next'
                onSubmitEditing={() => {
                  next2.current.focus()
                }}
                blurOnSubmit={false}
                />
              </View>
              <View style={styles.error}>
              {(errors.email && touched.email) &&
                <Text style={styles.warn}>{errors.email}</Text>
                }
              </View>
              <View style={[styles.input,{marginTop:15}]}>
              <TextInput
                ref={next2}
                style={{color:colors.textColor}}
                placeholder='9123456789'
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                keyboardType={'number-pad'}
                maxLength={11}
                returnKeyType='next'
                onSubmitEditing={() => {
                  next3.current.focus()
                }}
                blurOnSubmit={false}
                />
               
              </View>
              <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={styles.warn}>{errors.mobile}</Text>
                }
              </View>
              <View style={[styles.input1,{marginTop:15,marginBottom:20}]}>
              <TextInput
                ref={next3}
                style={{color:colors.textColor}}
                placeholder='Message / Report for Crash'
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                value={values.message}
                 multiline={true}
              
                // onSubmitEditing={() => {
                //   handleSubmit()
                // }}
                // blurOnSubmit={false}
                />
              </View>
              
             </View>
              <View style={{marginBottom:30}}>
                <Button
                onPress={()=>handleSubmit()}
                title='SUBMIT'
                />
              </View>
            </View>
            </View>
         </ScrollView>
         <StatusBar/>
       </View>
        )}
        </Formik>
    )
}
export default Contact;
                         