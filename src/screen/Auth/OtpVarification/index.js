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
import * as Root from "../../../navigator/rootNavigation";
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
          countryCode:this.props.route.params.countryCode,
          attempt:this.props.route.params.attempt,
          referal:this.props.route.params.referal,
          old_number:'',
        };
      }

      backAction = () => {
        this.props.navigation.push(this.state.type)
        return true;
      };
    
   async componentDidMount() {
     const number=await AsyncStorage.getItem('old_number')
     this.setState({old_number:number})
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
    AsyncStorage.setItem('old_number',this.state.mobile)
      this.props.dispatch({
        type: 'Resend_Otp_Request',
        url: 'resendotp',
        mobile:this.state.mobile,
        navigation:this.props.navigation,
        user_id:this.state.user_id,
        type1:this.state.type,
     })
    }
    validateUser=async()=>{
      const device_type= DeviceInfo.getSystemName()
      const token=await AsyncStorage.getItem(Storage.token);
      const name=await AsyncStorage.getItem(Storage.Rname);
      const email=await AsyncStorage.getItem(Storage.Remail);
      const mobile=await AsyncStorage.getItem(Storage.Rmobile);
      const pin=await AsyncStorage.getItem(Storage.Rpin);
      const countryCode=await AsyncStorage.getItem(Storage.RcountryCode);
      const referal=await AsyncStorage.getItem(Storage.Rreferal);
      const user=await AsyncStorage.getItem('user')

      if(this.state.otpData==''){
        Toast.show('Your number has been blocked for a day due to maximum number of wrong attempts.')
      }
      else{
      if(this.state.type=='Register'){
      if(this.state.otp==this.state.otpData){
        this.props.dispatch({
          type: 'User_Register_Request',
          url: 'adduserdetails',
          name:name,
          email:email,
          mobile:mobile,
          pin:pin,
          refferal_code:referal,
          mobile_country_code:countryCode,
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
        Toast.show('Please Enter Correct Otp Code')
      }
    }
    else{
      if(this.state.otp==this.state.otpData){
        AsyncStorage.setItem('count_value','0')
        AsyncStorage.setItem(Storage.name,name)
        AsyncStorage.setItem(Storage.user_id,user)
        AsyncStorage.setItem(Storage.mobile,mobile)
        AsyncStorage.setItem(Storage.email,email)
        AsyncStorage.setItem("KeepmeLogin",JSON.stringify(0))
        this.props.navigation.replace('Main')
      }
      else{
        Toast.show('Please Enter Correct Otp Code')
        }
       }
      }
     }
  renderCount=()=>{
    if(this.state.old_number==this.state.mobile){
      return(
        <View style={[styles.textBottom,{marginTop:15}]}>
        <Text style={styles.your}>
            {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.mobile}.`}
        </Text>
    </View>
      )
    }
    else{
      return(
        <View style={[styles.textBottom,{marginTop:15}]}>
        <Text style={styles.your}>
         { `Enter the OTP sent on ${this.state.mobile}.`}
        </Text>
    </View>
      )
    }
   
  }
    render(){
      console.log('this is country code value',this.props.attempt);
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
                  offTintColor={colors.bc}
                  tintColor={colors.bc}
                  
                  />
                  {this.renderCount()}
                 
                </View>          
                 <View style={styles.button}>
                     <CustomButton
                     title='CONFIRM OTP'
                     onPress={()=>this.validateUser()}
                     />
                     {this.state.otpData==''?<View/>
                     : <View>
                    <View style={[styles.textBottom,{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
                      <Text style={styles.your}>
                          {`Didn’t Receive the OTP?`}
                      </Text>
                      <TouchableOpacity
                      disabled={this.state.counter > 0 ? true : false}
                      onPress={() => this.otpResend()}
                      >
                      <Text style={[styles.your,{color:this.state.counter>0 ?'grey':colors.bc,fontWeight:'700'}]}>
                          {` Resend again`}
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
        attempt:state.ResendData
    }
  }
  
  export default connect(mapStateToProps)(OtpVarification)

  //import React,{useState} from 'react';
  // import { View,Text,Image,BackHandler} from 'react-native';
  // import CustomButton from '../../../component/button1';
  // import styles from './styles';
  // import Toast from 'react-native-simple-toast';
  // import StatusBar from '../../../component/StatusBar';
  // import OTPTextInput  from 'react-native-otp-textinput';
  // import colors from '../../../component/colors';
  // import { TouchableOpacity } from 'react-native';
  // import {connect} from 'react-redux';
  // import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  // import AsyncStorage from '@react-native-community/async-storage';
  // import Storage from '../../../component/AsyncStorage';
  // import axios from 'axios';
  // import DeviceInfo from 'react-native-device-info';
  // import * as Root from "../../../navigator/rootNavigation";
  // class OtpVarification extends React.Component{
  //     constructor(props) {
  //         super(props);
  //         this.state = {
  //           otp:'',
  //           timer: null,
  //           counter: 12,
  //           user_id:this.props.route.params.user_id,
  //           otpData:this.props.route.params.otp,
  //           mobile:this.props.route.params.mobile,
  //           name:this.props.route.params.name,
  //           email:this.props.route.params.email,
  //           type:this.props.route.params.type,
  //           pin:this.props.route.params.pin,
  //           count:0,
  //           countryCode:this.props.route.params.countryCode,
  //           attempt:this.props.route.params.attempt,
  //           referal:this.props.route.params.referal,
  //           attemptbool:this.props.route.params.attemptbool,
  //           old_number:'',
  //           boolean:true
  
  //         };
  //       }
  
  //       backAction = () => {
  //         this.props.navigation.push(this.state.type)
  //         return true;
  //       };
      
  //    async componentDidMount() {
  //      const number=await AsyncStorage.getItem('old_number')
  //      this.setState({old_number:number})
  //     this.backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       this.backAction
  //     );
   
  
  //     const count=await AsyncStorage.getItem('count_value')
  //     this.setState({count:count})
  //       setTimeout(() => {
  //         console.log('hitdsfdsaf');
  //       }, 10000);
  //         const { counter } = this.state;
  //         let timer = setInterval(this.tick, 1000);
  //         this.setState({ timer })
  //     }
  //    async componentWillUnmount() {
        
  //         // clearInterval(this.state.timer);
  //         let timer = setInterval(this.tick, 1000);
  //         this.setState({ timer });
  //     }
  
  //     tick = () => {
  //         const { counter } = this.state;
  //         if (counter == 0) {
  //           clearInterval(this.state.timer);
  //         } else {
  //           this.setState({
  //             counter: this.state.counter - 1,
  //           });
  //         }
  //     };
  
      
  //     otpResend=async()=>{
       
  //     AsyncStorage.setItem('old_number',this.state.mobile)
  //     if(this.state.attemptbool==undefined){
  //       if(this.state.boolean==true){
  //         this.props.dispatch({
  //           type: 'Resend_Otp_Request',
  //           url: 'resendotp',
  //           mobile:this.state.mobile,
  //           navigation:this.props.navigation,
  //           user_id:this.state.user_id,
  //           type1:this.state.type,
  //           boolean:this.state.boolean
  //        })
  //       }
  //       else if(this.state.boolean==false){
  //         this.props.dispatch({
  //           type: 'Resend_Otp_Request',
  //           url: 'resendotp',
  //           mobile:this.state.mobile,
  //           navigation:this.props.navigation,
  //           user_id:this.state.user_id,
  //           type1:this.state.type,
  //           boolean:''
  //        })
  //       }    
  //     }
  //     else{
  //       this.props.dispatch({
  //         type: 'Resend_Otp_Request',
  //         url: 'resendotp',
  //         mobile:this.state.mobile,
  //         navigation:this.props.navigation,
  //         user_id:this.state.user_id,
  //         type1:this.state.type,
  //         boolean:this.state.attemptbool=='false'?'':true
  //      })
  //   }
        
  //     }
  //     validateUser=async()=>{
  //       const device_type= DeviceInfo.getSystemName()
  //       const token=await AsyncStorage.getItem(Storage.token);
  //       const name=await AsyncStorage.getItem(Storage.Rname);
  //       const email=await AsyncStorage.getItem(Storage.Remail);
  //       const mobile=await AsyncStorage.getItem(Storage.Rmobile);
  //       const pin=await AsyncStorage.getItem(Storage.Rpin);
  //       const countryCode=await AsyncStorage.getItem(Storage.RcountryCode);
  //       const referal=await AsyncStorage.getItem(Storage.Rreferal);
  //       const user=await AsyncStorage.getItem('user')
  //       this.setState({
  //         boolean:false
  //       })
  //       if(this.state.otpData==''){
  //         Toast.show('Your number has been blocked for a day due to maximum number of wrong attempts.')
  //       }
  //       else{
  //       if(this.state.type=='Register'){
  //       if(this.state.otp==this.state.otpData){
  //         this.props.dispatch({
  //           type: 'User_Register_Request',
  //           url: 'adduserdetails',
  //           name:name,
  //           email:email,
  //           mobile:mobile,
  //           pin:pin,
  //           refferal_code:referal,
  //           mobile_country_code:countryCode,
  //           father_spouse_name:0,
  //           mother_maiden_name:0,
  //           gender:0,
  //           dob:0,
  //           pan:0,
  //           address1:0,
  //           address2:0,
  //           city:0,
  //           state:0,
  //           country:0,
  //           pincode:0,
  //           residential_status:0,
  //           profile_pic:0,
  //           education:0,
  //           occupation:0,
  //           marital_status:0,
  //           navigation: this.props.navigation,
  //           device_token:token,
  //           device_type:device_type
  
  //        })
  //       }
  //       else{
  //         Toast.show('Please Enter Correct Otp Code')
  //       }
  //     }
  //     else{
  //       if(this.state.otp==this.state.otpData){
  //         AsyncStorage.setItem('count_value','0')
  //         AsyncStorage.setItem(Storage.name,name)
  //         AsyncStorage.setItem(Storage.user_id,user)
  //         AsyncStorage.setItem(Storage.mobile,mobile)
  //         AsyncStorage.setItem(Storage.email,email)
  //         AsyncStorage.setItem("KeepmeLogin",JSON.stringify(0))
  //         this.props.navigation.replace('Main')
  //       }
  //       else{
  //         Toast.show('Please Enter Correct Otp Code')
  //         }
  //        }
  //       }
  //      }
  //   renderCount=()=>{
  //     if(this.state.attemptbool=='false'){
  //     if(this.state.old_number==this.state.mobile){
  //       return(
  //         <View style={[styles.textBottom,{marginTop:15}]}>
  //         <Text style={styles.your}>
  //             {this.props.attempt? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`:`Enter the OTP sent on ${this.state.mobile}.`}
  //         </Text>
  //     </View>
  //       )
  //     }
  //     else{
  //       return(
  //         <View style={[styles.textBottom,{marginTop:15}]}>
  //         <Text style={styles.your}>
  //          { `Enter the OTP sent on ${this.state.mobile}.`}
  //         </Text>
  //     </View>
  //       )
  //     }
  //     }
  //     else if(this.state.attemptbool=='true'){
  //       if(this.props.attempt){
  //         if(this.props.attempt.attempt==0){
  //           return(
  //           <Text style={styles.your}>
  //           { `0 attempt left.`}
  //          </Text>
  //           )
  //         }
  //         else{
  //           return(
  //             <Text style={styles.your}>
  //             { `${5-this.props.attempt.attempt} attempt left.`}
  //            </Text>
  //           )
  //         }
  //       }
  //       else{
  //         return(
  //           <Text style={styles.your}>
  //           { `Enter the OTP sent on ${this.state.mobile}.`}
  //          </Text>
  //         )
  //       }
  //     } 
  //     else{
  //       return(
  //         <Text style={styles.your}>
  //           { `Enter the OTP sent on ${this.state.mobile}.`}
  //          </Text>
  //       )
  //     }
  //   }
  //     render(){
  //       // console.log('this is country code value',this.state.attemptbool,this.props.attempt);
  //         return(
  //             <View style={styles.container}>
               
  //              <KeyboardAwareScrollView
  //           extraScrollHeight={10}
  //           enableOnAndroid={true} 
  //           keyboardShouldPersistTaps='handled'
  //           contentContainerStyle={{flex:1}}>
  //               <View style={styles.imageContainer}>
  //                   <TouchableOpacity onPress={()=>this.props.navigation.push(this.state.type)}>
  //                   <Image style={{width:32,height:24}}  source={require('../../../assets/Image/arrowBack.png')}/>
  //                   </TouchableOpacity>
  //                   <View style={styles.round}>
  //                       <Image
  //                       source={require('../../../assets/Image/logo-icon.png')}/>
  //                   </View>
  //                   <View style={{width:'5%'}}></View>
  //               </View>
  //                <View style={styles.main}>
  //                <View style={styles.otpView}>
  //                 <Text style={styles.enter}>Enter OTP</Text>
  //                <OTPTextInput
  //                   containerStyle={styles.input}
  //                   handleTextChange={(code)=>this.setState({otp:code})}
  //                   inputCount={4}
  //                   textInputStyle={styles.otp}
  //                   offTintColor={colors.bc}
  //                   tintColor={colors.bc}
  //                   />
  //                   {this.renderCount()}
                   
  //                 </View>          
  //                  <View style={styles.button}>
  //                      <CustomButton
  //                      title='CONFIRM OTP'
  //                      onPress={()=>this.validateUser()}
  //                      />
  //                      {this.state.otpData==''?<View/>
  //                      : <View>
  //                     <View style={[styles.textBottom,{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}]}>
  //                       <Text style={styles.your}>
  //                           {`Didn’t Receive the OTP?`}
  //                       </Text>
  //                       <TouchableOpacity
  //                       disabled={this.state.counter > 0 ? true : false}
  //                       onPress={() => this.otpResend()}
  //                       >
  //                       <Text style={[styles.your,{color:this.state.counter>0 ?'grey':colors.bc,fontWeight:'700'}]}>
  //                           {` Resend again`}
  //                       </Text>
  //                       </TouchableOpacity>
  //                      </View>
  //                      {this.state.counter!=0?
  //                      <Text style={[styles.your,{textAlign:'center'}]}>
  //                          {`You can request OTP Resend\nafter 0${Math.floor(this.state.counter / 60)}:${(this.state.counter < 10 ? `0${this.state.counter%60}`:this.state.counter%60)} sec`}</Text>
  //                     :null
  //                     }
  //                     </View>}
  //                  </View>                
  //                </View>
  //              </KeyboardAwareScrollView>
  //              <StatusBar/>
  //            </View>
  //         )
  //     }
  // }
  // const mapStateToProps=(state)=>{
  //     return{
  //         isFetching:state.isFetching,
  //         attempt:state.ResendData
  //     }
  //   }
    
  //   export default connect(mapStateToProps)(OtpVarification)
  