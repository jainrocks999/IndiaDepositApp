import React,{useState,useRef} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../../component/colors';
import Header from '../../../component/compareHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../component/button1';
import Loader from '../../../component/loader';
import fontSize from '../../../component/fontSize';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginValidationSchema=yup.object().shape({
   name:yup.string().max(40,({max})=>`Name must be maximum ${max} character`)
   .required('Please enter your Full Name ').matches( /^[^.,*+!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Name"),
   father:yup.string().max(40,({max})=>`Father name must be maximum ${max} character`)
   .required('Please enter your Father Name ').matches( /^[^!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Father name"),
   mother:yup.string().max(40,({max})=>`Mother name must be maximum ${max} character`)
   .required('Please enter your Mother Name ').matches( /^[^!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Mother name"),
   email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
 })
const data=[
   { label: 'Male', value: 'Male' },
   { label: 'Female', value: 'Female' },
   { label: 'Others', value: 'Others'}]
 

const RegisterPage=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
   //  const [name,setName]=useState(route.params.name)
   //  const [mother,setMName]=useState(route.params.mother)
   //  const [father,setFName]=useState(route.params.father)
    const [email,setEmail]=useState(route.params.email)
    const [gender, setGender] = useState(route.params.gender);
    const [dob, setDob] = useState(route.params.dob);
    
   const validateUser=async(values)=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      if(gender==''){
         Toast.show('Please select gender')
      }
      else if(dob==''){
         Toast.show('Please select date of birth')
      }
      else{
      dispatch({
      type: 'Edit_Profile_Request',
      url: 'editprofile',
      user_id,
      name:values.name,
      email:values.email,
      father_spouse_name:values.father,
      mother_maiden_name:values.mother,
      dob:dob,
      gender:gender,
      navigation:navigation
       })
     }
   }

         return(
            <Formik
            initialValues={{ 
               name:route.params.name==0?'':route.params.name,
               father:route.params.father==0?'':route.params.father,
               mother:route.params.mother==0?'':route.params.mother,
               email:route.params.email==0?'':route.params.email
            }}
            onSubmit={values => validateUser(values)}
            validateOnMount={true}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
               <View style={styles.container}>
                  <Header
                     source={require('../../../assets/Images/arrow.png')}
                     title='EDIT PROFILE'
                     onPress={()=>navigation.push('Profile')}
                  />
               { isFetching?<Loader/>:null}
                  <ScrollView style={styles.scroll}>
                  <KeyboardAwareScrollView
                     extraScrollHeight={10}
                     enableOnAndroid={true} 
                     keyboardShouldPersistTaps='handled'
                     contentContainerStyle={{flex:1}}>
                     <View style={styles.main}>
               
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Jhon Mathew'
                         value={values.name}
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         keyboardType='default'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.name && touched.name) &&
                        <Text style={styles.warn}>{errors.name}</Text>
                        }
                     </View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Father/Spouse Name'
                         value={values.father}
                         onChangeText={handleChange('father')}
                         onBlur={handleBlur('father')}
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.father && touched.father) &&
                        <Text style={styles.warn}>{errors.father}</Text>
                        }
                     </View>
                    <Text style={styles.better}>Mother Maiden Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Mother Maiden Name'
                        defaultValue={values.mother}
                        onChangeText={handleChange('mother')}
                        onBlur={handleBlur('mother')}
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.mother && touched.mother) &&
                        <Text style={styles.warn}>{errors.mother}</Text>
                        }
                     </View>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between',width:'100%'}}>
                        <View style={{width:'47%'}}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>
                               <RNPickerSelect
                                         onValueChange={(val)=>setGender(val)}
                                         items={data}
                                         style={{ 
                                         inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                                         placeholder:{color:colors.heading1,width:'100%'}
                                         }}
                                         value={gender}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select", value: null }}
                                         Icon={()=>
                                          <Image 
                                         style={{marginLeft:12,width:25,height:9,marginTop:11}} 
                                        source={require('../../../assets/Image/down.png')}/>}   
                                   />
                            </View>
                        </View>
                       
                        <View style={{width:'47%',}}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.dropCal}>
                              <View style={{width:'80%',marginLeft:0}}>
                               <DatePicker
                                  //  style={{width: '100%',}}
                                     date={dob=='0000-00-00'?'':dob}
                                     mode="date"
                                     placeholder="Date Of Birth"
                                     format="YYYY-MM-DD"
                                     maxDate={new Date()}
                                     confirmBtnText="Confirm"
                                     cancelBtnText="Cancel"
                                     customStyles={{
                                     placeholderText:{color:'grey'},
                                     dateIcon: {
                                      width:0,
                                      height:0,
                                       },
                                     dateInput: {
                                      marginLeft:-40,
                                      borderWidth:0,
                                       },
                                      dateText:{
                                        color:colors.textColor
                                        }
                                      }}
                                      onDateChange={(date)=> setDob(date)}                                   
                                  /> 
                                  </View>
                                  <Image style={{marginLeft:0,width:25,height:9,marginTop:0}} 
                                    source={require('../../../assets/Image/down.png')}/>
                            </View>
                        </View>
                    </View>
                   
                    <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='example@gmail.com'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        editable={false}
                        
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        }
                     </View>
                    <View style={{paddingVertical:30,marginBottom:10}}>
                     <CustomButton
                     title='UPDATE'
                     onPress={()=>handleSubmit()}
                     />
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
