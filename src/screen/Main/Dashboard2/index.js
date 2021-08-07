import React,{useEffect, useState} from "react";
import {View,Text,Image,FlatList,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import BottomTab from '../../../component/StoreButtomTab';
const dashboard2=()=>{
    const navigation=useNavigation()
    const [photo,setPhoto]=useState('')
  
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])

    const renderData=(item)=>{
        return(
            <View style={{paddingHorizontal:10,paddingVertical:20}}>
               <View style={{width:'10%',height:10,backgroundColor:'#B2B2F9'}}>
                         <Text>{item.title}</Text>   
               </View>
            </View>
        )
    }
    return(
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
            <Header
            title={'DASHBOARD'}
            source ={require('../../../assets/Images/drawer.png')}
            onPress={()=>navigation.toggleDrawer()}
            /> 
            <ScrollView style={{flex:1}}>
                 <View style={[styles.card,{marginTop:30}]}>
                     <View style={{paddingVertical:10,paddingHorizontal:20}}>
                      <Text style={{fontFamily:'Montserrat-Medium'}}>Fixed Deposit</Text>
                     </View>
                     <View style={styles.border}></View>
                     <View style={{paddingHorizontal:0}}>
                     <FlatList
                        horizontal
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                            <View style={[styles.main,{backgroundColor:item.color,}]}>
                                <Text style={{color:'#fff'}}>{item.title}</Text>
                                <View style={styles.row}>
                                    <TouchableOpacity style={[styles.touch,{marginTop:20}]}>
                                       <Text style={{color:'#fff',fontSize:11}}>Know More</Text>
                                    </TouchableOpacity>
                                    <Image style={{marginTop:11}} source={item.source}/>
                                </View>
                            </View>
                        </View>
                        }
                        />
                     </View>
                 </View>
                 {/* Second View */}

                 <View style={[styles.card,{marginTop:20}]}>
                     <View style={{paddingVertical:10,paddingHorizontal:20}}>
                      <Text style={{fontFamily:'Montserrat-Medium'}}>Saving Account</Text>
                     </View>
                     <View style={styles.border}></View>
                     <View style={{paddingHorizontal:0}}>
                     <FlatList
                        horizontal
                        data={data1}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                            <View style={[styles.main,{backgroundColor:item.color,}]}>
                                <Text style={{color:'#fff'}}>{item.title}</Text>
                                <View style={styles.row}>
                                    <TouchableOpacity style={[styles.touch,{marginTop:22}]}>
                                       <Text style={{color:'#fff',fontSize:11}}>Know More</Text>
                                    </TouchableOpacity>
                                    <Image style={{marginTop:11}} source={item.source}/>
                                </View>
                            </View>
                        </View>
                        }
                        />
                     </View>
                 </View>
                 {/* Third View */}
                 <View style={[styles.card,{marginTop:20,marginBottom:20}]}>
                     <View style={{paddingVertical:10,paddingHorizontal:20}}>
                      <Text style={{fontFamily:'Montserrat-Medium'}}>Others</Text>
                     </View>
                     <View style={styles.border}></View>
                     <View style={{paddingHorizontal:0}}>
                     <FlatList
                        horizontal
                        data={data2}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                            <View style={[styles.main,{backgroundColor:item.color,}]}>
                                <Text style={{color:'#fff'}}>{item.title}</Text>
                                <View style={styles.row}>
                                    <TouchableOpacity style={[styles.touch,{marginTop:22}]}>
                                       <Text style={{color:'#fff',fontSize:11}}>Know More</Text>
                                    </TouchableOpacity>
                                    <Image style={{marginTop:10}} source={item.source}/>
                                </View>
                            </View>
                        </View>
                        }
                        />
                     </View>
                 </View>
            </ScrollView>
            <BottomTab/>
        </View>
    )
}
export default dashboard2;
const data=[
    {title:'Regular FD',color:'#B2B2F9',source:require('../../../assets/Image/regular.png')},
    {title:'Tax Saving FDs',color:'#5A4392',source:require('../../../assets/Image/tax-fd.png')},
    {title:'Tax Saving FDs',color:'#B2B2F9',source:require('../../../assets/Image/regular.png')},
]
const data1=[
    {title:'Saving Account Regular',color:'#5A4392',source:require('../../../assets/Image/saving-ac.png')},
    {title:'SB Female',color:'#D9D9F4',source:require('../../../assets/Image/sb-female.png')},
    {title:'SB Female',color:'#5A4392',source:require('../../../assets/Image/regular.png')},
]
const data2=[
    {title:'Case Studies or Stories',color:'#B2B2F9',source:require('../../../assets/Image/regular.png')},
]

