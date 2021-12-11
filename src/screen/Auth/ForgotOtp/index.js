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
import OtpInputs from 'react-native-otp-inputs';

class OtpVarification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          otp:'',
          timer: null,
          counter: 30,
          otpData:this.props.route.params.otp,
          mobile:this.props.route.params.mobile,
          email:this.props.route.params.email,
          attemptbool:this.props.route.params.attemptbool,
          boolean2:this.props.route.params.boolean2,
          boolean:true,
          count:0,
          old_email:'',
          old_mobile:'',
          enable:true

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
        if(this.props.attempt.attempt==0){
          this.setState({enable:false})
          setTimeout(() => {
            this.setState({enable:true})
          }, 65000);
        }
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
      console.log('this is attempt bool',this.state.attemptbool,this.state.boolean);

      if(this.state.attemptbool==undefined){
        if(this.state.boolean==true){
          if(this.state.mobile){
            this.props.dispatch({
              type: 'Resen_Otp_Request',
              url: 'resendotp',
              mobile:this.state.mobile,
              navigation:this.props.navigation,
              boolean:this.state.boolean
           })
          }
          else{
            this.props.dispatch({
              type: 'Resen_Otp_Request',
              url: 'resendotp',
              email:this.state.email,
              navigation:this.props.navigation,
              boolean:this.state.boolean
           })
          }
        }
        else if(this.state.boolean==false){
          if(this.state.mobile){
            this.props.dispatch({
              type: 'Resen_Otp_Request',
              url: 'resendotp',
              mobile:this.state.mobile,
              navigation:this.props.navigation,
              boolean:''
           })
          }
          else{
            this.props.dispatch({
              type: 'Resen_Otp_Request',
              url: 'resendotp',
              email:this.state.email,
              navigation:this.props.navigation,
              boolean:''
           })
          }
        }    
      }
      else if(this.state.attemptbool=="false"){
        if(this.state.mobile){
          this.props.dispatch({
            type: 'Resen_Otp_Request',
            url: 'resendotp',
            mobile:this.state.mobile,
            navigation:this.props.navigation,
            boolean:''
         })
        }
        else{
          this.props.dispatch({
            type: 'Resen_Otp_Request',
            url: 'resendotp',
            email:this.state.email,
            navigation:this.props.navigation,
            boolean:''
         })
        }
       
    }
    else if(this.state.boolean==false&&this.state.attemptbool=="true"){
      if(this.state.mobile){
        this.props.dispatch({
          type: 'Resen_Otp_Request',
          url: 'resendotp',
          mobile:this.state.mobile,
          navigation:this.props.navigation,
          boolean:true,
          boolean2:this.state.boolean
       })
      }
      else{
        this.props.dispatch({
          type: 'Resen_Otp_Request',
          url: 'resendotp',
          email:this.state.email,
          navigation:this.props.navigation,
          boolean:true,
          boolean2:this.state.boolean
       })
      }
    }
    else if(this.state.boolean==true&&this.state.attemptbool=="true"){
      if(this.state.mobile){
        this.props.dispatch({
          type: 'Resen_Otp_Request',
          url: 'resendotp',
          mobile:this.state.mobile,
          navigation:this.props.navigation,
          boolean:this.state.boolean
       })
      }
      else{
        this.props.dispatch({
          type: 'Resen_Otp_Request',
          url: 'resendotp',
          email:this.state.email,
          navigation:this.props.navigation,
          boolean:this.state.boolean
       })
      }
    }
    }
    validateUser=()=>{
      AsyncStorage.setItem('old_mobile',this.state.mobile)
      AsyncStorage.setItem('old_email',this.state.email)
      if(this.props.attempt.messages=='You have reached the maximum number of attempts. Try after 1 minute!'){
        if(this.state.email){
          // Toast.show('Your email has been blocked for 1 minute due to maximum number of wrong attempts.')
        }else{
          // Toast.show('Your number has been blocked for 1 minute due to maximum number of wrong attempts.')
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
        if(this.state.otp==''||this.state.otp.length<4){
          Toast.show('Please Enter Otp')
        }else{
          this.setState({
            boolean:false
          })
        Toast.show('Please Enter Correct Otp Code')
        if(this.state.email){
          console.log('this. is working');
        this.props.dispatch({
          type: 'Verifyf_Otp_Request',
          url: 'verifyotp',
          email:this.state.email,
          navigation:this.props.navigation,
          boolean:this.state.attemptbool=='true'?true:'',
          otp:this.state.otpData
       })
      }
      else{
        this.props.dispatch({
          type: 'Verifyf_Otp_Request',
          url: 'verifyotp',
          mobile:this.state.mobile,
          navigation:this.props.navigation,
          boolean:this.state.attemptbool=='true'?true:'',
          otp:this.state.otpData
       })
      }
    }
      this.setState({otp:''})
    }
    }
     }
   manageAttempt=()=>{
    if(this.state.attemptbool=='false'){
     if(this.state.mobile){
       if(this.state.mobile==this.state.old_mobile){
        if(this.props.attempt.messages=='You have reached the maximum number of attempts. Try after 1 minute!'){
          return(
            <View style={[styles.textBottom,{marginTop:15}]}>
                <Text style={styles.your}>
                { `You have reached the maximum number of attempts. Try after 1 minute!`}
                </Text>
           </View>
           )
        }
        else if(this.props.attempt.attempt==0){
          return(
            <View style={[styles.textBottom,{marginTop:15}]}>
                <Text style={styles.your}>
                {/* { `You have reached the maximum number of attempts. Try after 1 minute!`} */}
                </Text>
           </View>
           )
        }
        else{
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
          
              <Text style={styles.your}>
              {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.mobile}.`}              </Text>
         </View>
         )
        }
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
       if(this.state.email==this.state.old_email){
         if(this.props.attempt.messages=='You have reached the maximum number of attempts. Try after 1 minute!'){
          return(
            <View style={[styles.textBottom,{marginTop:15}]}>
                <Text style={styles.your}>
                { `You have reached the maximum number of attempts. Try after 1 minute!`}
                 </Text>
            </View>
           )
         }
         else if(this.props.attempt.attempt==0){
          return(
            <View style={[styles.textBottom,{marginTop:15}]}>
                <Text style={styles.your}>
                {/* { `You have reached the maximum number of attempts. Try after 1 minute!`} */}
                 </Text>
            </View>
           )
         }
         else{
        return(
          <View style={[styles.textBottom,{marginTop:15}]}>
              <Text style={styles.your}>
              {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.email}.`}             
               </Text>
          </View>
         )}
       }
       else{
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
    else if(this.state.attemptbool=='true'){
      if(this.props.attempt){
        if(this.props.attempt.messages=='You have reached the maximum number of attempts. Try after 1 minute!'){
          return(
          <Text style={[styles.your,{marginTop:15}]}>
        { `You have reached the maximum number of attempts. Try after 1 minute!`}
         </Text>
          )
        }
        else if(this.props.attempt.attempt==0){
          return(
            <Text style={[styles.your,{marginTop:15}]}>
          {/* { `You have reached the maximum number of attempts. Try after 1 minute!`} */}
           </Text>
            )
        }
        else{
          if(this.state.boolean2==false){
            return(
              <Text style={[styles.your,{marginTop:15}]}>
              { `You have entered wrong OTP, ${3-this.props.attempt.attempt} attempt left.`}
             </Text>
            )
          }
          return(
            <Text style={[styles.your,{marginTop:15}]}>
            { `${3-this.props.attempt.attempt} attempt left.`}
           </Text>
          )
        }
      }
      else{
        if(this.state.mobile){
        return(
          <Text style={[styles.your,{marginTop:15}]}>
          { `Enter the OTP sent on ${this.state.mobile}.`}
         </Text>
        )
        }
        else{
          return(
            <Text style={[styles.your,{marginTop:15}]}>
            { `Enter the OTP sent on ${this.state.email}.`}
           </Text>
          )
        }
      }
    }
    else{
      if(this.state.mobile){
      return(
        <Text style={[styles.your,{marginTop:15}]}>
          { `Enter the OTP sent on ${this.state.mobile}.`}
         </Text>
      )
      }
      else{
        return(
          <Text style={[styles.your,{marginTop:15}]}>
            { `Enter the OTP sent on ${this.state.email}.`}
           </Text>
        )
      }
    }
   }  
    render(){
      console.log('this is otp',this.state.otp);
      console.log('this is otp data',this.state.otpData);

        return(
            <View style={styles.container}>
             
              <KeyboardAwareScrollView>
              <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Forget')}>
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
                <OtpInputs
                      handleChange={(code)=>this.setState({otp:code})}
                      numberOfInputs={4}
                      keyboardType={"numeric"}
                      // secureTextEntry ={visible}
                      style={{justifyContent:'space-between',
                      alignItems:'center',flexDirection:'row',width:'100%',marginTop:8}}
                       inputContainerStyles={[styles.otp,{borderWidth:0}]}
                      focusStyles={{borderWidth:1,borderColor:colors.bc}}
                      inputStyles={{
                        fontSize:16,
                        color:colors.textColor,
                        width:50,
                        alignContent:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        textAlign:'center',
                        borderRadius:10,
                        borderWidth:0
                       }}
                    //  returnKeyType='go'
                    //   onSubmitEditing={()=>handleSubmit()}
                    />
               {/* <OTPTextInput
                  containerStyle={styles.input}
                  handleTextChange={(code)=>this.setState({otp:code})}
                  inputCount={4}
                  textInputStyle={styles.otp}
                  offTintColor={colors.bc}
                  tintColor={colors.bc}
                  
                  /> */}
                 {this.manageAttempt()}
                </View>          
                 <View style={styles.button}>
                     <CustomButton
                     title='CONFIRM OTP'
                     onPress={()=>this.validateUser()}
                     />
                   {this.state.enable==true? <View>
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
                    </View>:<View/>}
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
