import React,{useEffect, useState}from 'react';
import { View,Text,BackHandler, Image,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import colors from '../../../component/colors';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import fontSize from '../../../component/fontSize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Storage from "../../../component/AsyncStorage";
import AsyncStorage from '@react-native-community/async-storage';

const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const fdData=useSelector(state=>state.MYFDList)
    console.log('this is user data',fdData);
    const [sort,setSort]=useState('Alphabetical')
    
useEffect(async()=>{
    
    const user_id=await AsyncStorage.getItem(Storage.user_id)

    dispatch({
        type: 'MYFD_List_Request',
        url: 'dropfd',
        user_id
      })

    const backAction = () => {
        navigation.navigate('Main')
        return true;
      };
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
},[])


const showContent=()=>{
    if (fdData.length>0) {
        return(
            <SafeAreaView style={{marginBottom:60}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={fdData}
              renderItem={({item})=>
              <View>
               <View style={styles.view1}>
                   <TouchableOpacity 
                   onPress={()=>navigation.navigate('MyFDDetailPage')}
                   style={styles.card}>
                       <View style={styles.view2}>
                       <Text style={styles.text1}>{item.username}</Text>
                       <TouchableOpacity style={{
                           backgroundColor:colors.bc,
                           paddingHorizontal:8,
                           borderRadius:6,
                           alignItems:'center',
                           justifyContent:'center',
                           paddingVertical:3
                           }}>
                           <Text style={{fontFamily:'Montserrat-Regular',fontSize:12,color:colors.white}}>Active</Text>
                       </TouchableOpacity>
                       </View>
                       {/* <Text style={styles.text3}>{item.des}</Text>
                       <Text style={styles.text3}>{item.des}</Text>

                       <Text style={styles.text3}>{item.des}</Text>

                       <Text style={styles.text3}>{item.des}</Text>
                       <Text style={styles.text3}>{item.des}</Text> */}

                   </TouchableOpacity>
               </View>
              </View>
              }
              /> 
            </SafeAreaView>
        )
        
    } else {
        
    }
}
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Image/arrow2.png')}
           title={`My FD's`}
           onPress={()=>navigation.goBack()}
           />
            {fdData.length>0? <View style={{flex:1,paddingHorizontal:15,}}>
            <View style={{
                paddingHorizontal:20,
                paddingVertical:2, 
                marginVertical:10,
                borderRadius:10,
                borderColor:colors.textColor,
                backgroundColor:'white',
                justifyContent:'center'
                }}>
            <RNPickerSelect
                onValueChange={(val)=>console.log(val)}
                items={Sorting}
                style={{ 
                inputAndroid: { color: colors.bc,height:36,marginTop:2,fontFamily:'Montserrat-Regular'},
                inputIOS:{color:colors.bc},
                placeholder:{color:colors.bc,fontSize:fontSize.twelve,marginTop:2,fontFamily:'Montserrat-Regular'},
                }}
                value={sort}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                Icon={()=>
                    <Image 
                    style={{
                        width:25,height:9,
                        alignSelf:'center',justifyContent:'center',
                        marginTop:Platform.OS=='android'?11:4
                    }} 
                 source={require('../../../assets/Image/down.png')}/>}   
         />             
            </View>
             <View>  
             {isFetching?<Loader/>:null} 
                {showContent()}
             </View>
             </View>:<View/>}
           <StatusBar/>
       </View>
    )
}
export default Notification;

const selector=[
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'},
{title:'testing',des:'this is your fd fixed'}
]
const Sorting=[
    { label: 'Draft FD', value: 'Draft FD' },
    { label: 'Active FD', value: 'Active FD' },
    { label: 'Redeemed FD', value: 'Redeemed FD' },
]