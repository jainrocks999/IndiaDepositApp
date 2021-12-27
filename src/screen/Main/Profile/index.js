import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Profile from '../../../component/TabComponents/Profile';
import BankDetail from '../../../component/TabComponents/BankDetail';
import NomineeDetail from '../../../component/TabComponents/NomineeDetail';
import FamilyDetail from '../../../component/TabComponents/FamilyDetail';
import ImagePicker  from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import * as RootNavigation from '../../../navigator/rootNavigation';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from '../../../component/loader';

  const renderScene = SceneMap({
      first: Profile,
      second: BankDetail,
      third:NomineeDetail,
      four:FamilyDetail
  });


const ProfileScreen=()=>{
  const isFetching=useSelector((state)=>state.isFetching)
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const [index, setIndex] = useState(0);
  const [photos, setphotos] = useState('');
  const [visible,setVisible]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState()
  const [image,setImage]=useState('')
  const [key,setKey]=useState(1)

  useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)

    dispatch({
      type: 'User_Detail_Request',
      url: 'profile',
      user_id,
       })
    const name=await AsyncStorage.getItem(Storage.name)
    const email=await AsyncStorage.getItem(Storage.email)
     let image=await AsyncStorage.getItem(Storage.image)
     setImage(image)
     setName(name)
    setEmail(email)
  },[])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick=() =>{
    if(navigation.isFocused()){
      navigation.navigate('Main')
    return true;
    }
  }
  const [routes] = React.useState([
    { key: 'first', title: 'PERSONAL\nDETAILS' },
    { key: 'second', title: 'BANK\nDETAILS' },
    { key: 'third', title: 'NOMINEE\nDETAILS' },
    { key: 'four', title: 'FAMILY\nDETAILS' },
  ]);

  const save1=async(image)=>{
    setKey(key+1)
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    try{
      const data = new FormData();
      data.append('user_id',user_id)
      data.append('profile_pic', {
      uri:image.path,
      name:image.path.substring(image.path.lastIndexOf('/') + 1), 
      type:`image/jpg`, 
    });
    const response =await axios({
      method: 'POST',
      data,
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
      url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/uploadfile',
    });  
    AsyncStorage.setItem(Storage.image,response.data.profile_pic)
  } catch (error) {
    console.log(error);
  }
  }
  const openCamera =async() =>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
    let source = { uri: image.path };
    AsyncStorage.setItem(Storage.photo,JSON.stringify(source))
     setphotos(source)
     save1(image)
    });
  setVisible(false)
  };
const save=async(images)=>{
  setKey(key+1)
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  try{
    const data = new FormData();
    data.append('user_id',user_id)
    data.append('profile_pic', {
    uri:images[0].path,
    name:images[0].path.substring(images[0].path.lastIndexOf('/') + 1), 
    type:`image/jpg`, 
  });
  const response =await axios({
    method: 'POST',
    data,
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
    url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/uploadfile',
  });
  console.log('tih is rsspose value',response.data);
  AsyncStorage.setItem(Storage.image,response.data.profile_pic)  
} catch (error) {
  console.log(error);
}
}
 const openGallery = async() =>{
   ImagePicker.openPicker({
     multiple: true
   }).then(images => {
     let source = { uri: images[0].path };
     console.log('this is images kresponse calie',images[0] );
    setphotos(source)
   save(images)
   });
   setVisible(false)
  };
    return(
        <View style={styles.container}>
              <Header
                  source={require('../../../assets/Image/arrow2.png')}
                  title={'PROFILE'}
                  onPress={()=>navigation.navigate('Main')}/>
                    <ScrollView
                      contentContainerStyle={{flex:1}}
                      style={{backgroundColor:'#E5E5E5'}}>
                      {isFetching?<Loader/>:null}
                      <View style={styles.view1}>
                          <Dialog
                          dialogStyle={{width:300,height:170,paddingHorizontal:10}}
                          visible={visible}
                         >
                       <DialogContent >
                         <View>
                        <View style={styles.modalView}>
                           <TouchableOpacity onPress={()=>openCamera()} style={styles.buton}>
                               <Image style={styles.img1} source={require('../../../assets/Image/camera1.png')}/>
                               <Text style={styles.came}>Camera</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>openGallery()} style={styles.buton}>
                           <Image style={styles.img1} source={require('../../../assets/Image/gallery.png')}/>
                               <Text style={styles.came}>Gallery</Text>
                           </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{marginTop:30,alignItems:'flex-end'}}>
                        <Text onPress={()=> setVisible(false)} style={{color:'red'}}>CANCEL</Text>
                        </View>
                        </DialogContent>
                       
                      </Dialog>
                                </View>
                     <View style={styles.card}>
                            <View style={styles.main}>
                                <View style={styles.view2}>
                                      <View style={styles.imageContainer}>
                                        {photos?<Image 
                                        style={{width:'100%',height:'100%',borderRadius:57}} 
                                        source={photos}/>
                                          :image?<Image 
                                          style={{width:'100%',height:'100%',borderRadius:57}} 
                                          source={{uri: image}}/>
                                          :
                                          <Image style={styles.img} 
                                          source={require('../../../assets/Image/user-couple.png')}/>
                                        }
                                    
                                     <TouchableOpacity
                                     onPress={()=>setVisible(true)} 
                                      style={styles.camera}>
                                         <Image 
                                         style={{width:20,height:20}}
                                         source={require('../../../assets/Image/camera.png')}/>
                                     </TouchableOpacity>
                                     </View>
                                </View>
                             </View>
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

  