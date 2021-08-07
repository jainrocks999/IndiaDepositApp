import React,{useEffect} from 'react';
import { View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import styles from './style';
const Splash=()=>{
    const navigation=useNavigation()
    useEffect(async() => {
      const status=await AsyncStorage.getItem(Storage.status)
        initial(status);
      }, []);
      const initial = async (status) => {
        if (status!=200) {
          setTimeout(() => navigation.replace("Login"), 2000);
        } else {
          setTimeout(() => navigation.replace("Login"), 2000);
        }
      }
    return(
        <View style={styles.container}>
            <View style={styles.main}>
            <Image style={styles.image} 
             source={require('../../../assets/Images/IndiaDeposit.png')}/>
               </View>
        </View>
    )
}
export default Splash;