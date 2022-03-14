import React,{useEffect} from "react";
import { View,Text,StyleSheet,ScrollView, Image,BackHandler } from "react-native";
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
    <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        {/* <Header
            //  title={'CONFIRMATION'}
           /> */}
           <View style={{paddingHorizontal:15,paddingVertical:20}}>
             <View style={[styles.card]}>
                 <View style={{marginTop:30}}>
                <View style={{alignItems:'center',justifyContent:'center'}}> 
                    <Image style={{width:80,height:80}} source={require('../../../../assets/Image/qwe.png')}/>
                 </View>
                 <View style={{alignItems:'center'}}>
                 <Text style={{fontSize:21,fontFamily:'Montserrat-Bold',textAlign:'center'}}>
                 Your request for FD redemption has been submitted!
                 </Text>
                 </View>
                 <Text style={{fontSize:16,fontFamily:'Montserrat-Regular',marginTop:20,textAlign:'center'}}>
                 Kindly allow us to verify the same. We will inform you once your payment has been confirmed.
                 </Text>
                 <View style={{marginBottom:40}}/>
                 </View>
             
             </View>
           <View style={{paddingVertical:10}}>
           
             <View style={{paddingHorizontal:15,marginTop:40}}>
              <CustomButton 
              onPress={()=>navigation.navigate('Main')}
              title={'Go To Dashboard'}/>
             </View>
             <View style={{paddingHorizontal:15,marginTop:20}}>
             </View>
             </View>
        </View>
    </View>
  )
}
export default Confirmation;