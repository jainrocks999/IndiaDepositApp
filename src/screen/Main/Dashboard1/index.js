import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import BottomTab from '../../../component/StoreButtomTab';
const dashboard1=()=>{
    const navigation=useNavigation()
    const [photo,setPhoto]=useState('')
  
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])
    return(
        <View style={{flex:1,}}>
            <Header
            title={'DASHBOARD'}
            source ={require('../../../assets/Images/drawer.png')}
            onPress={()=>navigation.toggleDrawer()}
            /> 
            <ScrollView style={{flex:1}}>
                 <View style={styles.main}>
                    
                     <Image style={styles.image} 
                     source={require('../../../assets/Image/fixed-deposit.png')}/>
        
                 </View >
                 <View style={styles.item}>
                     <View style={{paddingHorizontal:10,paddingVertical:10}}>
                         <Text style ={styles.text1}>{'Fixed Deposit'}</Text>
                     </View>
                     <View style={{height:1,width:'100%',backgroundColor:'grey',marginBottom:10}}></View>
                     <View style={[styles.container,{paddingHorizontal:30}]}>
                         <TouchableOpacity 
                        onPress={()=>navigation.navigate('Dashboard2')}
                        style={{alignItems:'center'}}
                        >
                            <View style={styles.imageView}>

                                 <Image style={styles.imageicon}
                                  source={require('../../../assets/Image/regular.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Regular\nFD'}</Text>
                        </TouchableOpacity> 
  
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image style={styles.imageicon}
                                  source={require('../../../assets/Image/tax-fd.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Tax Saving\nFDs'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image style={styles.imageicon}
                                 source={require('../../../assets/Image/nri-fd.png')}/>
                            </View>
                            <Text style={styles.text}>{'NRI\nFDs'}</Text>
                        </TouchableOpacity>
                     </View>
                     </View>
                      <View style={styles.item}>
                      <View style={{paddingHorizontal:10,paddingVertical:10}}>
                         <Text style ={styles.text1}>{'Saving Accounts'}</Text>
                     </View>
                     <View style={{height:1,width:'100%',backgroundColor:'grey',marginBottom:10}}></View>
                      <View style={[styles.container,{paddingHorizontal:20}]}>
                        <TouchableOpacity style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image style={styles.imageicon}
                                  source={require('../../../assets/Image/saving-ac.png')}/>
                            </View>
                            <Text style={styles.text}>{'SB Accounts\nRegular'}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image style={styles.imageicon} 
                                source={require('../../../assets/Image/sb-female.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB\nFemale'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginRight:10}}>
                            <View style={styles.imageView}>
                             <Image style={styles.imageicon}
                              source={require('../../../assets/Image/senior.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB Senoir\nCitizen'}</Text>
                        </TouchableOpacity>
                       
                     </View>
                     <View style={[styles.container,{paddingHorizontal:20,marginLeft:0}]}>
                        <TouchableOpacity style={{alignItems:'center',marginLeft:10}}>
                            <View style={styles.imageView}>
                              <Image style={styles.imageicon}
                              source={require('../../../assets/Image/sb-zb.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB ZB'}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style ={{alignItems:'center',}}
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginLeft:30}}>
                            <View style={styles.imageView}>
                                <Image style={styles.imageicon}
                                 source={require('../../../assets/Image/sb-def.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB Defence'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                
                        style={{alignItems:'center',marginLeft:60}}>
                            <View style={styles.imageView}>
                            
                            </View>
                          
                        </TouchableOpacity>
                       
                     </View>

                     </View>
                     <View style={styles.item}>
                     <View style={{paddingHorizontal:10,paddingVertical:10}}>
                         <Text style ={styles.text1}>{'Others'}</Text>
                     </View>
                     <View style={{height:1,width:'100%',backgroundColor:'grey',marginBottom:10}}></View>
                     <View style={[styles.container,{paddingHorizontal:10,marginLeft:0}]}>
                        
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginLeft:20}}>
                            <View style={styles.imageView}>
                               <Image style={styles.imageicon}
                                source={require('../../../assets/Image/case-st.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Case Studies\nor stories'}</Text>
                        </TouchableOpacity>
                     </View> 
                     </View>
            </ScrollView>
            <BottomTab/>
        </View>
    )
}
export default dashboard1;