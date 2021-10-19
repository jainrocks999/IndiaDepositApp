import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import Button from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { useDispatch } from "react-redux";


const Introduction=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const data=route.params
    useEffect(()=>{

      dispatch({
        type: 'Privacy_Request',
        url: 'getpagecontent',
        key:'privacy',
  })

      dispatch({
        type: 'TermAndCondition_Request',
        url: 'getpagecontent',
        key:'term_condition',
  })
},[])

    return(
        <View style={styles.container}>
          {/* <ScrollView style={{flex:1}}> */}
             <View style={styles.imageContainer}>
               <View>
              <View style={styles.round}>
                  <Image
                  source={require('../../../assets/Image/logo-icon.png')}/>
              </View>
              </View>
              <Text style={styles.india}>IndiaDeposit</Text>
            </View>
                <View style={styles.view}>
                <Image style={styles.img}
                resizeMode='contain'
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
         {/* </ScrollView> */}
         <StatusBar/>
       </View>
    )
}
export default Introduction;
