import React,{useEffect, useState}from 'react';
import { View,Text,ScrollView,BackHandler, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import colors from '../../../component/colors';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import { RadioButton } from 'react-native-paper';
import CustomButton from '../../../component/button1';
const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const [checked,setChecked]=useState(false)
    const [checked1,setChecked1]=useState(false)

    
useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    // dispatch({
    //     type: 'Notification_Request',
    //     url: 'getnotification',
    //     user_id:user_id,
    // })
    const backAction = () => {
        navigation.navigate('Main')
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
},[])

const showContent=()=>{
    if (selector) {
        console.log('this is log valie',selector);
        return(
            <View>
                 <FlatList
              showsVerticalScrollIndicator={false}
              data={selector}
              renderItem={({item})=>
              <View>
               <View style={styles.view1}>
                   <View style={styles.card}>
                       <View style={styles.view2}>
                       <Text style={styles.text1}>{item.title}</Text>
                       </View>
                       <Text style={styles.text3}>{item.des}</Text>
                       <Text style={styles.text3}>{item.des}</Text>

                       <Text style={styles.text3}>{item.des}</Text>

                       <Text style={styles.text3}>{item.des}</Text>
                       <Text style={styles.text3}>{item.des}</Text>

                   </View>
               </View>
              </View>
              }
              /> 
            </View>
        )
        
    } else {
        
    }
}

const manageCheck=()=>{
    setChecked(true)
    setChecked1(false)
}
const manageCheck1=()=>{
   setChecked(false)
   setChecked1(true)
}
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Image/arrow2.png')}
           title={'My FD'}
           onPress={()=>navigation.goBack()}
           />
            {/* {selector[0]? <View style={{flex:1,paddingHorizontal:15,}}>
             <View>  
             {isFetching?<Loader/>:null} 
                {showContent()}
             </View>
             </View>:<View/>} */}
             <View style={{paddingHorizontal:15,paddingVertical:10}}>
               <Text style={{
                   fontSize:17,
                   fontFamily:'Montserrat-Semibold',
                   color:colors.textColor,fontWeight:'700'
                   }}>Select Payment Mode</Text>
               <View style={[styles.card,{marginTop:10}]}>
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                    <RadioButton
                        value={checked}
                        status={ checked === true ? 'checked' : 'unchecked' }
                        onPress={() =>manageCheck()}
                        color={colors.bc}/>
                        <View>
                    <Text style={{
                        marginLeft:10,
                        fontWeight:'500',
                        fontFamily:'Montserrat-SemiBold',
                        color:colors.textColor,
                        fontSize:16
                        }}>{'Net Banking'}</Text>
                        </View>
                   </View>
                   <Text style={{fontSize:12,marginLeft:48,fontFamily:'Montserrat-Regular',color:colors.textColor}}>Instant Payment</Text>
               </View>
             {checked?  <View style={{paddingVertical:20,paddingHorizontal:10}}>
                   <Text style={{color:colors.bc,fontSize:16,fontFamily:'Montserrat-Regular'}}>{'+ Add supported bank account'}</Text>
                   <Text style={{color:colors.textColor,fontSize:12,fontFamily:'Montserrat-Regular'}}>{'*Max limit may very depending upon th account type and bank'}</Text>
               </View>:<View style={{height:20}}/>}
               <View style={[styles.card,{marginTop:0}]}>
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                    <RadioButton
                        value={checked1}
                        status={ checked1 === true ? 'checked' : 'unchecked' }
                        onPress={() =>manageCheck1()}
                        color={colors.bc}/>
                        <View>
                    <Text style={{
                        marginLeft:10,
                        fontWeight:'500',
                        fontFamily:'Montserrat-SemiBold',
                        color:colors.textColor,
                        fontSize:16
                        }}>{'NEFT/RTGS'}</Text>
                        </View>
                   </View>
                   <Text style={{
                       fontSize:12,
                       marginLeft:48,
                       fontFamily:'Montserrat-Regular',
                       color:colors.textColor
                       }}>Requires adding a beneficiary and making the payment</Text>
               </View>
               {checked1?  <View style={{paddingVertical:20,paddingHorizontal:10}}>
                   <Text style={{color:colors.bc,fontSize:16,fontFamily:'Montserrat-Regular'}}>{'+ Add supported bank account'}</Text>
                   <Text style={{color:colors.textColor,fontSize:12,fontFamily:'Montserrat-Regular'}}>{'*Max limit may very depending upon th account type and bank'}</Text>
               </View>:<View style={{height:20}}/>}
             </View>
             <View style={{bottom:20,position:'absolute',left:0,right:0,borderTopWidth:2,paddingVertical:10}}>
             <View style={{paddingHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:14,color:colors.textColor}}>Investment Amount</Text>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                     <Image style={{height:20,width:14}} source={require('../../../assets/Image/rupay.png')}/>
                     <Text style={{marginLeft:2}}>{'10,000'}</Text>
                 </View>
             </View>
             <View style={{paddingHorizontal:15,marginTop:20}}>
              <CustomButton 
              onPress={()=>navigation.navigate('MyFD2')}
              title={'Continue'}/>
             </View>
             </View>
           <StatusBar/>
       </View>
    )
}
export default Notification;

const selector=[
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'}
]
