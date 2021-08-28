import React,{useState}from 'react';
import { View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import FD from '../../../component/TabComponents/FD';
import SIP from '../../../component/TabComponents/SP';

  const renderScene = SceneMap({
    first: SIP,
    second: FD,
   
  });
const Calculator=()=>
{
   const navigation=useNavigation()
   const [index, setIndex] = useState(0);
   const [routes] = React.useState
   ([
     { key: 'first', title: 'SIP' },
     { key: 'second', title: 'FD' },
   
    ]);
    return(
           <View style={styles.container}>
              <Header
                source={require('../../../assets/Images/arrow.png')}
                title={'CALCULATOR'}
                onPress={()=>navigation.goBack()}
              />
             <View style={styles.card}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: '100%' }}
                    renderTabBar={props => <TabBar
                    indicatorStyle=
                     {{ 
                        backgroundColor: colors.bc, 
                        height:3
                     }}
                    renderLabel={({route, color,focused}) => (
                     <Text style={[styles.title,{ color:focused?colors.bc: colors.textColor}]}>
                           {route.title}
                     </Text>
                   )}
                   {...props} style={styles.prop}/>}
                />
             </View>
              <StatusBar/>
           </View>
    )
}
export default Calculator;

  