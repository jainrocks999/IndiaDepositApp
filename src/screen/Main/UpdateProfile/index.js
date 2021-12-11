import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView,TextInput,Platform,BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
// import DatePicker from 'react-native-datepicker';
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
import  DatePicker  from "react-native-date-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from "axios";

const loginValidationSchema=yup.object().shape({
   name:yup.string().max(40,({max})=>`Name must be maximum ${max} character`)
    .required('Please enter your Full Name ').matches( /^[^.,*+!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Name"),
   father:yup.string().max(40,({max})=>`Father name must be maximum ${max} character`)
   .required('Please enter your Father/Spouse Name').matches( /^[^!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Father/Spouse Name"),
   mother:yup.string().max(40,({max})=>`Mother name must be maximum ${max} character`)
   .required('Please enter your Mother Maiden Name ').matches( /^[^!0-9-\/:-@\[-`{-~]+$/,"Please enter valid Mother Maiden Name"),
   email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
   pan:yup.string(''),
   // .required('Please enter pan number').matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,'Please enter valid PAN'),
   mobile:yup.string(''),
   // .required('Please enter mobile number'),
   addressLine1:yup.string(''),
   // .required('Please enter address line1'),
   addressLine2:yup.string(''),
   // .required('Please enter address line2'),
   pincode:yup.string(''),
   // .required('Please enter pincode'),
   occupation:yup.string('')
 })

const RegisterPage=({route})=>{
    const userDetail=useSelector(state=>state.UserData)
    const CountryList=useSelector(state=>state.CountryList)
    const user=userDetail[0]
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [gender, setGender] = useState(user.gender);
    const [dob, setDob] = useState(user.dob);
    const [city,setCity]=useState(`${user.city}`)
    const [state,setState]=useState(`${user.state}`)
    const [country,setCountry]=useState('')
    const [income_group,setIncome_group]=useState(user.income_group)
    const [education,setEducation]=useState(user.education)
    const [marital_status,setMarital_status]=useState(user.marital_status)
    const [residential_address,setResidential_address]=useState(user.residential_status)
    const [occupation,setOccupation]=useState(user.occupation==0||null?'':user.occupation) 
    const [open,setOpen]=useState(false)
    const [date, setDate] = useState(new Date())
    const selector1=useSelector(state=>state.StateList)
    const selector2=useSelector(state=>state.CityList)
    console.log('this is date'
    );

   const value1= date.toISOString().split('T')[0]  
   const [yyyy ,mm ,dd]=value1.split('-')
    const value=`${dd}-${mm}-${yyyy}`
    useEffect(()=>{
      const backAction = () => {
         navigation.goBack()
         return true;
       };
     
       const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         backAction
       );
     
       return () => backHandler.remove();
   },[])
    const validateUser=async(values)=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      if(gender==0||gender==''||gender==null){
         Toast.show('Please select gender')
      }
      else if(value==''){
         Toast.show('Please select date of birth')
      }
      // else if(occupation==0||''){
      //    Toast.show('Please select occupation')
      // }
      // else if(occupation=='Others'&& values.occupation==''){
      //       Toast.show('Please specify occupation')
      // }
      // else if(country==0||country==''){
      //    Toast.show('Please select country name')
      // }
      // else if(state==0||state==''){
      //    Toast.show('Please select state name')
      // }
      // else if(city==0||city==''){
      //    Toast.show('Please select city name')
      // }
      // else if(income_group==0||''){
      //    Toast.show('Please select income group')
      // }
      // else if(education==0||''){
      //    Toast.show('Please select education')
      // }
      // else if(marital_status==0||''){
      //    Toast.show('Please select marital status')
      // }
      // else if(residential_address==0||''){
      //    Toast.show('Please select residential status')
      // }
     
      else{
         console.log('this sissdldskfl;dskfl;dkfl;dkfl;d',gender,value);
      dispatch({
            type: 'Edit_Profile_Request',
            url: 'editprofile',
            user_id,
            name:values.name,
            email:values.email,
            father_spouse_name:values.father,
            mother_maiden_name:values.mother,
            dob:value,
            gender:gender,
            pan:values.pan,
            mobile:values.mobile,
            address1:values.addressLine1,
            address2:values.addressLine2,
            city:city,
            state:state,
            country:country,
            pincode:values.pincode,
            marital_status:marital_status,
            occupation:occupation=='Others'?values.occupation:occupation,
            income_group:income_group,
            education:education,
            residential_status:residential_address,
            navigation:navigation,
       })
     }
   }

   const manageState=async(val)=>{
      setState(val)
      dispatch({
         type: 'City_List_Request',
         url: 'citybyid',
         state_id:val,
         
       })
   }
   const manageCountry=async(val)=>{
      setCountry(val)
      dispatch({
         type: 'State_List_Request',
         url: 'statebyid',
         country_id:val,
         
       })
   }
const manageVerification=async()=>{
   const user_id=await AsyncStorage.getItem(Storage.user_id)
   try {
      console.log('this.ssdlfks;k',user.email);
      const data = new FormData();
      data.append('email',user.email)
      data.append('user_id',user_id)
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',    
        },
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/sendemail',         
      });
      if (response.data.status==200) { 
         console.log('this is userresponse narendra pal ram  pratap pal this is not a value in the your village to do a',response);
       Toast.show('An email has been send to your registered email,Please check and verify',Toast.LONG)
      } 
    } catch (error) {
    
    }
}
         return(
            <Formik
            initialValues={{ 
               name:user.name==0||user.name==null?'':user.name,
               father:user.father_spouse_name==0||user.father_spouse_name==null?'':user.father_spouse_name,
               mother:user.mother_maiden_name==0||user.mother_maiden_name==null?'':user.mother_maiden_name,
               email:user.email==0||user.email==null?'':user.email,
               pan:user.pan==0||user.pan==null?'':user.pan,
               addressLine1:user.address1==0||user.address1==null?'':user.address1,
               addressLine2:user.address2==0||user.address2==null?'':user.address2,
               mobile:user.mobile==0||user.mobile==null?'':user.mobile,
               pincode:user.pincode==0||user.pincode==null?'':user.pincode,
               occupation:''
            }}
            onSubmit={values => validateUser(values)}
            validateOnMount={true}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
               <View style={styles.container}>
                  <Header
                     source={require('../../../assets/Image/arrow2.png')}
                     title='EDIT PROFILE'
                     onPress={()=>navigation.replace('Profile')}
                  />
               { isFetching?<Loader/>:null}
                  <ScrollView style={styles.scroll}>
                  <KeyboardAwareScrollView
                     extraScrollHeight={10}
                     enableOnAndroid={true} 
                     keyboardShouldPersistTaps='handled'
                     contentContainerStyle={{flex:1}}>
                     <View style={styles.main}>
                  <Text style={{color:colors.textColor,fontSize:16,fontFamily:'Montserrat-SemiBold'}}>Personal Details:</Text>
                    <View style={styles.row}>
                    <Text style={styles.better}>Name</Text>
                    {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                       {/* <Image style={styles.star} source={require('../../../assets/Image/star1.png')}/> */}
                    </View>
                   
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Jhon Mathew'
                         value={values.name}
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         keyboardType='default'
                         returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.name && touched.name) &&
                        <Text style={styles.warn}>{errors.name}</Text>
                        }
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Father/Spouse Name</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                   
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Father/Spouse Name'
                         value={values.father}
                         onChangeText={handleChange('father')}
                         onBlur={handleBlur('father')}
                         returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.father && touched.father) &&
                        <Text style={styles.warn}>{errors.father}</Text>
                        }
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Mother Maiden Name</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Mother Maiden Name'
                        defaultValue={values.mother}
                        onChangeText={handleChange('mother')}
                        onBlur={handleBlur('mother')}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.mother && touched.mother) &&
                        <Text style={styles.warn}>{errors.mother}</Text>
                        }
                     </View>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between',width:'100%'}}>
                        <View style={{width:'47%'}}>
                        <View style={styles.row}>
                        <Text style={styles.better}>Gender</Text>
                        {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                          </View>
                            <View style={styles.drop}>
                               <RNPickerSelect
                                         onValueChange={(val)=>setGender(val)}
                                         items={data}
                                         style={{ 
                                         inputAndroid: { color: colors.textColor,height:40,width:'100%' },
                                         placeholder:{color:colors.heading1,width:'100%',height:40,alignSelf:'center'}
                                         }}
                                         value={gender==null||gender==0?'':gender}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select Gender", value: 0 }}
                                         Icon={()=>
                                          <Image 
                                         style={{marginLeft:12,width:25,height:9, marginTop:Platform.OS=='android'? 14:4}} 
                                        source={require('../../../assets/Image/down.png')}/>}   
                                   />
                            </View>
                        </View>
                       
                        <View style={{width:'47%',}}>
                        <View style={styles.row}>
                        <Text style={styles.better}>Date of Birth</Text>
                        {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                            <TouchableOpacity onPress={()=>setOpen(true)} style={styles.dropCal}>
                              <View style={{width:'80%'}}>
                                 <Text style={{color:colors.textColor}}>{value}</Text>
                              <DatePicker 
                              date={date}
                              modal
                              mode={'date'}
                              open={open}
                              style={{alignItems:'center'}}
                              onConfirm={(date) => {
                                setOpen(false)
                               setDate(date)
                              }}
                              onCancel={() => {
                                setOpen(false)
                              }}
                              textColor={colors.textColor} 
                              maximumDate={new Date()}                          
                              />
                               {/* <DatePicker
                                  //  style={{width: '100%',}}
                                     date={dob=='0'||null?'':dob}
                                     mode="date"
                                     placeholder="Date Of Birth"
                                     format="DD-MM-YYYY"
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
                                  />  */}
                                  </View>
                                  <TouchableOpacity onPress={()=>setOpen(true)}>
                                  <Image style={{marginLeft:0,width:25,height:9,marginTop:0}} 
                                    source={require('../../../assets/Image/down.png')}/>
                                    </TouchableOpacity>
                                   </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                    <Text style={styles.better}>E-mail</Text>

                    {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                    <View style={[styles.drop,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                        <TextInput
                        style={styles.input}
                        placeholder='example@gmail.com'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        editable={false}
                        returnKeyType='done'
                        />
                       {user.email_status==1?<Image style={{width:20,height:20}} source={require('../../../assets/Image/verified.png')}/>:null}
                     
                    </View>
                    <View style={styles.error}>
                     {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        }
                     </View>
                    {user.email_status==0? <TouchableOpacity
                     onPress={()=>manageVerification()}
                     style={{alignItems:'center',justifyContent:'center',width:40,borderBottomWidth:1,borderColor:colors.bc}}>
                        <Text style={{color:colors.bc}}>Verify</Text>
                     </TouchableOpacity>:null}
                     <View style={styles.row}>
                     <Text style={styles.better}>Mobile</Text>
                   
                    </View>
                    <View style={[styles.drop,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter mobile number'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.mobile}
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')} 
                        keyboardType='number-pad' 
                        editable={false}   
                        returnKeyType='done'                   
                        />
                         <Image style={{width:20,height:20}} source={require('../../../assets/Image/verified.png')}/>
                    </View>
                    <View style={styles.error}>
                     {(errors.mobile && touched.mobile) &&
                        <Text style={styles.warn}>{errors.mobile}</Text>
                        }
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>PAN</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                    <View style={[styles.drop,]}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter pan number'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.pan}
                        onChangeText={handleChange('pan')}
                        onBlur={handleBlur('pan')} 
                        returnKeyType='done'                       
                        />
                   
                    </View>
                    <View style={styles.error}>
                     {(errors.pan && touched.pan) &&
                        <Text style={styles.warn}>{errors.pan}</Text>
                        }
                     </View>
                     <View style={styles.row}>
                
                     <Text style={styles.better}>Address Line1</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter address line1'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.addressLine1}
                        onChangeText={handleChange('addressLine1')}
                        onBlur={handleBlur('addressLine1')}     
                        returnKeyType='done'                   
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.addressLine1 && touched.addressLine1) &&
                        <Text style={styles.warn}>{errors.addressLine1}</Text>
                        }
                     </View>

                     <Text style={{
                        color:colors.textColor,
                        fontSize:16,
                        fontFamily:'Montserrat-SemiBold',
                        marginTop:10
                        }}>Additional Details:</Text>
                         <View style={styles.row}>
                         <Text style={styles.better}>Address Line2</Text>
                         {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter address line2'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.addressLine2}
                        onChangeText={handleChange('addressLine2')}
                        onBlur={handleBlur('addressLine2')}   
                        returnKeyType='done'                     
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.addressLine2 && touched.addressLine2) &&
                        <Text style={styles.warn}>{errors.addressLine2}</Text>
                        }
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Pincode</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter pincode'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.pincode}
                        onChangeText={handleChange('pincode')}
                        onBlur={handleBlur('pincode')}
                        keyboardType={'number-pad'} 
                        maxLength={6}  
                        returnKeyType='done'                     
                        />
                    </View>
                    <View style={styles.error}>
                     {(errors.pincode && touched.pincode) &&
                        <Text style={styles.warn}>{errors.pincode}</Text>
                        }
                     </View>
                     <View style={styles.row}>

                    
                       <Text style={styles.better}>Occupation</Text>
                       {/* <Text style={{marginTop:10,color:colors.red}}>*</Text>    */}
                    </View>

                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>setOccupation(val)}
                        items={Occupation}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={occupation==null||occupation==0?'':occupation}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select Occupation", value: 0 }}
                        Icon={()=>
                           <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                        source={require('../../../assets/Image/down.png')}/>}   
                     />       
                    </View>
                        {occupation=='Others'?
                           <View style={styles.drop}>
                           <TextInput
                           style={styles.input}
                           placeholder='Please Specify'
                           placeholderTextColor={colors.heading1}
                           defaultValue={values.occupation}
                           onChangeText={handleChange('occupation')}
                           onBlur={handleBlur('occupation')}
                           maxLength={30}    
                           returnKeyType='done'                   
                           />
                        </View>:null
                        }
                        
                    <View style={styles.error}>
                     </View>
                    
                     <View style={styles.row}>
                     <Text style={styles.better}>Country</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>manageCountry(val)}
                        items={CountryList}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={country==null||country==0?'':country}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select Country", value:0}}
                        Icon={()=>
                           <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                        source={require('../../../assets/Image/down.png')}/>}   
                     />                                    
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>

                     <View style={styles.row}>
                     <Text style={styles.better}>State</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                           onValueChange={(val)=>manageState(val)}
                           items={selector1}
                           style={{ 
                           inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                           placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                           }}
                           value={state==null||state==0?'':state}
                           useNativeAndroidPickerStyle={false}
                           placeholder={{ label: "Select State", value: 0 }}
                           Icon={()=>
                           <Image 
                           style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                        source={require('../../../assets/Image/down.png')}/>}   
                     />                                
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>
                     <View style={styles.row}>

                  
                     <Text style={styles.better}>City</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>setCity(val)}
                        items={selector2}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={city==null||city==0?'':city}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{label: "Select City", value:0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                        source={require('../../../assets/Image/down.png')}/>}   
                  />                            
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>
                     <View style={styles.row}>
                   
                     <Text style={styles.better}>Income Group</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                                         onValueChange={(val)=>setIncome_group(val)}
                                         items={Incom_Group}
                                         style={{ 
                                         inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                                         placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                                         }}
                                         value={income_group==0||income_group==null?'':income_group}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select Income Group", value: 0 }}
                                         Icon={()=>
                                          <Image 
                                         style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                                        source={require('../../../assets/Image/down.png')}/>}   
                                   />
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Education</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                  
                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>setEducation(val)}
                        items={Education}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={education==0||education==null?'':education}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select Education", value: 0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                     source={require('../../../assets/Image/down.png')}/>}   
                  />                             
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Marital Status</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
              
                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>setMarital_status(val)}
                        items={Marital_Status}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={marital_status==0||marital_status==null?'':marital_status}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Marital Status", value: 0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                        source={require('../../../assets/Image/down.png')}/>}   
                  />                               
                    </View>
                    <View style={styles.error}>
                     {/* {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        } */}
                     </View>
                     <View style={styles.row}>
                     <Text style={styles.better}>Residential Status</Text>
                     {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                    </View>
                    
                      <View style={styles.drop}>
                      <RNPickerSelect
                        onValueChange={(val)=>setResidential_address(val)}
                        items={Residential_Status}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={residential_address==0||residential_address==null?'':residential_address}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select Residential Status", value: 0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                     source={require('../../../assets/Image/down.png')}/>}   
                  />                          
                    </View>
                    <View style={styles.error}>
                    
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
const data=[
   { label: 'Male', value: 'Male' },
   { label: 'Female', value: 'Female' },
   { label: 'Others', value: 'Others'}
]
const Residential_Status=[
   { label: 'Indian', value: 'Indian' },
   { label: 'Foreign Resident', value: 'Foreign Resident' },
  
] 
const Marital_Status=[
   { label: 'Married', value: 'Married' },
   { label: 'Unmarried', value: 'Unmarried' },
]
const Education=[
   { label: 'Senior Secondary (Class X)', value: 'Senior Secondary (Class X)' },
   { label: 'Upto Higher Secondary(Class XII)', value: 'Upto Higher Secondary(Class XII)' },
   { label: `Upto Graduate`, value: `Upto Graduate`},
   { label: 'Post Graduate', value: 'Post Graduate'},
   { label: 'Professional', value: 'Professional'},
   { label: 'Diploma Holder', value: 'Diploma Holder'}

]
const Incom_Group=[
   { label: '<50000', value: '<50000' },
   { label: '50000 - 100000', value: '50000 - 100000' },
   { label: '100000- 300000', value: '100000- 300000'},
   { label: '300000 - 500000',value:'300000 - 500000'},
   { label: '500000 - 100000',value:'500000 - 100000'},
   { label: '1000000 - 1500000',value:'1000000 - 1500000'},
   { label: '>1500000',value:'>1500000'}

]

const Country=[
   { label: 'India', value: 'India' },
]
const Occupation=[
   { label: 'Occupation', value: 'Occupation' },
   { label: 'Salaried', value: 'Salaried' },
   { label: 'Self-employed', value: 'Self-employed'},
   { label: 'Retired',value:'Retired'},
   { label: 'Housewife',value:'Housewife'},
   { label: 'Student',value:'Student'},
   { label: 'Others',value:'Others'}

]

// 1) Occupation 
// 2) Salaried
// 3) Self-employed 
// 4) Retired 
// 5) Housewife 
// 6) Student 
// Others (pls specify) ______________