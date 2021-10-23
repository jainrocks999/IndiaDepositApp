import React,{useState} from 'react';
import { View,Text,Image,BackHandler} from 'react-native';
import CustomButton from '../../../component/button1';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import OTPTextInput  from 'react-native-otp-textinput';
import colors from '../../../component/colors';
import { TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

class OtpVarification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          otp:'',
          timer: null,
          counter: 12,
          user_id:this.props.route.params.user_id,
          otpData:this.props.route.params.otp,
          mobile:this.props.route.params.mobile,
          name:this.props.route.params.name,
          email:this.props.route.params.email,
          type:this.props.route.params.type,
          pin:this.props.route.params.pin,
          count:0,
          countryCode:this.props.route.params.countryCode
          // father_spouse_name:this.props.route.params.father_spouse_name,
          // mother_maiden_name:this.props.route.params.mother_maiden_name,
          // dob:this.props.route.params.dob,
          // gender:this.props.route.params.gender,

          // pan:this.props.route.params.pan,
          // address1:this.props.route.params.address1,
          // address2:this.props.route.params.address2,
          // occupation:this.props.route.params.occupation,
          // pincode:this.props.route.params.pincode, 
          // states:this.props.route.params.state,
          // city:this.props.route.params.city,
          // marital_status:this.props.route.params.marital_status,
          // education:this.props.route.params.education,
          // income_group:this.props.route.params.income_group,
          // residential_status:this.props.route.params.residential_status,
          // value:0,

        };
       // this.setState({value:('0')})
      }

      backAction = () => {
        this.props.navigation.push(this.state.type)
        return true;
      };
    
   async componentDidMount() {
     
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
 

    const count=await AsyncStorage.getItem('count_value')
    this.setState({count:count})
      setTimeout(() => {
        console.log('hitdsfdsaf');
      }, 10000);
        const { counter } = this.state;
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer })
    }
   async componentWillUnmount() {
      
        // clearInterval(this.state.timer);
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });
    }

    tick = () => {
        const { counter } = this.state;
        if (counter == 0) {
          clearInterval(this.state.timer);
        } else {
          this.setState({
            counter: this.state.counter - 1,
          });
        }
    };

    
    otpResend=async()=>{
     const value=await AsyncStorage.getItem('count_value')
     if(value==0){
      AsyncStorage.setItem('count_value',"1")
     }
     else if(value==1){
      AsyncStorage.setItem('count_value',"2")
     }
     else{
      AsyncStorage.setItem('count_value',"3")
     }
      this.props.dispatch({
        type: 'Send_RegOtp_Request',
        url: 'sendotp1',
        name:this.state.name,
        email:this.state.email,
        mobile:this.state.mobile,
        pin:this.state.pin,
        navigation:this.props.navigation
     })
      // try {
      //   const data = new FormData();
      //   data.append('mobile',this.state.mobile)
       
      //   const response = await axios({
      //     method: 'POST',
      //     data,
      //     headers: {
      //       'content-type': 'multipart/form-data',
      //       Accept: 'multipart/form-data',
      //     },
      //     url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/sendotp',
      //   });
      //   if(response.data.status==200){
      //     Toast.show(response.data.messages)
      //     this.setState({counter:this.state.counter+10})
      //   }       
      // } catch (error) {
      //  throw error;
      // }
    }
    validateUser=async()=>{
      const device_type= DeviceInfo.getSystemName()
      let token=await AsyncStorage.getItem(Storage.token);
      if(this.state.type=='Register'){
        
      if(this.state.otp==this.state.otpData){
        AsyncStorage.setItem('count_value','0')
        this.props.dispatch({
          type: 'User_Register_Request',
          url: 'adduserdetails',
          name:this.state.name,
          email:this.state.email,
          mobile:this.state.mobile,
          pin:this.state.pin,
          refferal_code:0,
          mobile_country_code:this.state.countryCode,
          father_spouse_name:0,
          mother_maiden_name:0,
          gender:0,
          dob:0,
          pan:0,
          address1:0,
          address2:0,
          city:0,
          state:0,
          country:0,
          pincode:0,
          residential_status:0,
          profile_pic:0,
          education:0,
          occupation:0,
          marital_status:0,
          navigation: this.props.navigation,
          device_token:token,
          device_type:device_type
       })
      }
      else{
        // this.setState({value:this.state.value +1});
        Toast.show('Please Enter Correct Otp Code')
      }
    }
    else{
      if(this.state.otp==this.state.otpData){
        AsyncStorage.setItem('count_value','0')
        AsyncStorage.setItem(Storage.name,this.state.name)
        AsyncStorage.setItem(Storage.user_id,this.state.user_id)
        AsyncStorage.setItem(Storage.mobile,this.state.mobile)
        AsyncStorage.setItem(Storage.email,this.state.email)
        // AsyncStorage.setItem(Storage.fatherName,this.state.father_spouse_name)
        // AsyncStorage.setItem(Storage.motherName,this.state.mother_maiden_name)
        // AsyncStorage.setItem(Storage.dob,this.state.dob)
        // AsyncStorage.setItem(Storage.gender,this.state.gender)

        // AsyncStorage.setItem(Storage.pan,this.state.pan),
        // AsyncStorage.setItem(Storage.address1,this.state.address1),
        // AsyncStorage.setItem(Storage.address2,this.state.address2),
        // AsyncStorage.setItem(Storage.occupation,this.state.occupation),
        // AsyncStorage.setItem(Storage.pincode,this.state.pincode),
        // AsyncStorage.setItem(Storage.country,this.state.country),
        // AsyncStorage.setItem(Storage.state,this.state.states),
        // AsyncStorage.setItem(Storage.city,this.state.city),
        // AsyncStorage.setItem(Storage.income_group,this.state.income_group),
        // AsyncStorage.setItem(Storage.education,this.state.education),
        // AsyncStorage.setItem(Storage.marital,this.state.marital_status),
        // AsyncStorage.setItem(Storage.residential,this.state.residential_status),
        this.props.navigation.replace('Main')
      }
      else{
        // this.setState({value:this.state.value +1});
        Toast.show('Please Enter Correct Otp Code')
      }
    }
     }
  
    render(){
      console.log('this is country code value',this.state.countryCode);
        return(
            <View style={styles.container}>
             
             <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true} 
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{flex:1}}>
              <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>this.props.navigation.push(this.state.type)}>
                  <Image style={{width:32,height:24}}  source={require('../../../assets/Image/arrowBack.png')}/>
                  </TouchableOpacity>
                  <View style={styles.round}>
                      <Image
                      source={require('../../../assets/Image/logo-icon.png')}/>
                  </View>
                  <View style={{width:'5%'}}></View>
              </View>
               <View style={styles.main}>
               <View style={styles.otpView}>
                <Text style={styles.enter}>Enter OTP</Text>
               <OTPTextInput
                  containerStyle={styles.input}
                  handleTextChange={(code)=>this.setState({otp:code})}
                  inputCount={4}
                  textInputStyle={styles.otp}
                  offTintColor={'white'}
                  tintColor={'white'}
                  
                  />
                  <View style={[styles.textBottom,{marginTop:15}]}>
                      <Text style={styles.your}>
                          {this.state.count>0 ? `You have entered wrong OTP, ${this.state.count} attempt left.`:`Enter the OTP sent on ${this.state.mobile}.`}
                      </Text>
                  </View>
                </View>          
                 <View style={styles.button}>
                     <CustomButton
                     title='CONFIRM OTP'
                     onPress={()=>this.validateUser()}
                     />
                    <View style={[styles.textBottom,{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
                      <Text style={styles.your}>
                          {`Didn’t Receive the OTP?`}
                      </Text>
                      <TouchableOpacity
                      disabled={this.state.counter > 0 || this.state.count==2? true : false}
                      onPress={() => this.otpResend()}
                      >
                      <Text style={[styles.your,{color:this.state.counter>0 || this.state.count==2?'grey':colors.bc,fontWeight:'700'}]}>
                          {` Resend again`}
                      </Text>
                      </TouchableOpacity>
                     </View>
                     {this.state.counter!=0?
                     <Text style={[styles.your,{textAlign:'center'}]}>
                         {`You can request OTP Resend\nafter 0${Math.floor(this.state.counter / 60)}:${(this.state.counter < 10 ? `0${this.state.counter%60}`:this.state.counter%60)} sec`}</Text>
                    :null
                    }
                 </View>                
               </View>
             </KeyboardAwareScrollView>
             <StatusBar/>
           </View>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        isFetching:state.isFetching,
    }
  }
  
  export default connect(mapStateToProps)(OtpVarification)

