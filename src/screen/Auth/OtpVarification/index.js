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
import colors from '../../../component/colors';

const OtpVarification=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const otpCode=route.params
    console.log('this is parms value',otpCode);
    console.log('this is parms value',otpCode.otp);
    const [otp,setOtp]=useState('')
const validateUser=()=>{
    if(otp==''){
        Toast.show('Enter OTP Code')
    }
    else if(otpCode.otp!=otp){
        Toast.show('OTP Mismatch')
      }
    else{
        navigation.replace('Main')
      }
}
    return(
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
          <ScrollView>
          <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
          </View>
           <View style={styles.main}>
           <View style={styles.otpView}>
            <Text style={styles.enter}>Enter OTP</Text>
           <OTPTextInput
              containerStyle={styles.input}
              handleTextChange={(code)=>setOtp(code)}
              inputCount={4}
              textInputStyle={styles.otp}
              offTintColor={'white'}
              tintColor={'white'}
              />
              <View style={[styles.textBottom,{marginTop:15}]}>
                  <Text style={styles.your}>
                      {`Enter the OTP sent to your mobile number.`}
                  </Text>
              </View>
            </View>          
             <View style={styles.button}>
                 <CustomButton
                 title='CONFIRM OTP'
                 onPress={()=>validateUser()}
                 />
                 <View style={[styles.textBottom,{marginTop:10,flexDirection:'row',alignItems:'center'}]}>
                  <Text style={styles.your}>
                      {`Didn’t Receive the OTP?`}
                  </Text>
                  <Text style={[styles.your,{color:colors.bc}]}>
                      {` Resend again`}
                  </Text>
              </View>
             </View>
             
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
    )
}
export default OtpVarification;
