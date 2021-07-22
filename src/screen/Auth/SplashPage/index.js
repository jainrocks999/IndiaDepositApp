import React,{useEffect} from 'react';
import { View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
const Splash=()=>{
    const navigation=useNavigation()
    useEffect(() => {
        initial();
      }, []);
      const initial = async () => {
         setTimeout(() => navigation.replace("Login"), 2000);
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