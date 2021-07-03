import React,{useState} from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
const OtpVarification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [otp,setOtp]=useState('')
const validateUser=()=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(email)==false){
        Toast.show('Enter Valid Mobile Number')
    }
    else{
        dispatch({
          type: 'Forget_Password_Request',
          url: '',
          mobile,
          navigation: navigation,
        })
      }
}
    return(
        <View style={styles.container}>
         <Header
         title={'SETTING'}
         source={require('../../../assets/Images/drawer.png')}
         onPress={()=>navigation.toggleDrawer()}
         />
          <ScrollView>
           <View style={styles.main}>
             <View>
                  <View style={styles.first}>
                        <Image source={require('../../../assets/Images/profile.png')}/>
                        <Text style={styles.personal}>Personal info</Text>
                  </View>
                  <View style={styles.border}></View>
             </View>
            
             <View style={{marginTop:20}}>
                  <View style={styles.first}>
                        <Image source={require('../../../assets/Images/noti.png')}/>
                        <Text style={styles.personal}>{`Notification & emails`}</Text>
                  </View>
                  <View style={styles.border}></View>
             </View>
             <View style={{marginTop:20}}>
                  <View style={styles.first}>
                        <Image source={require('../../../assets/Images/help.png')}/>
                        <Text style={styles.personal}>{`Help & feedback`}</Text>
                  </View>
                  <View style={styles.border}></View>
             </View>
             <View style={{marginTop:20}}>
                  <View style={styles.first}>
                        <Image source={require('../../../assets/Images/privacy.png')}/>
                        <Text style={styles.personal}>{`Privacy & security`}</Text>
                  </View>
                  <View style={styles.border}></View>
             </View>
             <View style={{marginTop:20,marginBottom:20}}>
                  <View style={styles.first}>
                        <Image source={require('../../../assets/Images/logout.png')}/>
                        <Text style={styles.personal}>Sign out</Text>
                  </View>
                  <View style={styles.border}></View>
             </View>
           </View>
         </ScrollView>
         <StatusBar/>
         <BottomTab/>
       </View>
    )
}
export default OtpVarification;
