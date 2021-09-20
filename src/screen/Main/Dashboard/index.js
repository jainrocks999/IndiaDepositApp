import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView,Pressable} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import StatusBar from "../../../component/StatusBar";
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from "react-native-gesture-handler";
const dashboard=()=>{
    const navigation=useNavigation()
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems1, setSelectedItems1] = useState([]);
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])


    const handleOnPress = contact => {
        if (selectedItems.length) {
          return selectItems(contact);
        }
        navigation.navigate('FDSearch')
      };

    const handleOnPress1 = contact => {
        if (selectedItems1.length) {
          return selectItems1(contact);
        }
      };

    const ListItem = ({item, selected, onPress, onLongPress}) => (
        <>
           <View style={{width:'33%',alignItems:'center',justifyContent:'center',height:100}}>
               <TouchableOpacity 
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.touch1}>
                    <View style={styles.imageView}>
                        <Image style={{height:item.height,width:item.width}} source={item.image}/> 
                    </View>
                    <View style={styles.view2}>
                        <Text style={[styles.text,{color:colors.textColor}]}>{item.name}</Text>
                    <View style={styles.circle}>
                    <Text style={{fontSize:6,color:colors.bc}}>{`i`}</Text>
                    </View>
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
                    <View style={[styles.circle,{borderColor:colors.white}]}>
                      <Text style={{color:colors.white,fontSize:6}}>i</Text>
                        {/* <Image 
                        style={{tintColor:colors.white}}
                        source={require('../../../assets/Image/ic.png')}/>   */}
                    </View>
                    </View>
                   
                </TouchableOpacity>

                    </View>
                    }
                </TouchableOpacity>
               
            </View>                                           
        </>
      );

      const getSelected = contact => selectedItems.includes(contact.id);

      const deSelectItems = () => setSelectedItems([]);
      const selectItems = item => {
        if (selectedItems.includes(item.id)) {
          const newListItems = selectedItems.filter(
            listItem => listItem !== item.id,
          );
          return setSelectedItems([...newListItems]);
        }
        setSelectedItems([...selectedItems, item.id]);
      };

      const getSelected1 = contact1 => selectedItems1.includes(contact1.id);

      const deSelectItems1 = () => setSelectedItems1([]);
      const selectItems1 = item => {
        if (selectedItems1.includes(item.id)) {
          const newListItems = selectedItems1.filter(
            listItem => listItem !== item.id,
          );
          return setSelectedItems1([...newListItems]);
        }
        setSelectedItems1([...selectedItems1, item.id]);
      };

    return(
        <View style={styles.container1}>
              <Header
                  title={'DASHBOARD'}
                  source ={require('../../../assets/Images/drawer.png')}
                  onPress={()=>navigation.toggleDrawer()}
                  source1={require('../../../assets/Image/notification.png')}
                  onPress1={()=>navigation.navigate('Notification')}
               /> 
               <ScrollView style={{flex:1}}>
                       <View style={styles.main}>
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
              </View>
     )
}
export default dashboard;
const data=[
    {name:'Regular',
    image:require('../../../assets/Image/regular-fd-b.png'),
    image1:require('../../../assets/Image/regular-fd-w.png'),
    id:1,height:35,width:35},
    {name:'Tax Saving',
    image:require('../../../assets/Image/tax-fd-b.png'),
    image1:require('../../../assets/Image/tax-fd-w.png')
    ,id:2,height:35,width:35},
    {name:'NRI',
    image:require('../../../assets/Image/nri-fd-b.png'),
    image1:require('../../../assets/Image/nri-fd-w.png'),
    id:3,height:35,width:35},
    {name:'Senior\nCitizen',
    image:require('../../../assets/Image/senior_citizen-b.png'),
    image1:require('../../../assets/Image/senior_citizen-w.png')
    ,id:4,height:35,width:35},
]

const data1=[
    {name:'Regular',
    image:require('../../../assets/Image/saving-ac-b.png'),
    image1:require('../../../assets/Image/saving-ac-w.png'),
    id:5,height:35,width:35},
    {name:'Female',
    image:require('../../../assets/Image/sb-female-b.png'),
    image1:require('../../../assets/Image/sb-female-w.png'),
    id:6,height:35,width:35},
    {name:'Defense',
    image:require('../../../assets/Image/sb-defence-b.png'),
    image1:require('../../../assets/Image/sb-defence-w.png'),
    id:7,height:35,width:35
  },
    {name:'Zero\nBalance',
    image:require('../../../assets/Image/sb-zb-b.png'),
    image1:require('../../../assets/Image/sb-zb-w.png'),
    id:8,height:35,width:35},
    {name:'Senior\nCitizen',
    image:require('../../../assets/Image/senior_citizen-b.png'),
    image1:require('../../../assets/Image/senior_citizen-w.png'),
    id:9,height:35,width:35},
]