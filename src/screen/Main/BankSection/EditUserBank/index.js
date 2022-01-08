import React,{useRef,useState,useEffect} from "react";
import {View,Text,TextInput,ScrollView,Image,BackHandler} from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const loginValidationSchema=yup.object().shape({
    account_number:yup.string().
    max(16,({min})=>`Account number must be maximum 16 digits`).
    min(11,({min})=>`Account number must be atleast 11 digits`)
    .required('Please enter your account number ').matches(/^[+-]?\d*(?:[.,]\d*)?$/,"Please enter valid account number"),
    ifsc_code:yup.string().min(11,({min})=>`IFSC code must be 11 digits`)
    .required('Please enter IFSC Code')
    .matches(/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/,"Please enter valid IFSC code"),
  })
const data2=[
    { label: 'Saving Account', value: 'Saving Account'},
    { label: 'Current Account', value: 'Current Account'},
    { label: 'Others', value: 'Others'},
]

    
const BankDetail=({route})=>{
        const navigation=useNavigation()
        const data=route.params
        const dispatch=useDispatch()
        const [bank_name,set_bank_name]=useState(data.item.bank_id)
        const [account_type,set_account_type]=useState(data.item.account_type)
        const selector=useSelector(state=>state.BankNameList)

        useEffect(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
              BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            };
          }, []);
          const handleBackButtonClick=() =>{
            if(navigation.isFocused()){
              navigation.navigate('Profile')
            return true;
            }
          }
       
const addUser=async(values)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    console.log('narendra here pal kumar',values);
   
        dispatch({
            type: 'Update_Bank_Request',
            url: 'updateuserbank',
            user_id,
            user_bank_id:data.item.user_bank_id,
            bank_id:bank_name,
            account_number:values.account_number,
            account_type:account_type,
            ifsc_code:values.ifsc_code,
            other1:'test',
            other2:'test',
            navigation:navigation
          })
      }

    return(
        <Formik
        enableReinitialize
        initialValues={{ 
            account_number:data.item.account_number,
            ifsc_code:data.item.ifsc_code,
        }}
        onSubmit={values => addUser(values)}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
            <Header
                    title={'EDIT BANK'}
                    source={require('../../../../assets/Image/arrow2.png')}
                    onPress={()=>Root.push('Profile')}
                   /> 
             <ScrollView style={styles.main}>
             <KeyboardAwareScrollView
                extraScrollHeight={0}
                enableOnAndroid={true} 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{flex:1}}>
                <View style={styles.card}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Financial Institution</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                     
                      <View style={styles.drop}>
                       <RNPickerSelect
                            onValueChange={(val)=>set_bank_name(val)}
                             //onValueChange={handleChange('bank_name')}
                            items={selector}
                            style={{ 
                                inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                            placeholder:{color:colors.heading}
                            }}
                            value={bank_name}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select", value: null }}
                        /> 
                    </View>
                    <View style={styles.error}>
                        {(errors.bank_name && touched.bank_name) &&
                        <Text style={styles.warn}>{errors.bank_name}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Account Number</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                    
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='21000001234567'
                        placeholderTextColor={colors.heading1}
                        value={values.account_number}
                        onChangeText={handleChange('account_number')}
                        onBlur={handleBlur('account_number')}
                        keyboardType='number-pad'
                        maxLength={14}
                        returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.account_number && touched.account_number) &&
                        <Text style={styles.warn}>{errors.account_number}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>Account Type</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                      <View style={styles.drop}>
                      <RNPickerSelect
                            onValueChange={(val)=>set_account_type(val)}
                           // onValueChange={handleChange('account_type')}
                            items={data2}
                            style={{ 
                                inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                            placeholder:{color:colors.heading}
                            }}
                            value={account_type}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select", value: null }}
                        />                                  
                    </View>
                    <View style={styles.error}>
                        {(errors.account_type && touched.account_type) &&
                        <Text style={styles.warn}>{errors.account_type}</Text>}
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.better}>IFSC Code</Text>
                    <Text style={{marginTop:10,color:colors.red}}>*</Text>
                    </View>
                   
                      <View style={styles.drop}>
                        <TextInput
                            style={styles.input}
                            placeholder='SBIN00084'
                            placeholderTextColor={colors.heading1}
                            value={values.ifsc_code}
                            onChangeText={handleChange('ifsc_code')}
                            onBlur={handleBlur('ifsc_code')}
                            maxLength={11}
                            returnKeyType='done'
                        />
                    </View>
                    <View style={styles.error}>
                        {(errors.ifsc_code && touched.ifsc_code) &&
                        <Text style={styles.warn}>{errors.ifsc_code}</Text>}
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