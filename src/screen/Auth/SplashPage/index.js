import React,{useEffect,useState} from 'react';
import { View,Image,Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import styles from './style';
import colors from '../../../component/colors';
import axios from 'axios';
import Modal from 'react-native-modal';
import fontSize from '../../../component/fontSize';
import { Alert } from 'react-native';
const Splash=()=>{
    const navigation=useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    useEffect(async() => {
     appVersion()
     //initial()
      }, []);

      const appVersion = async (url) => {
        const id=await AsyncStorage.getItem(Storage.user_id)
        const user_id=id==null ? '':id
        const name=await AsyncStorage.getItem(Storage.name)
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
            url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/version',
          });
         
          if (Platform.OS=='android') {
            if (response.data.android_version > 1) {
              setModalVisible(true)
             } else {
               if (response.data.useractive==0) {
                AsyncStorage.setItem(Storage.user_id, '')
                AsyncStorage.setItem(Storage.name, '')
                initial(response.data.img_url,response.data.intro_speech,name);
               } else {
                initial(response.data.img_url,response.data.intro_speech,name);
               }
             }
          } else {
            if (response.data.ios_version > 1) {
              setModalVisible(true)
             } else {
              if (response.data.useractive==0) {
                AsyncStorage.setItem(Storage.user_id, '')
                AsyncStorage.setItem(Storage.name, '')
                initial(response.data.img_url,response.data.intro_speech,name);
               } else {
                initial(response.data.img_url,response.data.intro_speech,name);
               }
             }
          }
        } catch (error) {
          // Alert.alert(error)
         throw error;
          
        }
      };
      const initial = async (image_url,intro_speech,name) => {
       
        console.log('this iis na',name);
        if (!name) {
         setTimeout(() => navigation.replace("Introduction",{
          image_url:image_url,
          intro_speech:intro_speech
         }), 2000);
        } else {
           setTimeout(() => navigation.replace("Main"), 2000);
        }
      }
    return(
        <View style={styles.container}>

              <Modal
                isVisible={isModalVisible}
                >
                <View style={styles.modal}>
                <View style={styles.view1}>
                    <Text
                    style={styles.text1}>
                    Update
                    </Text>
                </View>
                <TouchableOpacity style={styles.ModelmsgView}>
                    <Text style={styles.ModelMsgText}>{'A newer version of this app is available for download. Please update it from PlayStore!'}</Text>
                </TouchableOpacity>

                <View
                    style={styles.view5}>
                    <TouchableOpacity style={styles.popup}
                     onPress={()=>openUrl()}
                     >
                    <Text style={styles.ModelBtntext}>Download Now</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            <View style={styles.main}>
                  <Image style={styles.image} 
                  source={require('../../../assets/Image/IndiaDeposit.png')}/>
                <View style={styles.view2}>
                  <View style={styles.view3}>
                <Text style={styles.text2}>We secure your details</Text>
                </View>
                 <View style={styles.view4}>
                   <Image style={styles.img} source={require('../../../assets/Image/iso.png')}/>
                   <Image style={styles.img1} source={require('../../../assets/Image/ssl.png')}/>
                 </View>
                </View>
            </View>
            
        </View>
    )
}
export default Splash;