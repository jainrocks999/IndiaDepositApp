import React,{useState}from 'react';
import { View,Text,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Blog from '../../../component/TabComponents/Blog';
import Story from '../../../component/TabComponents/Story';
import BottomTab from '../../../component/StoreButtomTab';
  const renderScene = SceneMap({
    first: Blog,
    second: Story,
   
  });
const Knowledge=()=>{
  const navigation=useNavigation()
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BLOG' },
    { key: 'second', title: 'STORY' },
   
  ]);
    return(
        <View style={styles.container}>
              <Header
                  title={'KNOWLEDGE CENTER'}
                  source ={require('../../../assets/Images/drawer.png')}
                  onPress={()=>navigation.toggleDrawer()}
                 source1={require('../../../assets/Image/notification.png')}
                 onPress1={()=>navigation.navigate('Notification')}
              /> 
              
             <ScrollView
                contentContainerStyle={{flex:1}}
                style={{backgroundColor:'#E5E5E5'}}>
                 <View style={styles.card}>
                    <TabView
                       navigationState={{ index, routes }}
                       renderScene={renderScene}
                       onIndexChange={setIndex}
                       initialLayout={{ width: '100%' }}
                       renderTabBar={props => <TabBar
                       indicatorStyle={{ 
                       backgroundColor: colors.bc, 
                       height:3
                       }}
                       renderLabel={({route, color,focused}) => (
                       <Text style={[styles.title,{ color:focused?colors.bc: colors.textColor}]}>
                              {route.title}
                       </Text>
                        )}
                       {...props} style={{backgroundColor: 'white',borderTopRightRadius:10,borderTopLeftRadius:10}}/>}
                    />
                 </View>
             </ScrollView>
              <StatusBar/>
              <View style={styles.buttomview}>
                 <BottomTab/>
              </View>
        </View>
    )
}
export default Knowledge;

  