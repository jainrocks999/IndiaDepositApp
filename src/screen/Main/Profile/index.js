import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import RNPickerSelect from "react-native-picker-select";
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import {  widthPercentageToDP as wp,
  heightPercentageToDP as hp, } from "react-native-responsive-screen";
import Profile from '../../../component/TabComponents/Profile';
import BankDetail from '../../../component/TabComponents/BankDetail';
import NomineeDetail from '../../../component/TabComponents/NomineeDetail';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  const renderScene = SceneMap({
    first: Profile,
    second: BankDetail,
    third:NomineeDetail
  });


const ProfileScreen=()=>{
  const navigation=useNavigation()
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'PERSONAL DETAILS' },
    { key: 'second', title: 'BANK DETAILS' },
    { key: 'third', title: 'NOMINEE DETAILS' },
  ]);


    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Images/arrow.png')}
            title={'PROFILE'}
           onPress={()=>navigation.goBack()}
           />
            <ScrollView
             contentContainerStyle={{flex:1}}
             style={{backgroundColor:'#E5E5E5'}}>
             <View style={styles.card}>
            
              
                <View style={styles.main}>
                   <View style={{width:'35%'}}>
                   </View>
                   <View style={{width:'60%',flexDirection:'row'}}>
                     <View style={styles.imageContainer}>
                      <Image style={{height:'100%',width:'100%'}} 
                      source={require('../../../assets/Image/profile-pic.png')}/>
                     </View>
                     <View style={styles.camera}>
                         <Image source={require('../../../assets/Image/camera.png')}/>
                       </View>
                   <Text style={styles.change}>Change Password</Text>
                   </View>
                </View>
               {/* <Profile/> */}
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
                        {...props} style={{backgroundColor: 'white'}}/>}
                    />
 
                    
                   
                  
             </View>
             </ScrollView>
         <StatusBar/>
       </View>
    )
}
export default ProfileScreen;

  