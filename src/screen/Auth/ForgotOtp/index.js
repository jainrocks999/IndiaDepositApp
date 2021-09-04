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
        };
      }
    componentDidMount() {
        console.log('just cheking',this.state.email,this.state.mobile);
        const { counter } = this.state;
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });
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

    
    otpResend=()=>{
        if(!this.state.email){
            dispatch({
                type: 'Forget_Password_Request',
                url: 'verfiyopt',
                mobile,
                navigation
              })
        }
        else{
            dispatch({
                type: 'Forget_Password_Request',
                url: 'verfiyopt',
                email,
                navigation
              })
        }
       

    }
    validateUser=()=>{
      if(this.state.otp==this.state.otpData){
          if(!this.state.email){
              console.log('this is mobile value');
             this.props.navigation.replace('CreatePin',{
            mobile:this.state.mobile
            })
         }
        else{
            console.log('this is email value');
            this.props.navigation.replace('CreatePin',{
                email:this.state.email
                })
        }
      }
      else{
        Toast.show('Please Enter Correct Otp Code')
      }
     }
  
    render(){
        console.log('this is construxskf',this.state.otpData,this.state.mobile);
        return(
            <View style={styles.container}>
             
              <KeyboardAwareScrollView>
              <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Image source={require('../../../assets/Image/arrowBack.png')}/>
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
                          {`Enter the OTP sent to your ${this.state.mobile==null?'email address':'mobile number'}.`}
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
                      disabled={this.state.counter > 0 ? true : false}
                      onPress={() => this.otpResend()}
                      >
                      <Text style={[styles.your,{color:this.state.counter>0?'grey':colors.bc}]}>
                          {`Resend again`}
                      </Text>
                      </TouchableOpacity>
                     </View>
                     {this.state.counter!=0?
                     <Text style={[styles.your,{textAlign:'center'}]}>
                         {`You can request OTP Resend\nafter ${Math.floor(this.state.counter / 60)}:${this.state.counter % 60}  minutes!`}</Text>
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