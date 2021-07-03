import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Storage from '../AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

const BottomTab = ({mobile,onPres,onPress1,onPress2}) => {
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
          source={require('../../assets/Images/filter.png')}
          //style={styles.bottomTab}
        />
        <Text style={styles.text}>{'FILTER'}</Text>
      </View>
    )
  };

  const renderImageNotification = () => {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/sort.png')}
         // style={styles.bottomTab}
        />
        <Text style={styles.text}>{'SORTING'}</Text>
      </View>
    );

  };
  const renderImageReport = () => {

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/comp.png')}
         // style={styles.bottomTab}
        />
        <Text style={styles.text}>{'COMPARISON'}</Text>
      </View>
    );
  };
 
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={onPres}>
        {renderImageOnline()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={onPress1}>
        {renderImageNotification()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={onPress2}
      >
        {renderImageReport()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;