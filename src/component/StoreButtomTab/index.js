import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const BottomTab = () => {
  const navigation = useNavigation();

  const renderHome = () => {
    return (
      <View style={styles.container}>
        <View style={{width:30}}>
          <Image
            source={require('../../assets/Images/home.png')}/>
        </View>
        <Text style={styles.text}>{'HOME'}</Text>
      </View>
    )
  };

  const renderBank = () => {
    return (
      <View style={styles.container}>
        <View style={{width:30}}>
          <Image
            source={require('../../assets/Images/holy.png')}/>
        </View>
        <Text style={styles.text}>{'BANK HOLIDAY'}</Text>
      </View>
    );
  }
  const renderKnowledge = () => {
    return (
      <View style={styles.container}>
          <View style={{width:30}}>
            <Image
              source={require('../../assets/Image/knowledege_grey.png')}/>
          </View>
        <Text style={styles.text}>{'KNOWLEDGE CENTER'}</Text>
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View style={styles.container}>
          <View style={{width:30}}>
            <Image
              source={require('../../assets/Images/trend.png')}/>
          </View>
        <Text style={styles.text}>{'TRENDING'}</Text>
      </View>
    );
  };
  return (
    <View style={styles.header}>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('Dashboard')}}>
        {renderHome()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
           navigation.navigate('BankHoliday')}}>
        {renderBank()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={()=>navigation.navigate('KnowledgeCenter')}>
        {renderKnowledge()}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomTabContainer}
        onPress={() => {
         navigation.navigate('Trending')}}>
        {renderTrending()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;