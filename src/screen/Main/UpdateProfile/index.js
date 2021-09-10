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
import { Formik } from 'formik';
import * as yup from 'yup';

const loginValidationSchema=yup.object().shape({
   name:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Please enter your  Name '),
   father:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Please enter your Father/Spouse Name '),
   mother:yup.string().max(40,({max})=>`Name must be only ${max} character`).required('Please enter your Mother/Maiden Name'),
   email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
   gender:yup.string(),
   dob:yup.string(),
 })
const data=[
   { label: 'Male', value: 'Male' },
   { label: 'Female', value: 'Female' },
   { label: 'Others', value: 'Others'}]
 

const RegisterPage=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [name,setName]=useState(route.params.name)
    const [mother,setMName]=useState(route.params.mother)
    const [father,setFName]=useState(route.params.father)
    const [email,setEmail]=useState(route.params.email)
    const [gender, setGender] = useState(route.params.gender);
    const [dob, setDob] = useState(route.params.dob);


   const validateUser=async(name,email,gender,dob,mother,father)=>{
      // const user_id=await AsyncStorage.getItem(Storage.user_id)
      // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // if(name==''){
      //    Toast.show('Name required')
      // }
      // else if(reg.test(email)==false){
      //    Toast.show('Gmail required')
      //    return false
      // }
      // else if(father==''){
      //    Toast.show('Father/Spouse Name required')
      // }
      // else if(mother==''){
      //    Toast.show('Mother Maiden Name required')
      // }
      // else if(gender==''){
      //    Toast.show('Gender required')
      // }
      // else if(dob==''){
      //    Toast.show('Date of Birth required')
      // }
     // else{
      dispatch({
      type: 'Edit_Profile_Request',
      url: 'editprofile',
      user_id,
      name:name,
      email:email,
      father_spouse_name:father,
      mother_maiden_name:mother,
      dob:dob,
      gender:gender
       })
    // }
   }

         return(
            <Formik
            initialValues={{name:'',father:'', mother:'',gender:'',dob:'',email: '',}}
            onSubmit={values => validateUser(values.name,values.email,values.mother,values.father,values.gender,values.dob)}
            validateOnMount={true}
            validationSchema={loginValidationSchema}
          >
              {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
               <View style={styles.container}>
                  <Header
                     source={require('../../../assets/Images/arrow.png')}
                     title='EDIT PROFILE'
                     onPress={()=>navigation.push('Main')}
                  />
               { isFetching?<Loader/>:null}
                  <ScrollView style={styles.scroll}>
                     <View style={styles.main}>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Jhon Mathew'
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         value={values.name}
                         maxLength={40}
                         returnKeyType='next'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.name && touched.name) &&
                      <Text style={styles.warn}>{errors.name}</Text>
                      }
                    </View>
                   </View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Father/Spouse Name'
                        //  defaultValue={father==0?'':father}
                         onChangeText={handleChange('father')}
                         onBlur={handleBlur('father')}
                         value={values.father}
                         maxLength={40}
                         returnKeyType='next'
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
                        //defaultValue={mother==0?'':mother}
                        onChangeText={handleChange('mother')}
                        onBlur={handleBlur('mother')}
                        value={values.mother}
                        maxLength={40}
                        returnKeyType='next'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.mother && touched.mother) &&
                      <Text style={styles.warn}>{errors.mother}</Text>
                      }
                    </View>
                    <View style={styles.view2}>
                        <View style={styles.view3}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>
                               <RNPickerSelect
                                          onValueChange={handleChange('gender')}
                                          onOpen={handleBlur('gender')}
                                          items={data}
                                         style={{ 
                                         inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                                         placeholder:{color:colors.textColor}
                                         }}
                                         value={values.gender}
                                         returnKeyType='next'
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select", value: null }}
                                         Icon={()=>
                                         <Image style={{margin:12}} 
                                         source={require('../../../assets/Image/down.png')}/>}
                                   />

                            </View>
                        </View>
                        
                        <View style={styles.view3}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.dropCal}>
                              <View style={{width:'80%',marginLeft:0}}>
                               <DatePicker
                                  //  style={{width: '100%',}}
                                  date={values.dob}
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
                                      onDateChange={handleChange('dob')}
                                        
                                    // onBlur={handleBlur('dob')} 
                                    // value={values.dob}
                                    // returnKeyType='next'                               
                                  /> 
                                  </View>
                                  <Image  
                                    source={require('../../../assets/Image/down.png')}/>
                            </View>
                        </View>
                       
                    </View>
                   
                    <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='example@gmail.com'
                        defaultValue={email}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        value={values.email}
                        maxLength={40}
                        
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.email && touched.email) &&
                      <Text style={styles.warn}>{errors.email}</Text>
                      }
                    </View>
                    <View style={styles.view1}>
                     <CustomButton
                     title='UPDATE'
                     onPress={()=> handleSubmit()}
                     />
                    </View>
                    </KeyboardAwareScrollView>
                    </View>
                    </ScrollView>
                  
                 <StatusBar/>
             </View>
         
         )}
         </Formik>
    )
}
export default RegisterPage;
