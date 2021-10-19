import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView,Pressable,BackHandler,ImageBackground, Alert} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import StatusBar from "../../../component/StatusBar";
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import { useDispatch } from "react-redux";
import * as RootNavigation from '../../../navigator/rootNavigation';
import Modal from "react-native-modal";
import { Platform } from "react-native";
let backPress=0
let arrayOfOneFD=[]
const dashboard=()=>{
    const navigation=useNavigation()
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems1, setSelectedItems1] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch=useDispatch()
    useEffect(async()=>{
      dispatch({
        type: 'Bank_Name_Request',
        url: 'bankdetaillist',
      })
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
        return () => backHandler.remove()

        
    },[])
  
    const handleBackButtonClick=() =>{
      if(navigation.isFocused()){
      if(backPress>0){
        BackHandler.exitApp();
        backPress = 0;
      }else{
       backPress++
       Toast.show('Press again to exit app')
       setTimeout( () => { backPress = 0}, 2000);
       BackHandler.removeEventListener('hardwareBackPress');
      
      }  
      return true;
    }
     
    }
    const handleOnPress = contact => {
        if (selectedItems.length) {
          return selectItems(contact);
        }
      arrayOfOneFD=contact.name        
       RootNavigation.navigate('FDSearch',{
         type1:[contact.name],
        //  type2:'',
        //  type3:'',
        //  type4:'',
        //  data:[contact.name]
       })
      };
      const manageSearch=()=>{
        RootNavigation.navigate('FDSearch',{
         type1:selectedItems,
        //  type2:selectedItems[1]?selectedItems[1]:'',
        //  type3:selectedItems[2]?selectedItems[2]:'',
        //  type4:selectedItems[3]?selectedItems[3]:'',
        //  data:selectedItems
       })
       setSelectedItems([])
       }


    const handleOnPress1 = contact => {
        if (selectedItems1.length) {
          return selectItems1(contact);
        }
        RootNavigation.navigate('SBSearch',{
         type1:[contact.name],
        //  type2:'',
        //  type3:'',
        //  type4:'',
        //  type5:'',
        //  data:[contact.name]
        })
      };

      const manageSearch1=()=>{
        console.log('hi testing',selectedItems1);
        RootNavigation.navigate('SBSearch',{
         type1:selectedItems1
        //  type2:selectedItems1[1]?selectedItems1[1]:'',
        //  type3:selectedItems1[2]?selectedItems1[2]:'',
        //  type4:selectedItems1[3]?selectedItems1[3]:'',
        //  type5:selectedItems1[4]?selectedItems1[4]:'',
        //  data:selectedItems1

        })
       setSelectedItems1([])
       }
      const model=()=>{
      
      };
    const ListItem = ({item, selected, onPress, onLongPress}) => (
       
           <View style={{width:'33.3%',alignItems:'center',justifyContent:'center',height:100}}>
               <View 
                    
                    style={styles.touch1}>
                    <TouchableOpacity 
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.imageView}>
                        <Image style={{height:item.height,width:item.width}} source={item.image}/> 
                    </TouchableOpacity>
                    <View style={styles.view2}>
                        <Text style={[styles.text,{color:colors.textColor}]}>{item.name}</Text>
                    <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.circle}>
                    <Text style={{fontSize:6,color:colors.bc,fontWeight:'700'}}>{`i`}</Text>
                    </TouchableOpacity>
                    </View>
                    {selected && <View style={styles.enable}>
                       <TouchableOpacity 
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.touch1}>
                    <View>
                        <Image style={{height:item.height,width:item.width}} source={item.image1}/> 
                    </View>
                    <View style={styles.view2}>
                        <Text style={[styles.text,{color:colors.white}]}>{item.name}</Text>
                    <TouchableOpacity style={[styles.circle,{borderColor:colors.white}]}>
                      <Text style={{color:colors.white,fontSize:6,fontWeight:'700'}}>i</Text>
                    </TouchableOpacity>
                    </View>
                   
                </TouchableOpacity>

                    </View>
                    }
                </View>
               
            </View>                                           
      
      );

      const getSelected = contact => selectedItems.includes(contact.name);

      const deSelectItems = () => setSelectedItems([]);
      const selectItems = item => {
        setSelectedItems1([])
        if (selectedItems.includes(item.name)) {
          const newListItems = selectedItems.filter(
            listItem => listItem !== item.name,
          );
          return setSelectedItems([...newListItems]);
        }
        setSelectedItems([...selectedItems, item.name]);
      };

      const getSelected1 = contact1 => selectedItems1.includes(contact1.name);

      const deSelectItems1 = () => setSelectedItems1([]);
      const selectItems1 = item => {
        setSelectedItems([])
        if (selectedItems1.includes(item.name)) {
          const newListItems = selectedItems1.filter(
            listItem => listItem !== item.name,
          );
          return setSelectedItems1([...newListItems]);
        }
        setSelectedItems1([...selectedItems1, item.name]);
      };

    

    return(
      <View style={{flexGrow:1,}}>
        <Header
    title={'DASHBOARD'}
    source ={require('../../../assets/Images/drawer.png')}
    onPress={()=>navigation.toggleDrawer()}
    source1={require('../../../assets/Image/notification.png')}
    onPress1={()=>navigation.navigate('Notification')}
    /> 
     <View 
         style={styles.main}>
             <Image
             resizeMethod='resize'
              source={require('../../../assets/Image/fixed-deposit.png')}/>
          </View>
         
      <ScrollView style={{flex:1}}>
        
          <View style={styles.view}>
                <View style={styles.item}>
                    <View style={styles.view1}>
                       <Text style={styles.text2}>{'Fixed Deposit'}</Text>
                              {selectedItems.length>0? 
                               <TouchableOpacity onPress={()=>manageSearch()}
                                style={styles.button}>
                                   <Text style={styles.search}>SEARCH</Text>
                               </TouchableOpacity>:null}
                   </View>
                   <Pressable onPress={deSelectItems}  
                   style={[styles.container,]}>
                       <FlatList
                        style={{ width: '100%' }}
                        data={data}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item})=>(
                          <ListItem
                          onPress={() => handleOnPress(item)}
                          onLongPress={() => selectItems(item)}
                          selected={getSelected(item)}
                          item={item}
                        />
                         
                       )}
                       />
                       </Pressable >
                   {selectedItems.length==0? <View style={styles.buttomview}>
                         <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                    </View>:null}
               </View>
       </View>
       <View style={styles.buttomview1}>
               <View style={styles.item}>
                       <View style={styles.view1}>
                           <Text style={styles.text2}>{'Savings Bank Account'}</Text>
                         {selectedItems1.length>0? 
                          <TouchableOpacity
                          onPress={()=>manageSearch1()}
                           style={styles.button}>
                              <Text style={styles.search}>SEARCH</Text>
                          </TouchableOpacity>:null}
                        </View>
                        <Pressable onPress={deSelectItems1}  style={[styles.container]}>
                       <FlatList
                        style={{ width: '100%' }}
                        data={data1}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item})=>(
                          <ListItem
                          onPress={() => handleOnPress1(item)}
                          onLongPress={() => selectItems1(item)}
                          selected={getSelected1(item)}
                          item={item}
                        />
                         
                       )}
                       />
                       </Pressable >
               {selectedItems1.length==0?<View style={styles.buttomview}>
                     <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                </View>:null}
            </View>
            </View>
            </ScrollView>
        <View style={{paddingHorizontal:15}}> 
        <Modal 
         isVisible={isModalVisible}
        >
        <View style={styles.modal}>
        <Text style={styles.modaltext}>{'Lorem ipsum, or lipsum as it is sometimes known,\nis dummy text used in laying out print.                     '}</Text>
       <View style={{flexDirection:'row',}}>
          <View style={styles.circleM}></View>
          <Text style={styles.modaltext1}>{'Lorem ipsum is dolor sit amet.'}</Text>
       </View>
       <View style={{flexDirection:'row'}}>
          <View style={styles.circleM}></View>
          <Text style={styles.modaltext1}>{'Lorem ipsum is dolor sit amet.'}</Text>
       </View>
       <View style={{flexDirection:'row'}}>
          <View style={styles.circleM}></View>
          <Text style={styles.modaltext1}>{'Lorem ipsum is dolor sit amet.'}</Text>
       </View>
        <View
            style={styles.modal1}>
             <TouchableOpacity style={styles.ModelmsgView}
              onPress={()=>setModalVisible(false)}
             >
            <Text style={styles.ModelMsgText}>{'OK'}</Text>
        </TouchableOpacity>
        </View>
        </View>
       </Modal>
       </View>   
    <StatusBar/>
     <BottomTab/>
</View>
  );
      }
export default dashboard;
const data=[
    {name:'Regular',
    image:require('../../../assets/Image/regular-fd-b.png'),
    image1:require('../../../assets/Image/regular-fd-w.png'),
    id:1,height:35,width:35},
   
    {name:'Senior Citizen', 
    image:require('../../../assets/Image/senior_citizen-b.png'),
    image1:require('../../../assets/Image/senior_citizen-w.png')
    ,id:4,height:35,width:35},
    {name:'Tax Saving',
    image:require('../../../assets/Image/tax-fd-b.png'),
    image1:require('../../../assets/Image/tax-fd-w.png')
    ,id:2,height:35,width:35},

    {name:'NRI',
    image:require('../../../assets/Image/nri-fd-b.png'),
    image1:require('../../../assets/Image/nri-fd-w.png'),
    id:3,height:35,width:35},
]

const data1=[
    {name:'Regular',
    image:require('../../../assets/Image/saving-ac-b.png'),
    image1:require('../../../assets/Image/saving-ac-w.png'),
    id:5,height:35,width:35},
    
    {name:'Zero Balance',
    image:require('../../../assets/Image/sb-zb-b.png'),
    image1:require('../../../assets/Image/sb-zb-w.png'),
    id:8,height:35,width:35},
    {name:'Female',
    image:require('../../../assets/Image/sb-female-b.png'),
    image1:require('../../../assets/Image/sb-female-w.png'),
    id:6,height:35,width:35},
    
    {name:'Defense',
    image:require('../../../assets/Image/sb-defence-b.png'),
    image1:require('../../../assets/Image/sb-defence-w.png'),
    id:7,height:35,width:35},
    {name:'Senior Citizen',
    image:require('../../../assets/Image/senior_citizen-b.png'),
    image1:require('../../../assets/Image/senior_citizen-w.png'),
    id:9,height:35,width:35},
]
// import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
// import React from "react";
// import {View,Text,TouchableOpacity} from "react-native";
// // Inside of a component's render() method:
// export default class Test extends React.Component{
// render() {
//   return (



{/* <View style={styles.container1}>
<Header
    title={'DASHBOARD'}
    source ={require('../../../assets/Images/drawer.png')}
    onPress={()=>navigation.toggleDrawer()}
    source1={require('../../../assets/Image/notification.png')}
    onPress1={()=>navigation.navigate('Notification')}
 /> 
  <ScrollView style={{flex:1}}>
         <View 
         style={styles.main}>
             <Image
              source={require('../../../assets/Image/fixed-deposit.png')}/>
          </View>
         
          <View style={styles.view}>
                <View style={styles.item}>
                    <View style={styles.view1}>
                       <Text style={styles.text2}>{'Fixed Deposit'}</Text>
                       {selectedItems.length>0?  <TouchableOpacity style={styles.button}>
                              <Text style={styles.search}>SEARCH</Text>
                          </TouchableOpacity>:null}
                   </View>
                   <Pressable onPress={deSelectItems}  
                   style={[styles.container]}>
                       <FlatList
                        style={{ width: '100%' }}
                        data={data}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item})=>(
                          <ListItem
                          onPress={() => handleOnPress(item)}
                          onLongPress={() => selectItems(item)}
                          selected={getSelected(item)}
                          item={item}
                        />
                         
                       )}
                       />
                       </Pressable >
                   {selectedItems.length==0? <View style={styles.buttomview}>
                         <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                    </View>:null}
               </View>
       </View>

         <View style={styles.buttomview1}>
               <View style={styles.item}>
                       <View style={styles.view1}>
                           <Text style={styles.text2}>{'Savings Bank Account'}</Text>
                         {selectedItems1.length>0?  <TouchableOpacity style={styles.button}>
                              <Text style={styles.search}>SEARCH</Text>
                          </TouchableOpacity>:null}
                        </View>
                        <Pressable onPress={deSelectItems1}  style={[styles.container]}>
                       <FlatList
                        style={{ width: '100%' }}
                        data={data1}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item})=>(
                          <ListItem
                          onPress={() => handleOnPress1(item)}
                          onLongPress={() => selectItems1(item)}
                          selected={getSelected1(item)}
                          item={item}
                        />
                         
                       )}
                       />
                       </Pressable >
               {selectedItems1.length==0?<View style={styles.buttomview}>
                     <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                </View>:null}
            </View>
        </View>
    </ScrollView>
    <StatusBar/>
     <BottomTab/>
</View> */}