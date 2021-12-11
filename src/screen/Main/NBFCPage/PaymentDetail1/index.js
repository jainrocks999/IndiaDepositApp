// import React,{useEffect, useState}from 'react';
// import { View,Text,ScrollView,BackHandler, TextInput} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import colors from '../../../../component/colors';
// import StatusBar from '../../../../component/StatusBar';
// import Header from '../../../../component/header';
// import { useDispatch,useSelector } from "react-redux";
// import AsyncStorage from "@react-native-community/async-storage";
// import Storage from '../../../../component/AsyncStorage';
// import { RadioButton } from 'react-native-paper';
// import CustomButton from '../../../../component/button1';
// import { Formik } from 'formik';
// import * as yup from 'yup';

// const loginValidationSchema=yup.object().shape({
//     ifsc:yup.string().min(10,({min})=>`IFSC code must be 10 digits`)
//     .required('Enter IFSC code of your bank you would use for investments,This is mendatory for investments'),
//     account:yup.string().min(11,({min})=>`Account number must be 11 digits`).required('Please enter account number'),
//     confirmAcount:yup.string().when("account", {
//       is: val => (val && val.length > 0 ? true : false),
//       then: yup.string().oneOf(
//         [yup.ref("account")],
//         "Account number mismatch"
//       )
//     }).
//     required('Please confirm account number'),
//     name:yup.string().required('Please enter account holder name')
// })

// const Notification=()=>{
//     const navigation=useNavigation()
//     const dispatch=useDispatch()
//     const isFetching=useSelector(state=>state.isFetching)
//     const [checked,setChecked]=useState(false)
//     const [checked1,setChecked1]=useState(false)

    
// useEffect(async()=>{
//     const user_id=await AsyncStorage.getItem(Storage.user_id)
//     const backAction = () => {
//         navigation.navigate('Main')
//         return true;
//       };
    
//       const backHandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         backAction
//       );
//       return () => backHandler.remove();
// },[])

// const manageCheck=()=>{
//     setChecked(true)
//     setChecked1(false)
// }
// const manageCheck1=()=>{
//    setChecked(false)
//    setChecked1(true)
// }
//     return(
//         <Formik
//         initialValues={{ifsc:'',account:'' ,confirmAcount:'',name:''}}
//         onSubmit={values => validateUser(values)}
//         validateOnMount={true}
//         validationSchema={loginValidationSchema}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
//         <View style={styles.container}>
//            <Header
//             source={require('../../../../assets/Image/arrow2.png')}
//            title={''}
//            onPress={()=>navigation.goBack()}
//            />
//            <ScrollView>
//              <View style={{paddingHorizontal:15,paddingVertical:10}}>
//                <Text style={{
//                    fontSize:17,
//                    fontFamily:'Montserrat-Semibold',
//                    color:colors.textColor,
//                    fontWeight:'700'
//                    }}>Enter Bank Details</Text>
//                <View style={[styles.card,{marginTop:10,flexDirection:'row',justifyContent:'space-between'}]}>
//                   <View style={{flexDirection:'row',alignItems:'center',}}>
//                     <RadioButton
//                         value={checked}
//                         status={ checked === true ? 'checked' : 'unchecked' }
//                         onPress={() =>manageCheck()}
//                         color={colors.bc}/>
//                         <View>
//                     <Text style={{
//                         marginLeft:10,
//                         fontWeight:'500',
//                         fontFamily:'Montserrat-SemiBold',
//                         color:colors.textColor,
//                         fontSize:16
//                         }}>{'Saving'}</Text>
//                         </View>
//                    </View>
//                    <View style={{flexDirection:'row',alignItems:'center',}}>
//                     <RadioButton
//                         value={checked1}
//                         status={ checked1 === true ? 'checked' : 'unchecked' }
//                         onPress={() =>manageCheck1()}
//                         color={colors.bc}/>
//                         <View>
//                     <Text style={{
//                         marginLeft:10,
//                         fontWeight:'500',
//                         fontFamily:'Montserrat-SemiBold',
//                         color:colors.textColor,
//                         fontSize:16
//                         }}>{'Current'}</Text>
//                         </View>
//                    </View>
//                </View>
//                <View style={{marginTop:15}}>
//                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>IFSC Code</Text>
//                     <View style={[styles.drop]}>
//                         <TextInput 
//                         style={{height:40}} 
//                         placeholder='Enter IFSC code'
//                         onChangeText={handleChange('ifsc')}
//                         onBlur={handleBlur('ifsc')}
//                         value={values.ifsc}
//                         />
//                     </View>
//                </View>
//                <View style={styles.error}>
//               {(errors.ifsc && touched.ifsc) &&
//                 <Text style={styles.warn}>{errors.ifsc}</Text>
//                 }
//               </View>
//                <View style={{marginTop:15}}>
//                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Account Number</Text>
//                     <View style={[styles.drop]}>
//                         <TextInput 
//                         style={{height:40}} 
//                         placeholder='Please enter account number'
//                         onChangeText={handleChange('account')}
//                         onBlur={handleBlur('account')}
//                         value={values.account}
//                         />
//                     </View>
//                </View>
//                <View style={styles.error}>
//               {(errors.account && touched.account) &&
//                 <Text style={styles.warn}>{errors.account}</Text>
//                 }
//               </View>
//                <View style={{marginTop:15}}>
//                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Re-Enter Account Number</Text>
//                     <View style={[styles.drop]}>
//                         <TextInput 
//                         style={{height:40}} 
//                         placeholder='Please re-enter account number'
//                         onChangeText={handleChange('confirmAcount')}
//                         onBlur={handleBlur('confirmAcount')}
//                         value={values.confirmAcount}
//                         />
//                     </View>
//                </View>
//                <View style={styles.error}>
//               {(errors.confirmAcount && touched.confirmAcount) &&
//                 <Text style={styles.warn}>{errors.confirmAcount}</Text>
//                 }
//               </View>
//                <View style={{marginTop:15}}>
//                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Account Holder Name</Text>
//                     <View style={[styles.drop]}>
//                         <TextInput 
//                         style={{height:40}} 
//                         placeholder='Please enter account holder name'
//                         onChangeText={handleChange('name')}
//                         onBlur={handleBlur('name')}
//                         value={values.name}
//                         />
//                     </View>
//                </View>
//                <View style={styles.error}>
//               {(errors.name && touched.name) &&
//                 <Text style={styles.warn}>{errors.name}</Text>
//                 }
//               </View>
//               <View style={{marginVertical:20}}>
//               <CustomButton title='Continue'/>
//               </View>
//              </View>
            
//            <StatusBar/>
//            </ScrollView>
//        </View>
//         )}
//         </Formik>
//     )
// }
// export default Notification;
import React from "react";
import { View,Text,StyleSheet,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../component/header";
import styles from './styles';
import CustomButton from '../../../../component/button1';
const Confirmation=()=>{
  const navigation=useNavigation()
  return(
    <View style={styles.container}>
        <Header
             source={require('../../../../assets/Image/arrow2.png')}
             title={'CONFIRMATION'}
             onPress={()=>navigation.goBack()}
           />
           {/* <ScrollView style={{paddingHorizontal:15,paddingVertical:10,flex:1}}> */}
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:16,fontFamily:'Montserrat-Bold'}}>{'Your FD Created Successfully!'}</Text>
              {/* <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',marginTop:5}}>{`Account Number : ${'210100000000'}`}</Text> */}
              <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',marginTop:5}}>{`Transaction ID : ${'BHIM12345URS'}`}</Text>
              <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',marginTop:5}}>{`Transaction Date : ${'07-12-2021'}`}</Text>
              <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',marginTop:5}}>{`Transaction Amount : ${'10000'}`}</Text>
             </View>
             {/* <View>
             <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>{'Your FD Created Successfully!'}</Text>
             </View> */}
           {/* </ScrollView> */}
           <View style={{bottom:20,position:'absolute',left:0,right:0,paddingVertical:10}}>
             {/* <View style={{paddingHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:14,color:colors.textColor}}>Investment Amount</Text>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                     <Image style={{height:20,width:14}} source={require('../../../../assets/Image/rupay.png')}/>
                     <Text style={{marginLeft:2}}>{'10,000'}</Text>
                 </View>
             </View> */}
             <View style={{paddingHorizontal:15,marginTop:20}}>
              <CustomButton 
              onPress={()=>navigation.navigate('Main')}
              title={'DONE'}/>
             </View>
             </View>
    </View>
  )
}
export default Confirmation;