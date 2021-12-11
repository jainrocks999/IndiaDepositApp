import React,{useEffect,useState} from 'react';
import { View,Text,Image,FlatList,TouchableOpacity ,PermissionsAndroid} from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import RNFetchBlob from 'rn-fetch-blob'
import Loader from '../../../component/loader';

const fd_form=({route})=>{
    const navigation=useNavigation()
    const [data,setData]=useState(route.params.response)
    const [form_type,setFormType]=useState(route.params.type)
    const [form_for,setFormFor]=useState(route.params.from)
    console.log(route.params);
    useEffect(async()=>{
        
    },[])

const manageFilter=async()=>{
  try {
    const data = new FormData();
    data.append('form_type',form_type)
    data.append('form_for_id',route.params.id)
    data.append('from_for',form_for)

    const response = await axios({
      method: 'POST',
      data,
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
      url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getform',
    });
    console.log('this is response value',response);
    if (response.data.status==200) {
       console.log('hi here');
       setData(response.data.data)
    } 
  } catch (error) {
   throw error;
  }
}
const changeValue=(val)=>{
  setFormType(val)
  manageFilter()
}
const changeValue1=(val)=>{
  setFormFor(val)
  manageFilter()
}
   const actualDownload = (url) => {
        const { dirs } = RNFetchBlob.fs;
        console.log('this isi working');
       RNFetchBlob.config({
         fileCache: true,
         addAndroidDownloads: {
         useDownloadManager: true,
         notification: true,
         mediaScannable: true,
         title: `test.pdf`,
         path: `${dirs.DownloadDir}/test.pdf`,
         },
       })
         .fetch('GET', url, {})
         .then((res) => {
           console.log('The file saved to ', res.path());
         })
         .catch((e) => {
           console.log(e)
         });
     }
     
    const downloadFile = async(item) => {
    
       try {
           const granted = await PermissionsAndroid.
           request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             actualDownload(item);
           } else {
            //  Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
           }
         } catch (err) {
           console.warn(err);
         } 
     }



const renderItem=(item)=>{
    return(
<View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
    <Text style={{fontSize:14,fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{item.form_name}</Text>
    <TouchableOpacity
    onPress={()=>downloadFile(item.form_attachment)}
    style={{marginLeft:30,width:60,height:60,alignItems:'center',justifyContent:'center'}}>
     <Image source={require('../../../assets/Image/pdf.png')}/>
    </TouchableOpacity>
</View>
    )
}

    return(
        <View style={styles.container}>
          <Header
          title={'FORM'}
          source={require('../../../assets/Image/arrow2.png')}
          onPress={()=>navigation.goBack()}
          />
          <View style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
             {data.length>0? <View style={styles.card}>
              <Text style={styles.heading}>{'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic orweb designs. The passage is attributed to an unknown typesetter book.'}</Text>
             {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
               <View style={styles.view}>
                     <RNPickerSelect
                        onValueChange={(val)=>changeValue(val)}
                        items={Data}
                        style={{
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' ,fontSize:13,fontFamily:'Montserrat-Regular'},
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={form_type}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Form Type", value: 0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                     source={require('../../../assets/Image/down.png')}/>}   
                  />        
               </View>
               <View style={styles.view}>
                     <RNPickerSelect
                        onValueChange={(val)=>changeValue1(val)}
                        items={Data1}
                        style={{ 
                        inputAndroid: { color: colors.textColor,height:35,width:'100%' ,fontSize:13,fontFamily:'Montserrat-Regular' },
                        placeholder:{color:colors.heading1,width:'100%',height:35,alignSelf:'center'}
                        }}
                        value={form_for}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Form For", value: 0 }}
                        Icon={()=>
                        <Image 
                        style={{marginLeft:12,width:25,height:9,marginTop:Platform.OS=='android'?11:4}} 
                     source={require('../../../assets/Image/down.png')}/>}   
                  />        
               </View>
             </View> */}
              <FlatList
              data={data}
              renderItem={({item})=>renderItem(item)}
              style={{marginTop:20}}
              keyExtractor={(item)=>item.form_id}
              />
              </View>:
              // setTimeout(() => {
              //   <Loader/>
              // }, 2000)
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <Text style={{fontFamily:'Montserrat-Regular',fontSize:15}}>{`We don't have any forms available for download.`}</Text>
           </View>
              }
          </View>
        </View>
    )
}
export default fd_form
const Data=[
  { label: 'Specific', value: 'specific' },
  { label: 'Comman', value: 'common' },
]
const Data1=[
  { label: 'Fixed Deposit', value: 'fixeddeposit' },
  { label: 'Saving Account', value: 'savingaccount' },
  { label: 'all', value: 'all' },

]