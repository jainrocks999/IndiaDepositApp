import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import Button from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';


const Introduction=({route})=>{
    const navigation=useNavigation()
    const data=route.params
      console.log('this is data information',data);
    return(
        <View style={styles.container}>
          <ScrollView style={{flex:1}}>
             <View style={styles.imageContainer}>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
              <Text style={styles.india}>IndiaDeposit</Text>
            </View>
                <View style={{alignItems:'center',justifyContent:'center',marginTop:20,width:'100%',height:290,padding:10}}>
                <Image style={{width:'95%',height:'90%'}}
                      source={{uri:data.image_url}}/>
                </View>
           <View style={styles.main}>
                <View style={styles.lorem}>
                  <Text style={styles.heading}>{data.intro_speech}</Text>
                </View>
             <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Login')} 
                style={styles.button}>
                  <Text style={styles.text}>SIGN IN</Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                  onPress={()=>navigation.navigate('Register')} 
                  style={styles.button}>
                    <Text style={styles.text}>REGISTER</Text>
                </TouchableOpacity>
            </View>
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
    )
}
export default Introduction;
