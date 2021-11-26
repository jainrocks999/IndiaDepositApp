import React,{useEffect, useRef,useState} from "react";
import {View,Text,TextInput,ScrollView,BackHandler,TouchableOpacity} from 'react-native';
import Header from '../../../../component/compareHeader';
import colors from '../../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from "../../../../component/StatusBar";
import { useDispatch,useSelector } from 'react-redux';
import RNPickerSelect from "react-native-picker-select";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import CustomButton from '../../../../component/button1';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Root from '../../../../navigator/rootNavigation';
// import DatePicker from 'react-native-datepicker'
import DatePicker from 'react-native-date-picker';
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from "../../../../component/loader";

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40).required('Please enter your name').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid name"),
  address1:yup.string().required('Please enter your address1').matches( /^[^,*+.!-\/:-@\[-`{-~]+$/,"Please enter valid address1"),
  address2:yup.string().required('Please enter your address2').matches( /^[^,*+.!-\/:-@\[-`{-~]+$/,"Please enter valid address2"),
  pincode:yup.string().min(6,({min})=>`Pincode must be at least 6 digits`).required('Please enter your pincode')
  .matches(/^[+-]?\d*(?:[.,]\d*)?$/,"Please enter valid pincode"),
  relationship:yup.string().required('Please enter your relationship').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid relationship"),
  guardian:yup.string().required('Please Enter your guardian name').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid guardian name"),
  guardian_relationship:yup.string().required('Please enter your guardian relationship').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid guardian relationship"),
  })
  
const BankDetail=({route})=>{
        const navigation=useNavigation()
        const data=route.params
        console.log('this is data',data.item.city);
        const dispatch=useDispatch()
        const [city,setCity]=useState(data.item.city)
        const [state,setState]=useState(data.item.state)
        const [country,setCountry]=useState('')
        const [dob,setDob]=useState(data.item.dob)
        const selector=useSelector(state=>state.CityList)
        const selector1=useSelector(state=>state.StateList)
        const CountryList=useSelector(state=>state.CountryList)
        const isFetching=useSelector(state=>state.isFetching)
        const [manageStateValue,setManageStateValue]=useState([])
        const [open,setOpen]=useState(false)
        const [date, setDate] = useState(new Date())

        const value1= date.toISOString().split('T')[0]  
        const [yyyy ,mm ,dd]=value1.split('-')
        const value=`${dd}-${mm}-${yyyy}`
useEffect(()=>{
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    handleBackButtonClick,
  );
  return () => backHandler.remove()
},[])

const handleBackButtonClick=() =>{
  if(navigation.isFocused()){
    Root.push('Profile')
  return true;
}
 
}




const addUser=async(values)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
        if(country==''){
          Toast.show('Please Select Country Name')
        }
        else if(state==''){
            Toast.show('Please Select State Name')
        }
        else if(city==''){
            Toast.show('Please Select City Name')
        }
        else if(value==''){
            Toast.show('Please Select Date of Birth')
        }else{
        dispatch({
            type: 'Edit_Nominee_Request',
            url: 'updatenominee',
            user_id,
            user_nominee_id:data.item.user_nominee_id,
            name:values.name,
            address1:values.address1,
            address2:values.address2,
            country:country,
            state:state,
            city:city,
            dob:value,
            relationship:values.relationship,
            guardian:values.guardian,
            guardian_relationship:values.guardian_relationship,
            pincode:values.pincode,
            navigation:navigation
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
     const Country=[
      {label:'India',value:'101'},
    ]

    const manageCountry=async(val)=>{
      setCountry(val)
      dispatch({
         type: 'State_List_Request',
         url: 'statebyid',
         country_id:val,
         
       })
   }

    return(
        <Formik
        enableReinitialize
        initialValues={{
          name:data.item.name,
          address1:data.item.address1,
          address2:data.item.address2,
          pincode:data.item.pincode,
          relationship:data.item.relationship,
          guardian:data.item.guardian,
          guardian_relationship:data.item.guardian_relationship
        }}
        onSubmit={values => addUser(values)}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
            <Header
                    title={'EDIT NOMINEE  '}
                    source={require('../../../../assets/Image/arrow2.png')}
                    onPress={()=>Root.push('Profile')}
                   /> 
             <ScrollView style={styles.main}>
               {isFetching?<Loader/>:null}
             <KeyboardAwareScrollView
                extraScrollHeight={10}
                enableOnAndroid={true} 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{flex:1}}>
                <View style={styles.card}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.better}>Name</Text>
                <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter your name'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.name && touched.name) &&
                        <Text style={styles.warn}>{errors.name}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Address Line1</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter your address line1'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.address1}
                        onChangeText={handleChange('address1')}
                        onBlur={handleBlur('address1')}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.address1 && touched.address1) &&
                        <Text style={styles.warn}>{errors.address1}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Address Line2</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Please enter your address line2'
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.address2}
                        onChangeText={handleChange('address2')}
                        onBlur={handleBlur('address2')}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.address2 && touched.address2) &&
                        <Text style={styles.warn}>{errors.address2}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Country</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>manageCountry(val)}
                            items={CountryList}
                            style={{ 
                            inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                            placeholder:{color:colors.heading}
                            }}
                            value={country}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ }}
                        />                                  
                    </View>
                    <View style={styles.error}>
                       
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>State</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>manageState(val)}
                            items={selector1}
                            style={{ 
                            inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                            placeholder:{color:colors.heading}
                            }}
                            value={state}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select", value: null }}
                        />   
                    </View>
                    <View style={styles.error}>
                      
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>City</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>setCity(val)}
                            items={selector}
                            style={{ 
                            inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                            placeholder:{color:colors.heading}
                            }}
                            value={city}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select", value: null }}
                        />   
                    </View>
                    <View style={styles.error}>
                        
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Date of Birth</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <TouchableOpacity onPress={()=>setOpen(true)} style={styles.drop}>
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
                              />
                      {/* <DatePicker
                        style={{width: '99%'}}
                            date={dob=='0000-00-00'?'':dob}
                            mode="date"
                            placeholder="Date Of Birth"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            maxDate={new Date()}
                            customStyles={{
                                placeholderText:{marginLeft:0,color:colors.heading1},
                            dateIcon: {
                                width:0,
                                height:0,
                            },
                            dateInput: {
                                borderWidth:0,
                                width:'100%',
                                height:'100%',
                                alignItems:'flex-start',
                            }
                            }}
                            onDateChange={(date) => setDob(date)}
                        /> */}
                    </TouchableOpacity>
                    <View style={styles.error}>
                       
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Relationship</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Please enter your relationship'
                            placeholderTextColor={colors.heading1}
                            defaultValue={values.relationship}
                            onChangeText={handleChange('relationship')}
                            onBlur={handleBlur('relationship')}
                            maxLength={11}
                            returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.relationship && touched.relationship) &&
                        <Text style={styles.warn}>{errors.relationship}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Guardian</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Please enter your guardian name'
                            placeholderTextColor={colors.heading1}
                            defaultValue={values.guardian}
                            onChangeText={handleChange('guardian')}
                            onBlur={handleBlur('guardian')}
                            maxLength={11}
                            returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.guardian && touched.guardian) &&
                        <Text style={styles.warn}>{errors.guardian}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Guardian Relationship</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Please enter your guardian relationship'
                            placeholderTextColor={colors.heading1}
                            defaultValue={values.guardian_relationship}
                            onChangeText={handleChange('guardian_relationship')}
                            onBlur={handleBlur('guardian_relationship')}
                            returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.guardian_relationship && touched.guardian_relationship) &&
                        <Text style={styles.warn}>{errors.guardian_relationship}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Pincode</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                   
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Pleae enter your pincode'
                            placeholderTextColor={colors.heading1}
                            defaultValue={values.pincode}
                            onChangeText={handleChange('pincode')}
                            onBlur={handleBlur('pincode')}
                            maxLength={6}
                            keyboardType='number-pad'
                            returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.pincode && touched.pincode) &&
                        <Text style={styles.warn}>{errors.pincode}</Text>}
                    </View>
                    <View style={{marginTop:20}}>
                    <CustomButton
                    title='UPDATE'
                    onPress={()=> handleSubmit()}
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
export default BankDetail;