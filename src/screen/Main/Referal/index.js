import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import colors from '../../../component/colors';

const Refferal=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
              <Header
                  source={require('../../../assets/Images/arrow.png')}
                  title={'REFERRAL'}
                  onPress={()=>navigation.goBack()}
               />
               <View style={styles.pfile}> 
                   <Image 
                      source={require('../../../assets/Image/Invite-fd.png')}/>
               </View> 
               <View style={styles.card}>
                     <View style={styles.view1}>
                           <Image source={require('../../../assets/Image/Vect.png')}/>
                           <View style={styles.view2}>
                               <Text style={styles.text1}>{`Share your referral link and invite your\nfriends via SMS / Email Whatsapp.`}</Text>
                           </View>
                     </View>
                     <View style={styles.line}></View>
                     <View style={styles.view3}>
                         <View>
                             <View style={styles.round}>
                                 <Text style={styles.text}>1</Text>
                             </View>
                               {/* <Text>{'Invites your\nfriends to\nsign up'}</Text> */}
                         </View>
                         <View style={styles.line1}></View>
                         <View>
                             <View style={styles.round}>
                               <Text style={styles.text}>2</Text>
                             </View>
                              {/* <Text>narend</Text> */}
                         </View>
                          <View style={styles.line1}></View>
                         <View>
                             <View style={styles.round}>
                                 <Text style={styles.text}>3</Text>
                             </View>
                               {/* <Text>narend</Text> */}
                         </View>
                     </View>
                     <View style={styles.view4}>
                          <Text style={styles.text2}>ENTER REFERRAL CODE</Text>
                           <View style={styles.view5}>
                                   <TextInput
                                   />
                         </View>
                            <Text style={styles.text2}>TAP TO COPY</Text>
                            <TouchableOpacity style={{
                                width:'50%',backgroundColor:colors.bc
                                ,height:40,borderRadius:30,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingHorizontal:30,
                                paddingVertical:4,
                                alignItems:'center',
                                marginTop:10
                                }}>
                                  <Image source={require('../../../assets/Image/share.png')}/>
                                  <Text style={{color:colors.white,fontFamily:'Montserrat-Normal',fontSize:14}}>REFER NOW</Text>
                             </TouchableOpacity>
                     </View>
                     
             </View>
             <StatusBar/>
        </View>
    )
}
export default Refferal;

