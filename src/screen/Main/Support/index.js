// import React,{useState}from 'react';
// import { View,Text,Image,ScrollView,TextInput} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import StatusBar from '../../../component/StatusBar';
// import color from '../../../component/colors';
// import CustomButton from '../../../component/button1';
// import Header from '../../../component/header';
// import BottomTab from '../../../component/StoreButtomTab';
// import RNPickerSelect from "react-native-picker-select";
// import colors from '../../../component/colors';


// const data=[{ label: 'Item', value: 'Item'},
// { label: 'Item', value: 'Item' },
// { label: 'Item', value: 'Item' },]

// const Support=()=>{
//     const navigation=useNavigation()
//     const [value, setValue] = useState('');
//     const [value1, setValue1] = useState('');
//     const [value2, setValue2] = useState('');
//     const [value3, setValue3] = useState('');

//     return(
//         <View style={styles.container}>
//            <Header
//             source={require('../../../assets/Images/arrow.png')}
//             title={'SUPPORT'}
//            onPress={()=>navigation.goBack()}
//            />
//              <View style={styles.card}>
//                 <ScrollView style={{flex:1}}>
//                   <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000',fontSize:15}}>How can we help you?</Text>
//                     <Text style={styles.better}>Name</Text>
//                       <View style={styles.drop}>
//                         <TextInput
//                          style={{height:35}}
//                          placeholder='Jhon Mathew'
//                         />
//                     </View>
//                     <Text style={styles.better}>Email</Text>
//                       <View style={styles.drop}>
//                         <TextInput
//                          style={{height:35}}
//                          placeholder='Username@gmail.com'
//                         />
//                     </View>
//                     <Text style={styles.better}>Mobile Number</Text>
//                       <View style={styles.drop}>
//                         <TextInput
//                         style={{height:35}}
//                         placeholder='+91 000 0000 000'
//                         keyboardType='phone-pad'
//                         />
//                     </View>
//                     <Text style={styles.better}>Subject</Text>
//                       <View style={styles.drop}>
//                       <TextInput
//                         style={{height:35}}
//                         placeholder=''
//                         />
//                     </View>
//                     <Text style={styles.better}>Message</Text>
//                       <View style={styles.drop1}>
//                       <TextInput
//                         multiline = {true}
//                         style={{height:70}}
//                         placeholder=''
//                         />
//                     </View>
//                     <View style={{marginTop:20}}>
//                       <CustomButton
//                       title='SUBMIT'
//                       />
//                     </View>
//                 </ScrollView>
//              </View>
         
//          <StatusBar/>
//          {/* <BottomTab/> */}
//        </View>
//     )
// }
// export default Support;

import React,{useState}from 'react';
import { View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import FAQs from '../../../component/TabComponents/FAQs';
import Support from '../../../component/TabComponents/Support';

  const renderScene = SceneMap
  ({
     first: FAQs,
     second: Support,
  });
const Calculator=()=>
{
     const navigation=useNavigation()
    const [index, setIndex] = useState(0);
    const [routes] = React.useState
    ([
      { key: 'first', title: 'FAQ’S' },
      { key: 'second', title: 'SUPPORT' },
    ]);
    return(
            <View style={styles.container}>
                 <Header
                     source={require('../../../assets/Images/arrow.png')}
                     title={'SUPPORT'}
                     onPress={()=>navigation.goBack()}
                  />
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
                  <StatusBar/>
            </View>
          )
}
export default Calculator;

  