import React,{useEffect} from "react";
import { View,Text,StyleSheet,ScrollView, Image ,BackHandler} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../component/header";
import styles from './styles';
import CustomButton from '../../../../component/button1';
const Confirmation=({route})=>{
  const navigation=useNavigation()

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick=() =>{
    if(navigation.isFocused()){
      navigation.navigate('Main')
    return true;
    }
  }

  return(
    <View style={styles.container}>
        {/* <Header
            //  title={'CONFIRMATION'}
           /> */}
           <View style={{paddingHorizontal:15,paddingVertical:20}}>
             <View style={[styles.card]}>
                 <View style={{marginTop:30}}>
                <View style={{alignItems:'center',justifyContent:'center'}}> 
                    <Image style={{width:80,height:80}} source={require('../../../../assets/Image/qwe.png')}/>
                 </View>
                 <Text style={{fontSize:21,fontFamily:'Montserrat-Bold'}}>
                 Thank you for confirming your payment details!
                 </Text>
                 <Text style={{fontSize:16,fontFamily:'Montserrat-Normal',marginTop:20}}>
                 Kindly allow us to verify the same. We will inform you once your payment has been confirmed. You are not losing any interest in between. The interest will start accruing from the official date of receipt of payment.
                 </Text>
                 <View style={{marginBottom:40}}/>
                 </View>
             
             </View>
           <View style={{paddingVertical:10}}>
           
             <View style={{paddingHorizontal:15,marginTop:20}}>
              <CustomButton 
              onPress={()=>navigation.navigate('Main')}
              title={'Go To Dashboard'}/>
             </View>
             <View style={{paddingHorizontal:15,marginTop:20}}>
              <CustomButton 
              onPress={()=>navigation.replace('MyFD')}
              title={'Go To My FD'}/>
             </View>
             </View>
        </View>
    </View>
  )
}
export default Confirmation;