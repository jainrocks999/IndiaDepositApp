import React,{useEffect} from 'react';
import { View,Image,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import styles from './style';
import colors from '../../../component/colors';
const Splash=()=>{
    const navigation=useNavigation()
    useEffect(async() => {
      const status=await AsyncStorage.getItem(Storage.status)
        initial(status);
      }, []);
      const initial = async (status) => {
        if (status!=200) {
         setTimeout(() => navigation.replace("Introduction"), 2000);
        } else {
           setTimeout(() => navigation.replace("Introduction"), 2000);
        }
      }
    return(
        <View style={styles.container}>
            <View style={styles.main}>
                  <Image style={styles.image} 
                  source={require('../../../assets/Images/IndiaDeposit.png')}/>
                <View style={{bottom:30,position:'absolute',width:'100%'}}>
                  <View style={{alignItems:'center'}}>
                <Text style={{color:colors.white,fontFamily:'Montserrat-SemiBold',fontSize:22,marginBottom:20}}>We secure your details</Text>
                </View>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:80}}>
                   <Image  source={require('../../../assets/Image/iso.png')}/>
                   <Image source={require('../../../assets/Image/ssl.png')}/>
                 </View>
                </View>
            </View>
            
        </View>
    )
}
export default Splash;