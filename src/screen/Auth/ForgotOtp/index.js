import React,{useState} from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
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
class OtpVarification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          otp:'',
          timer: null,
          counter: 12,
          otpData:this.props.route.params.otp,
          mobile:this.props.route.params.mobile,
          email:this.props.route.params.email,
          count:0,
          old_email:'',
          old_mobile:''
        };
      }
    async componentDidMount() {
        const { counter } = this.state;
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });
        const mobile=   await AsyncStorage.getItem('old_mobile')
        const email=  await AsyncStorage.getItem('old_email')
  
        this.setState({old_mobile:mobile})  
        this.setState({old_email:email})  
  
        const count=await AsyncStorage.getItem('otp_value')
        this.setState({count:count})
    }
    
    componentWillUnmount() {
        clearInterval(this.state.timer);
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
      AsyncStorage.setItem('old_mobile',this.state.mobile)
      AsyncStorage.setItem('old_email',this.state.email)
      if(this.state.mobile){
      this.props.dispatch({
        type: 'Resen_Otp_Request',
        url: 'resendotp',
        mobile:this.state.mobile,
        navigation:this.props.navigation,
     })
    }
    else{
      this.props.dispatch({
        type: 'Resen_Otp_Request',
        url: 'resendotp',
        email:this.state.email,
        navigation:this.props.navigation,
     })
    }
    }
    validateUser=()=>{
    
      if(this.state.otpData==''){
        if(this.state.email){
          Toast.show('Your email has been blocked for a day due to maximum number of wrong attempts.')
        }else{
          Toast.show('Your number has been blocked for a day due to maximum number of wrong attempts.')
        }
      
      }
      else{
      if(this.state.otp==this.state.otpData){
          if(!this.state.email){
            AsyncStorage.setItem('old_mobile','')
      
             this.props.navigation.replace('CreatePin',{
             mobile:this.state.mobile
            })
         }
        else{
          AsyncStorage.setItem('old_email','')
            this.props.navigation.replace('CreatePin',{
                email:this.state.email
                })
        }
      }
      else{
        Toast.show('Please Enter Correct Otp Code')
      }
    }
     }
   manageAttempt=()=>{
     if(this.state.mobile){
       if(this.state.mobile==this.state.old_mobile){
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
          
              <Text style={styles.your}>
              {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.mobile}.`}              </Text>
         </View>
         )
       }
       else{
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
            
              <Text style={styles.your}>
              {`Enter the OTP sent on ${this.state.mobile}.`}             
               </Text>
         </View>
         )
       }
    
     }
     else if(this.state.email){
       console.log('hi',this.state.email,this.state.old_email);
       if(this.state.email==this.state.old_email){
         console.log('hello');
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
           
              <Text style={styles.your}>
              {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.email}.`}             
               </Text>
          </View>
         )
       }
       else{
        console.log('hi working' );
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
          
              <Text style={styles.your}>
                {`Enter the OTP sent on ${this.state.email}.`}
              </Text>
          </View>
         )
       }
      
     }
   }  
    render(){
        console.log('this is construxskf',this.state.otpData,this.props.attempt);
        return(
            <View style={styles.container}>
             
              <KeyboardAwareScrollView>
              <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Image style={{width:32,height:24}} source={require('../../../assets/Image/arrowBack.png')}/>
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
                  offTintColor={colors.bc}
                  tintColor={colors.bc}
                  />
                 {this.manageAttempt()}
                </View>          
                 <View style={styles.button}>
                     <CustomButton
                     title='CONFIRM OTP'
                     onPress={()=>this.validateUser()}
                     />
                    {this.state.otpData=='' ? <View/> :<View>
                    <View style={[styles.textBottom,{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
                      <Text style={styles.your}>
                          {`Didn’t Receive the OTP?`}
                      </Text>
                      <TouchableOpacity
                      disabled={this.state.counter > 0 || this.state.count==2 ? true : false}
                      onPress={() => this.otpResend()}
                      >
                      <Text style={[styles.your,{color:this.state.counter || this.state.count==2 ?'grey':colors.bc,fontWeight:'700'}]}>
                          {`Resend again`}
                      </Text>
                      </TouchableOpacity>
                     </View>
                     {this.state.counter!=0?
                     <Text style={[styles.your,{textAlign:'center'}]}>
                         {`You can request OTP Resend\nafter 0${Math.floor(this.state.counter / 60)}:${(this.state.counter < 10 ? `0${this.state.counter%60}`:this.state.counter%60)} sec`}</Text>
                    :null
                    }
                    </View>}
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
        attempt:state.ResenData
    }
  }
  
  export default connect(mapStateToProps)(OtpVarification)
