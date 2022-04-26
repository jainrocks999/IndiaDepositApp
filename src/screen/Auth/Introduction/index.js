import React, { useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import {useDispatch} from 'react-redux';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

const Introduction = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = route.params;
  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('this is testing message',state.isConnected);
      if(!state.isConnected){
        showMessage({
          message:'Please check your network',
          type:'danger',
        })
      }
    });
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <View style={styles.round}>
            <Image source={require('../../../assets/Image/logo-icon.png')} />
          </View>
        </View>
        <Text style={styles.india}>IndiaDeposit</Text>
      </View>
      <View style={styles.view}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={{uri: data.image_url}}
        />

      </View>
      <View style={styles.main}>
        <View style={styles.lorem}>
          <Text style={styles.heading}>{data.intro_speech}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.text}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.navigate('Register')}
            style={styles.button}>
            <Text style={styles.text}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar />
    </View>
  );
};
export default Introduction;

