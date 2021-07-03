import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Storage from '../AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

const BottomTab = (mobile) => {
  const navigation = useNavigation();
  const [Number, setNumber] = useState('');
  useEffect(async () => {
    let number = await AsyncStorage.getItem(Storage.mobile);
    setNumber(number)
  })
  const renderImageOnline = () => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/home.png')}
          //style={styles.bottomTab}
        />
        <Text style={styles.text}>{'HOME'}</Text>
      </View>
    )
  };

  const renderImageNotification = () => {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/holy.png')}
         // style={styles.bottomTab}
        />
        <Text style={styles.text}>{'BANK HOLIDAY'}</Text>
      </View>
    );

  };
  const renderImageReport = () => {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/knowledge.png')}
         // style={styles.bottomTab}
        />
        <Text style={styles.text}>{'KNOWLEDGE CENTER'}</Text>
      </View>
    );

  };
  const renderImageSetting = () => {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/trend.png')}
         // style={styles.bottomTab}
        />
        <Text style={styles.text}>{'TRENDING'}</Text>
      </View>
    );

  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('DashBoardPage');
        }}>

        {renderImageOnline()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
          // navigation.navigate('About');
        }}>
        {renderImageNotification()}
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.bottomTabContainer}
       // onPress={() => call()}
      //  onPress={()=>navigation.navigate('HowTo')}
      >
        {renderImageReport()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
          // navigation.navigate('Leader');
        }}>
        {renderImageSetting()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;