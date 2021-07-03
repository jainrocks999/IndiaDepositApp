import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import colors from '../../../component/colors';



const ForgetPassword=()=>{
    const navigation=useNavigation()
   
    return(
        <View style={styles.container}> 
          <ScrollView>
            <View style={styles.imageContainer}>
               <Image style={styles.image} 
               source={require('../../../assets/Images/IndiaDeposit_Primary.png')}/>
            </View>
           <View style={styles.textView}>
               <Text style={styles.text}>{'INTRODUCTION'}</Text>
           </View>
           <View style={styles.main}>
               <View style={{paddingHorizontal:20}}>
                    <Text style={{lineHeight:20,fontFamily:'Montserrat-Normal',fontSize:16,color:colors.textColor}}>
                    It is a long established fact that
                    a reader will be distracted by the
                    readable content of a page.
                    </Text>
                    <View style={{flexDirection:'row',marginTop:30,alignItems:'center'}}>
                       <View style={{width:10,height:10,backgroundColor:colors.textColor,borderRadius:5}}></View>
                       <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginLeft:15}}>Lorem ipsum dolor sit amet.</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                       <View style={{width:10,height:10,backgroundColor:colors.textColor,borderRadius:5}}></View>
                       <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginLeft:15}}>Lorem ipsum dolor sit amet.</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                       <View style={{width:10,height:10,backgroundColor:colors.textColor,borderRadius:5}}></View>
                       <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginLeft:15}}>Lorem ipsum dolor sit amet.</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                       <View style={{width:10,height:10,backgroundColor:colors.textColor,borderRadius:5}}></View>
                       <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginLeft:15}}>Lorem ipsum dolor sit amet.</Text>
                    </View>
               </View>
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
        
    )
}
export default ForgetPassword;
