import React,{useRef,useState} from "react";
import {View,Text,TextInput,ScrollView,Image} from 'react-native';
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
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        const dispatch=useDispatch()
        const [city,setCity]=useState('')
        const [state,setState]=useState('')
        const [country,setCountry]=useState('India')
        const [dob,setDob]=useState('')
        const selector=useSelector(state=>state.CityList)
        const selector1=useSelector(state=>state.StateList)
        const [manageStateValue,setManageStateValue]=useState([])
        
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
        else if(dob==''){
            Toast.show('Please Select Date of Birth')
        }else{
        dispatch({
            type: 'Add_Nominee_Request',
            url: 'addnominee',
            user_id,
            name:values.name,
            address1:values.address1,
            address2:values.address2,
            country:101,
            state:state,
            city:city,
            dob:dob,
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
        // try {
        //     const data = new FormData();
        //     data.append('state_id',val)
        //     const response = await axios({
        //       method: 'POST',
        //       data,
        //       headers: {
        //         'content-type': 'multipart/form-data',
        //         Accept: 'multipart/form-data',
        //       },
        //       url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/citybyid',
        //     });
        //     console.log('this is response value',response);
        //     setManageStateValue(response.data.data)
        //   } catch (error) {
        //    throw error;
            
        //   }
    
         }
    
         const Country=[
          {label:'India',value:'101'},
        ]

    return(
        <Formik
        initialValues={{name:'',address1:'',address2:'',pincode:'',relationship:'',guardian:'',guardian_relationship:''}}
        onSubmit={values => addUser(values)}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
            <Header
                    title={'ADD NOMINEE   '}
                    source={require('../../../../assets/Image/arrow2.png')}
                    onPress={()=>Root.push('Profile')}
                   /> 
             <ScrollView style={styles.main}>
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
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
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
                        value={values.address1}
                        onChangeText={handleChange('address1')}
                        onBlur={handleBlur('address1')}
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
                        value={values.address2}
                        onChangeText={handleChange('address2')}
                        onBlur={handleBlur('address2')}
                        
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
                            onValueChange={(val)=>setCountry(val)}
                            items={Country}
                            //style={{ inputAndroid: { color: 'black' } }}
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
                        {/* {(errors.account_type && touched.account_type) &&
                        <Text style={styles.warn}>{errors.account_type}</Text>} */}
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
                        {/* {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>} */}
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
                        {/* {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>} */}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Date of Birth</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                      <DatePicker
                        style={{width: '99%'}}
                            date={dob}
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
                        />
                    </View>
                    <View style={styles.error}>
                        {/* {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>} */}
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
                            value={values.relationship}
                            onChangeText={handleChange('relationship')}
                            onBlur={handleBlur('relationship')}
                            maxLength={11}
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
                            value={values.guardian}
                            onChangeText={handleChange('guardian')}
                            onBlur={handleBlur('guardian')}
                            maxLength={11}
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
                            value={values.guardian_relationship}
                            onChangeText={handleChange('guardian_relationship')}
                            onBlur={handleBlur('guardian_relationship')}
                            maxLength={11}
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
                            placeholder='Please enter your pincode'
                            placeholderTextColor={colors.heading1}
                            value={values.pincode}
                            onChangeText={handleChange('pincode')}
                            onBlur={handleBlur('pincode')}
                            maxLength={6}
                            keyboardType='number-pad'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.pincode && touched.pincode) &&
                        <Text style={styles.warn}>{errors.pincode}</Text>}
                    </View>
                    <View style={{marginTop:20}}>
                    <CustomButton
                    title='ADD'
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