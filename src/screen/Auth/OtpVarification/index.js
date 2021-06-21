import React,{useState} from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import OTPTextInput  from 'react-native-otp-textinput';
import color from '../../../component/colors';

const OtpVarification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [otp,setOtp]=useState('')
const validateUser=()=>{
    if(otp==''){
        Toast.show('Enter OTP Code')
    }
    else{
        // dispatch({
        //   type: 'Forget_Password_Request',
        //   url: '',
        //   mobile,
        //   navigation: navigation,
        // })
        navigation.navigate('Login')
      }
}
    return(
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
          <ScrollView>
            <View style={styles.imageContainer}>
               <Image style={styles.image} 
               source={require('../../../assets/Images/IndiaDeposit_Primary.png')}/>
            </View>
           <View style={styles.textView}>
               <Text style={styles.text}>{'OTP'}</Text>
           </View>
           <View style={styles.main}>
           <View style={styles.otpView}>
            <Text style={styles.enter}>Enter OTP</Text>
           <OTPTextInput
             containerStyle={styles.input}
              handleTextChange={(code)=>setOtp(code)}
              inputCount={4}
              textInputStyle={styles.otp}
              offTintColor={color.textColor}
              tintColor={color.textColor}
              />
              <View style={styles.textBottom}>
                  <Text style={styles.your}>
                      {`Enter the OTP sent to your mobile \n   number. We are here to secure \n              your login details.`}
                  </Text>
              </View>
            </View>          
             <View style={styles.button}>
                 <CustomButton
                 title='CONFIRM OTP'
                 onPress={()=>validateUser()}
                 />
             </View>
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
    )
}
export default OtpVarification;
