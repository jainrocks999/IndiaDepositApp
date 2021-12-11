import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
const MyFDDetail=()=>{
    const navigation=useNavigation()


    return(
        <View style={styles.container}>
           <Header
           title={'FD Detail'}
           source={require('../../../../assets/Image/arrow2.png')}
           onPress={()=>navigation.goBack()}
           />  
        <ScrollView style={{paddingVertical:20,paddingHorizontal:15}}>
           <View style={styles.card}>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`FD Name/ID :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`FD Created Date :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Amount :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Name :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Tenure :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Maturity Amount :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Maturity Date :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Interest Rate :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Mode of Payment :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`FD Type :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Interest Calculation Frequency :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Bank Name :`}</Text>
             <Text style={{fontSize:14,fontFamily:'Montserrat-Medium'}}>{`Current Balance :`}</Text> 
           </View>
        </ScrollView>
        </View>
    )
}
export default MyFDDetail;