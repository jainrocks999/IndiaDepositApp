import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import {TabView, SceneMap, TabBar, HScrollView} from 'react-native-tab-view';
import Privacy from '../../../component/TabComponents/Privacy';
import Security from '../../../component/TabComponents/Security';
import TermAndCondition from '../../../component/TabComponents/TermAndCondition';

const renderScene = SceneMap({
  first: Privacy,
  second: Security,
  third: TermAndCondition,
});
const Calculator = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Privacy'},
    {key: 'second', title: 'Security'},
    {key: 'third', title: 'Term & Condition'},
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
        title={'OUR POLICIES'}
        onPress={() => navigation.navigate('Main')}
      />
      <ScrollView
        contentContainerStyle={{flex: 1}}
        style={{backgroundColor: '#E5E5E5'}}>
        <View style={styles.card}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: '100%'}}
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
                style={{
                  backgroundColor: 'white',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              />
            )}
          />
        </View>
        <StatusBar />
      </ScrollView>
    </View>
  );
};
export default Calculator;
