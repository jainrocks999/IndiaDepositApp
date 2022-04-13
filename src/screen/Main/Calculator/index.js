import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FD from '../../../component/TabComponents/FD';
import SIP from '../../../component/TabComponents/SP';
import BottomTab from "../../../component/StoreButtomTab";

const renderScene = SceneMap({
  first: SIP,
  second: FD,
});
const Calculator = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'SIP'},
    {key: 'second', title: 'FD'},
  ]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      navigation.navigate('Main');
      return true;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/Image/arrow2.png')}
        title={'CALCULATOR'}
        onPress={() => navigation.navigate('Main')}
      />
      <View style={styles.card}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: '100%'}}
          swipeEnabled={false}
          renderTabBar={props => (
            <TabBar
              indicatorStyle={{
                backgroundColor: colors.bc,
                height: 3,
              }}
              renderLabel={({route, color, focused}) => (
                <Text
                  style={[
                    styles.title,
                    {color: focused ? colors.bc : colors.textColor},
                  ]}>
                  {route.title}
                </Text>
              )}
              {...props}
              style={styles.prop}
            />
          )}
        />
      </View>
      <StatusBar />
      <View style={{bottom:0,position:'absolute',left:0,right:0}}>
        <BottomTab/>
      </View>
    </View>
  );
};
export default Calculator;
