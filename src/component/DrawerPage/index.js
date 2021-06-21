import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert,TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from '@react-navigation/native';

import {
    Avatar,
    Title,
    Caption,
    Text,
} from 'react-native-paper';
import styles from './styles';
import Storage from '../AsyncStorage';
import { useSelector,useDispatch } from 'react-redux';


const DrawerContent=({props,name,email,mobile})=> {
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const getLogout=async()=>{
        //const userid=await AsyncStorage.getItem(Storage.userid)
        //   dispatch({
        //       type: 'User_Logout_Request',
        //       url: 'logout',
        //      userid,
        //      navigation: navigation,
        //     });
      }

    const Logout = () => {
        console.log('this is working');
        Alert.alert(
            "Are you want to logout ?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        cancelable: false;
                    },
                    style: "cancel",
                },
                { text: "ok", onPress: () => getLogout() },
            ],
            { cancelable: false }
        );
    };
    return (
        <DrawerContentScrollView {...props}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.drawerContent}>
                <View style={[styles.drawers]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UpdateProfile')}>
                    <Image style={{width:50,height:50}} source={require('../../assets/Images/pfile.png')}/>
                    </TouchableOpacity>
                   {!email?
                   <View style={styles.profile}>
                    <Text style={styles.title}>{'Login To View Profile'}</Text>
                    </View>:
                    <View style={styles.profile}>
                        <Title style={styles.title}>{name}</Title>
                        <Caption style={styles.caption}>{mobile}</Caption>
                    </View>}
                </View>
              
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Dashboard')
                    }}>
                    <View style={[styles.drawer, {}]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/dashboard.png')}/>
                            </View>
                            <Text style={styles.text}>{'Dashboard'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AboutUs')
                    }}>
                    <View style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/about.png')}/>
                            </View>
                            <Text style={styles.text}>{'About us'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Feedback')
                    }}>
                    <View style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/feedback.png')}/>
                            </View>
                            <Text style={styles.text}>{'Feedback'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Settings')
                    }}>
                    <View style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/setting.png')}/>
                            </View>
                            <Text style={styles.text}>{'Setting'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ContactUs')
                    }}>
                    <View style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/call1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Contact us'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Change')}
                    style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/lock.png')}/>
                            </View>
                            <Text style={styles.text}>{'Change Password'}</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    //onPress={()=>navigation.navigate('Change')}
                    style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/referal.png')}/>
                            </View>
                            <Text style={styles.text}>{'Refer App'}</Text>
                        </View>
                </TouchableOpacity>
               
                <TouchableOpacity 
                    onPress={()=>Logout()}
                    style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} source={require('../../assets/Images/logout1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Log out'}</Text>
                        </View>
                </TouchableOpacity>
               
               
            </ScrollView>
        </DrawerContentScrollView>
    );
}
export default DrawerContent;
