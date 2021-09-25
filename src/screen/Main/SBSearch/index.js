import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { TextInput } from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1'
import BottomTab from '../../../component/StoreButtomTab';
import Toast from 'react-native-simple-toast'
import { useDispatch,useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../component/loader';
const SBAccount=({route})=>{
   
    const navigation=useNavigation()
    const [balance,setBalance]=useState('')
    const [location,setLocation]=useState('')
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    console.log('this is narendra here',route.params);
    const manageSearch=async()=>{ 
      if(balance==''){
         Toast.show('Please enter minimum balance')
      }
      else if(location==''){
         Toast.show('Please enter location')
      }else{
      dispatch({
         type: 'SB_Search_Request',
         url: 'sblist',
         min_bal:balance,
         location:location,
         type1:route.params.type1,
         type2:route.params.type2,
         type3:route.params.type3,
         type4:route.params.type4,
         type5:route.params.type5,
         navigation:navigation
       })
    }
   }
    return(
        <View style={styles.container}>
                 <Header
                    title={'SB A/C SEARCH'}
                    source={require('../../../assets/Images/arrow.png')}
                    onPress={()=>navigation.goBack()}
                  />
                  <ScrollView style={styles.scroll}>
                     {isFetching?<Loader/>:null}
                  <KeyboardAwareScrollView
                     extraScrollHeight={10}
                     enableOnAndroid={true} 
                     keyboardShouldPersistTaps='handled'
                     contentContainerStyle={{flex:1}}>
                     <View style={styles.main}>
                           <View style={styles.view}>
                              <Text style={styles.text1}>
                              Lorem ipsum, or lipsum as it is sometimes known,
                              is dummy text used in laying out print, graphic or
                              web designs. The passage is attributed to an
                              unknown typesetter book.</Text>
                              <View style={styles.view}>
                                  <Text style={[styles.text2,{fontWeight:'700'}]}>Minimum Balance </Text>
                                  <View style={{flexDirection:'row',width:'100%'}}>
                                     <Image style={{width:12,height:18}} source={require('../../../assets/Image/rupay.png')}/>
                                  <TextInput
                                       style={styles.textinput}
                                       placeholderTextColor={colors.heading1}
                                       keyboardType='number-pad'
                                       value={balance}
                                       onChangeText={(val)=>setBalance(val)}
                                  />
                                 
                                  </View>
                                  <View style={{borderBottomWidth:1,width:'100%',marginTop:-5}}/>
                                </View>
                           </View>
                           <View style={styles.view}>
                                 <View style={styles.view1}>
                                     <Text style={[styles.text2,{fontWeight:'700'}]}>Location</Text>
                                  </View>
                                  <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                                          <Image style={{width:24,height:24}}  source={require('../../../assets/Image/search.png')}/>
                                           <Text style={styles.text3}>Current Location</Text>
                                  </View>
                              </View>
                              <View style={[styles.view,{alignItems:'center'}]}>
                                      <Text style={{fontWeight:'700'}}>OR </Text>
                              </View>
                              <View style={{marginTop:5}}>
                                   <TextInput
                                       style={styles.textinput1}
                                       placeholder='Enter Pincode'
                                       placeholderTextColor={colors.heading1}
                                       keyboardType='number-pad'
                                       value={location}
                                       onChangeText={(val)=>setLocation(val)}
                                       maxLength={6}
                                    />
                               </View>
                               <View style={styles.view2}>
                                         <Button
                                             onPress={()=>manageSearch()}
                                              title='SEARCH'
                                         />
                                </View>
                          </View>
                          </KeyboardAwareScrollView>
                  </ScrollView>
                       <BottomTab/>
                        <StatusBar/>
        </View>
       )
}
export default SBAccount;

