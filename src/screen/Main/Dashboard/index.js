import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import BottomTab from '../../../component/StoreButtomTab';
const dashboard=()=>{
    const navigation=useNavigation()
    const [photo,setPhoto]=useState('')
  
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])
    return(
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
            <Header
            title={'DASHBOARD'}
            source ={require('../../../assets/Images/drawer.png')}
            onPress={()=>navigation.toggleDrawer()}
            source1={require('../../../assets/Image/notification.png')}
            onPress1={()=>navigation.navigate('Notification')}
            /> 
            <ScrollView style={{flex:1}}>
                 <View style={styles.main}>
                     <Image 
                     source={require('../../../assets/Image/fixed-deposit.png')}/>
                 </View>
                 <View style={{width:'100%',paddingHorizontal:15,marginTop:5}}>
                 <View style={styles.item}>
                     <View style={{borderBottomWidth:1,paddingVertical:8,paddingHorizontal:15,borderColor:'#DDDDDD'}}>
                        <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold'}}>{'Fixed Deposit'}</Text>
                     </View>
                     <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                       
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={styles.text}>{'Regular'}</Text>
                            <View style={{width:10,height:10,borderRadius:5,borderWidth:1}}></View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/tax-fd.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Tax Saving'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image source={require('../../../assets/Image/nri-fd.png')}/>
                            </View>
                            <Text style={styles.text}>{'NRI'}</Text>
                        </TouchableOpacity>
                     </View>
                     <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                        </TouchableOpacity>

                      
                     </View>

                   
                     <View style={{borderTopWidth:1,paddingVertical:8,paddingHorizontal:15,borderColor:'#DDDDDD'}}>
                        <Text style={{fontSize:11,fontFamily:'Montserrat-Normal'}}>{'*Tap & Hold to make multiple selection'}</Text>
                     </View>
                 </View>
                 </View>

                 {/*  */}
                 <View style={{width:'100%',paddingHorizontal:15,marginTop:-10}}>
                 <View style={styles.item}>
                     <View style={{borderBottomWidth:1,paddingVertical:8,paddingHorizontal:15,borderColor:'#DDDDDD'}}>
                        <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold'}}>{'Savings Bank Account'}</Text>
                     </View>
                     <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                       
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Regular'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/sb-female.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Female'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image source={require('../../../assets/Image/nri-fd.png')}/>
                            </View>
                            <Text style={styles.text}>{'Defense'}</Text>
                        </TouchableOpacity>
                     </View>
                     <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                        
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/sb-zb.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Zero\nBalance'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                        </TouchableOpacity>

                        <View style={{width:'10%'}}></View>

                      
                     </View>

                   
                     <View style={{borderTopWidth:1,paddingVertical:8,paddingHorizontal:15,borderColor:'#DDDDDD'}}>
                        <Text style={{fontSize:11,fontFamily:'Montserrat-Normal'}}>{'*Tap & Hold to make multiple selection'}</Text>
                     </View>
                 </View>
                 </View>
            </ScrollView>
            <BottomTab/>
        </View>
    )
}
export default dashboard;