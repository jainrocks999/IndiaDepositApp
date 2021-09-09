import React,{useEffect,useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { TouchableOpacity } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Storage from "../../../component/AsyncStorage";

const Refferal=()=>{
    const navigation=useNavigation()
    const [code,setCode]=useState('')


useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    try {
        const data = new FormData();
        data.append('user_id',user_id)
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getrefferalcode',
        });
       
        if(response.data.status==200){
            setCode(response.data.refferal_code)
        }
      } catch (error) {
       throw error;
        
      }
},[])
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
                                   value={code}
                                   />
                         </View>
                            <Text style={styles.text2}>TAP TO COPY</Text>
                            <TouchableOpacity style={styles.touch}>
                                  <Image source={require('../../../assets/Image/share.png')}/>
                                  <Text style={styles.text3}>REFER NOW</Text>
                             </TouchableOpacity>
                     </View>
                     
             </View>
             <StatusBar/>
        </View>
    )
}
export default Refferal;

