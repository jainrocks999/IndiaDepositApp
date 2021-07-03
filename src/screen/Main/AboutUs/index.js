import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';

const Contact=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Images/drawer.png')}
           title={'ABOUT US'}
           onPress={()=>navigation.toggleDrawer()}
           />
          <ScrollView style={{flex:1}}>
             <View style={styles.main}>
                <Text style={styles.heading}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
                <Text style={[styles.heading,{marginTop:37}]}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
                <Text style={[styles.heading,{marginTop:37}]}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
             </View>
          </ScrollView>
         <StatusBar/>
         <BottomTab/>
       </View>
    )
}
export default Contact;

