import React,{useRef,useState} from "react";
import {View,Text,TextInput,ScrollView} from 'react-native';
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
import axios from "axios";

const loginValidationSchema=yup.object().shape({
    name:yup.string().required('Please Enter your Name'),
    address1:yup.string().required('Please Enter your Address1'),
    address2:yup.string().required('Please Enter your Address2'),
    pincode:yup.string().required('Please Enter your Pincode'),
    relationship:yup.string().required('Please Enter your Relationship'),
    guardian:yup.string().required('Please Enter your Guardian Name'),
    guardian_relationship:yup.string().required('Please Enter your Guardian Relationship'),
  })
  
const BankDetail=({route})=>{
        const navigation=useNavigation()
        const data=route.params
        console.log('this is data',data.item.city);
        const dispatch=useDispatch()
        const [city,setCity]=useState(data.item.city)
        const [state,setState]=useState(data.item.state)
        const [country,setCountry]=useState(data.item.country)
        const [dob,setDob]=useState(data.item.dob)
       
        const selector=useSelector(state=>state.CountryList)
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
            dob:dob,
            relationship:values.relationship,
            guardian:values.guardian,
            guardian_relationship:values.guardian_relationship,
            pincode:values.pincode,
          })
        }
      }
const manageState=async(val)=>{
    setState(val)
    try {
        const data = new FormData();
        data.append('state_id',20)
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/citybyid',
        });
        console.log('this is response value',response);
        setManageStateValue(response.data.data)
      } catch (error) {
       throw error;
        
      }

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
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
            <Header
                    title={'Edit Nominee'}
                    source={require('../../../../assets/Images/arrow.png')}
                    onPress={()=>Root.push('NomineeList')}
                   /> 
             <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
                <View style={styles.card}>
                <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='John Methew'
                        defaultValue={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.name && touched.name) &&
                        <Text style={styles.warn}>{errors.name}</Text>}
                    </View>
                      <Text style={styles.better}>Address1</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Address1'
                        defaultValue={values.address1}
                        onChangeText={handleChange('address1')}
                        onBlur={handleBlur('address1')}
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.address1 && touched.address1) &&
                        <Text style={styles.warn}>{errors.address1}</Text>}
                    </View>
                    <Text style={styles.better}>Address2</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Address2'
                        defaultValue={values.address2}
                        onChangeText={handleChange('address2')}
                        onBlur={handleBlur('address2')}
                        
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.address2 && touched.address2) &&
                        <Text style={styles.warn}>{errors.address2}</Text>}
                    </View>
                    <Text style={styles.better}>Country</Text>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>setCountry(val)}
                            items={selector}
                            style={{ 
                            inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                            placeholder:{color:colors.heading}
                            }}
                            value={country}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select", value: null }}
                        />                                  
                    </View>
                    <View style={styles.error}>
                        {(errors.account_type && touched.account_type) &&
                        <Text style={styles.warn}>{errors.account_type}</Text>}
                    </View>
                    <Text style={styles.better}>State</Text>
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
                        {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>}
                    </View>

                    <Text style={styles.better}>City</Text>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>setCity(val)}
                           
                            items={manageStateValue}
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
                        {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>}
                    </View>

                    <Text style={styles.better}>Date of Birth</Text>
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
                                placeholderText:{marginLeft:0},
                                
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
                        {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>}
                    </View>

                    <Text style={styles.better}>Relationship</Text>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Relationship'
                            defaultValue={values.relationship}
                            onChangeText={handleChange('relationship')}
                            onBlur={handleBlur('relationship')}
                            maxLength={11}
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.relationship && touched.relationship) &&
                        <Text style={styles.warn}>{errors.relationship}</Text>}
                    </View>

                    <Text style={styles.better}>Guardian</Text>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Guardian'
                            defaultValue={values.guardian}
                            onChangeText={handleChange('guardian')}
                            onBlur={handleBlur('guardian')}
                            maxLength={11}
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.guardian && touched.guardian) &&
                        <Text style={styles.warn}>{errors.guardian}</Text>}
                    </View>

                    <Text style={styles.better}>Guardian Relationship</Text>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Guardian Relationship'
                            defaultValue={values.guardian_relationship}
                            onChangeText={handleChange('guardian_relationship')}
                            onBlur={handleBlur('guardian_relationship')}
                           
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.guardian_relationship && touched.guardian_relationship) &&
                        <Text style={styles.warn}>{errors.guardian_relationship}</Text>}
                    </View>

                    <Text style={styles.better}>Pincode</Text>
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='Pincode'
                            defaultValue={values.pincode}
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
                    title='Add'
                    onPress={()=> handleSubmit()}
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
export default BankDetail;