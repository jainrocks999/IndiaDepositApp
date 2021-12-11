import React,{useEffect, useState}from 'react';
import { View,Text,ScrollView,BackHandler,TextInput,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import colors from '../../../../component/colors';
import StatusBar from '../../../../component/StatusBar';
import Header from '../../../../component/header';
import { useDispatch,useSelector } from "react-redux";
import CustomButton from '../../../../component/button1';
import { Formik } from 'formik';
import * as yup from 'yup';
import  DatePicker  from "react-native-date-picker";



const loginValidationSchema=yup.object().shape({
    transaction_id:yup.string().required('Please enter transaction ID'),
    transaction_amount:yup.string().required('Please enter amount')
})
const Payment=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const [loader,setLoader]=useState(false)
    const [checked,setChecked]=useState(false)
    const [checked1,setChecked1]=useState(false)
    const [transaction_date,set_transaction_date]=useState('')
    const [open,setOpen]=useState(false)
    const [date, setDate] = useState(new Date())
    const value1= date.toISOString().split('T')[0]  
    const [yyyy ,mm ,dd]=value1.split('-')
    const value=`${dd}-${mm}-${yyyy}`
    
useEffect(async()=>{    
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
  try{
    setIsFetching(true)
    const data = new FormData();
    data.append('transaction_id',values.transaction_id)
    data.append('transaction_amount',values.transaction_amount)
    data.append('transaction_date',value)
    data.append('my_fixed_deposit_id',route.params.my_fixed_deposit_id)
   
  const response =await axios({
    method: 'POST',
    data,
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
    url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/addtransactiondetail',
  });
  if (response.status==200) {
    setIsFetching(false)
    navigation.navigate('PaymentDetail1')
  }else{
    isFetching(false)
  }
} catch (error) {
  setIsFetching(false)
}
}

const manageCheck=()=>{
    setChecked(true)
    setChecked1(false)
}
const manageCheck1=()=>{
   setChecked(false)
   setChecked1(true)
}
return(
    <Formik
        initialValues={{transaction_id:'',transaction_amount:'' }}
        onSubmit={values => validateUser(values)}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
           <Header
            source={require('../../../../assets/Image/arrow2.png')}
           title={'PAYMENT DETAIL'}
           onPress={()=>navigation.goBack()}
           />
             <ScrollView style={{paddingHorizontal:15,paddingVertical:10}}>
                 <View style={styles.card}>
                   <Text style={
                       {fontSize:16,
                        fontFamily:'Montserrat-SemiBold'}}>Account Detail :</Text>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginTop:5}}>{`Account Number : ${'21010000000000'}`}</Text>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginTop:5}}>{`IFSC Code : ${'BARB0RANIGA'}`}</Text>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginTop:5}}>{`Transaction ID : ${'BHIM1234UNJUR'}`}</Text>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginTop:5}}>{`Transaction Date : ${'07-12-2021'}`}</Text>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginTop:5}}>{`Transaction Amount : ${'10000'}`}</Text>
                   <View style={{marginTop:15}}>
                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Transaction ID</Text>
                     <View style={[styles.drop]}>
                         <TextInput 
                         style={{height:40}} 
                         placeholder='Please enter transaction ID'
                         onChangeText={handleChange('transaction_id')}
                         onBlur={handleBlur('transaction_id')}
                         value={values.transaction_id}
                         />
                     </View>
                </View>
                <View style={styles.error}>
               {(errors.transaction_id && touched.transaction_id) &&
                 <Text style={styles.warn}>{errors.transaction_id}</Text>
                 }
               </View>


               <View style={{marginTop:15}}>
                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Transaction Amount</Text>
                     <View style={[styles.drop]}>
                         <TextInput 
                         style={{height:40}} 
                         placeholder='Please enter transaction amount'
                         onChangeText={handleChange('transaction_amount')}
                         onBlur={handleBlur('transaction_amount')}
                        value={values.transaction_amount}
                         />
                     </View>
                </View>
                <View style={styles.error}>
               {(errors.transaction_amount && touched.transaction_amount) &&
                 <Text style={styles.warn}>{errors.transaction_amount}</Text>
                 }
               </View>
               <View style={{marginTop:15}}>
                     <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>Transaction Date</Text>
                     <TouchableOpacity onPress={()=>setOpen(true)} style={[styles.drop1]}>
                    <Text>{value}</Text>
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
                        // minimumDate={new Date()}                       
                        />  
                          <TouchableOpacity onPress={()=>setOpen(true)}>
                            <Image style={{marginLeft:0,width:25,height:9,marginTop:0}} 
                            source={require('../../../../assets/Image/down.png')}/>
                          </TouchableOpacity>
                     </TouchableOpacity>
                    </View>
                 </View>
             </ScrollView>
             <View style={{bottom:20,position:'absolute',left:0,right:0,paddingVertical:10}}>
             <View style={{paddingHorizontal:15,marginTop:20}}>
              <CustomButton 
              onPress={()=>handleSubmit()}
              title={'SUBMIT'}/>
             </View>
             </View>
           <StatusBar/>
       </View>
       )}
</Formik>
    )
}
export default Payment;
