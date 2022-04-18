import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const BottomTab = () => {
  const navigation = useNavigation();

  const renderHome = () => {
    return (
      <View style={styles.container}>
        <View style={{width: 30}}>
          <Image
            style={{height: 32, width: 32,tintColor:'#5A4392'}}
            source={require('../../assets/Image/home.png')}
          />
        </View>
        <Text style={[styles.text, {marginTop: 0}]}>{'Home'}</Text>
      </View>
    );
  };

  const renderBank = () => {
    return (
      <View style={styles.container}>
        <View style={{width: 30}}>
          <Image
                  style={{height: 20, width: 20, marginTop:2}}
                  source={require('../../assets/Image/ing.png')}
                />
        </View>
        <Text style={[styles.text,{marginBottom:-4,marginTop:6,marginRight:5}]}>{'My Investments'}</Text>
      </View>
    );
  };
  const renderKnowledge = () => {
    return (
      <View style={styles.container}>
        <View style={{width: 30}}>
           <Image
              style={{height: 32, width: 32}}
              source={require('../../assets/Image/contact_us.png')}
            />
        </View>
        <Text style={styles.text}>{'Contact us'}</Text>
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View style={styles.container}>
        <View style={{width: 30}}>
           <Image
            style={{height: 32, width: 32,tintColor:'#5A4392'}}
            source={require('../../assets/Image/knowledege_grey.png')}
          />
        </View>
        <Text style={styles.text}>{'Knowledge Ce..'}</Text>
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('Dashboard');
        }}>
        {renderHome()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('MyFD');
        }}>
        {renderBank()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => navigation.navigate('Contact')}>
        {renderKnowledge()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('KnowledgeCenter');
        }}>
        {renderTrending()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
