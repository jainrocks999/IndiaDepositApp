import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Profile from '../../../component/TabComponents/Profile';
import BankDetail from '../../../component/TabComponents/BankDetail';
import NomineeDetail from '../../../component/TabComponents/NomineeDetail';
import ImagePicker  from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
  const renderScene = SceneMap({
      first: Profile,
      second: BankDetail,
      third:NomineeDetail
  });


const ProfileScreen=()=>{
  const navigation=useNavigation()
  const [index, setIndex] = useState(0);
  const [photos, setphotos] = useState('');
  const [visible,setVisible]=useState(false)

  const [routes] = React.useState([
    { key: 'first', title: 'PERSONAL DETAILS' },
    { key: 'second', title: 'BANK DETAILS' },
    { key: 'third', title: 'NOMINEE DETAILS' },
  ]);
  const openCamera = () =>
  {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
    let source = { uri: image.path };
    AsyncStorage.setItem(Storage.photo,JSON.stringify(source))
     setphotos(source)
    console.log('thisi s source value',source.uri);
    });
  setVisible(false)
  };

 const openGallery = () =>
  {
   ImagePicker.openPicker({
     multiple: true
   }).then(images => {
     let source = { uri: images[0].path };
    setphotos(source)
    console.log(source)
   });
   setVisible(false)
  };

  const renderImage=async()=>{
    if(photos){
    return(
      <View>
      <View style={styles.imageContainer}>
      {photos?<Image style={{width:'100%',height:'100%',borderRadius:57}} source={photos}/>
          :<Image style={styles.img} 
          source={require('../../../assets/Image/profile-pic.png')}/>}
      </View>
      </View>
    )
    }
 }

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
                                <View style={styles.view1}>
                                <Dialog
                          dialogStyle={{width:300,height:170,paddingHorizontal:10}}
                          visible={visible}
                          // onTouchOutside={() => {
                          //  setVisible(false)
                          //  }}
                         >
                       <DialogContent >
                         <View>
                        <View style={styles.modalView}>
                           <TouchableOpacity onPress={()=>openCamera()} style={styles.buton}>
                               <Image style={{width:60,height:40}} source={require('../../../assets/Image/camera.png')}/>
                               <Text style={styles.came}>Camera</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>openGallery()} style={styles.buton}>
                           <Image style={{width:60,height:40}} source={require('../../../assets/Image/camera.png')}/>
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
                                <View style={styles.view2}>
                                <View style={styles.imageContainer}>
                                      {photos?<Image style={{width:'100%',height:'100%',borderRadius:57}} source={photos}/>
                                          :<Image style={styles.img} 
                                          source={require('../../../assets/Image/profile-pic.png')}/>}
                                      </View>
                                     <TouchableOpacity
                                     onPress={()=>setVisible(true)} 
                                      style={styles.camera}>
                                         <Image source={require('../../../assets/Image/camera.png')}/>
                                     </TouchableOpacity>
                                     <Text  onPress={()=>navigation.navigate('ChangePassword')} style={styles.change}>Change Password</Text>
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

  