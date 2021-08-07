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
            /> 
            <ScrollView style={{flex:1}}>
                 <View style={styles.main}>
                     <Image 
                     source={require('../../../assets/Image/fixed-deposit.png')}/>
                 </View>
                 <View style={{width:'100%',paddingHorizontal:15,marginTop:-45}}>
                 <View style={styles.item}>
                     <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/regular.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Regular\nFD'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/tax-fd.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Tax Saving\nFDs'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>navigation.navigate('SBSearch')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image source={require('../../../assets/Image/nri-fd.png')}/>
                            </View>
                            <Text style={styles.text}>{'NRI FDs'}</Text>
                        </TouchableOpacity>
                     </View>

                     <View style={[styles.container,{paddingHorizontal:15,paddingVertical:10}]}>
                        <TouchableOpacity style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                 <Image source={require('../../../assets/Image/saving-ac.png')}/>
                            </View>
                            <Text style={styles.text}>{'SB Accounts\nRegular'}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FdFilter')}
                        style={{alignItems:'center'}}>
                            <View style={styles.imageView}>
                                <Image source={require('../../../assets/Image/sb-female.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB\nFemale'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginRight:10}}>
                            <View style={styles.imageView}>
                             <Image source={require('../../../assets/Image/senior.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB Senoir\nCitizen'}</Text>
                        </TouchableOpacity>
                     </View>
                     <View style={[styles.container,{paddingHorizontal:15,paddingVertical:10}]}>
                        <TouchableOpacity style={{alignItems:'center',marginLeft:10}}>
                            <View style={styles.imageView}>
                              <Image source={require('../../../assets/Image/sb-zb.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB ZB'}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginLeft:30}}>
                            <View style={styles.imageView}>
                                <Image source={require('../../../assets/Image/sb-def.png')}/> 
                            </View>
                            <Text style={styles.text}>{'SB Defence'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('FDCalculator')}
                        style={{alignItems:'center',marginLeft:20}}>
                            <View style={styles.imageView}>
                               <Image source={require('../../../assets/Image/case-st.png')}/> 
                            </View>
                            <Text style={styles.text}>{'Case Studies\nor stories'}</Text>
                        </TouchableOpacity>
                     </View>
                 </View>
                 </View>
            </ScrollView>
            <BottomTab/>
        </View>
    )
}
export default dashboard;