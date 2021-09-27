import React,{useRef,useEffect,useState} from "react";
import {View,Text,FlatList,Image,TouchableOpacity,TextInput} from 'react-native';
import Header from '../../../component/compareHeader';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from "../../../component/StatusBar";
import { useDispatch,useSelector } from 'react-redux';
import colors from '../../../component/colors';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import fontSize from '../../../component/fontSize';
import RNPickerSelect from "react-native-picker-select";
import Button from '../../../component/button1';
import Toast from 'react-native-simple-toast';
import Loader from '../../../component/loader';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
const SBAccountList=({route})=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.SBList)
        const [selectedData,setSelectedData]=useState([])
        const [visible,setVisible]=useState(false)
        const [type, setType] = useState(route.params.type1)
        const [balance,setBalance] = useState(route.params.balance)
        const [location,setLocation]=useState(route.params.location)
        const isFetching=useSelector((state)=>state.isFetching)

      
const manageList=(item)=>{
  dispatch({
    type: 'SB_Detail_Request',
    url: 'sblist',
    saving_account_id:item,
    navigation:navigation
  })
}

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
       type1:type,
       type2:'',
       type3:'',
       type4:'',
       type5:'',
       navigation:navigation
     })
     setVisible(false)
  }
 }
const handleonPress=(id)=>{
  if(selectedData.length){
    handleSelectionMultiple(id)
  }else{
    manageList(id)
  }
}

const handleSelectionMultiple = (id) => {
  var selectedIds = [...selectedData] // clone state

  if(selectedIds.includes(id))
    selectedIds = selectedIds.filter(_id => _id !== id)
  else 
    selectedIds.push(id)
    setSelectedData(selectedIds)
}

const compareFD=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  console.log('this is selected data',selectedData);
  if(selectedData.length==2){
    dispatch({
      type: 'SB_Compare_Request',
      url: 'sbcompare',
      user_id,
      value_id1:selectedData[0],
      value_id2:selectedData[1],
      navigation
    })
    setSelectedData([])
  }
  else{
     
  }
  }
  
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <TouchableOpacity 
                    onLongPress={(val)=>handleSelectionMultiple(item.saving_account_id)}
                    onPress={()=>handleonPress(item.saving_account_id)}
                    style={[styles.card,{
                      backgroundColor:selectedData.includes(item.saving_account_id) ? colors.bc :'#fff',
                      padding:13,
                      }]}>
                   <View style={styles.cardView}>
                      <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%'}}></View>
                   </View>
                   <View style={[styles.row2,{paddingRight:10}]}>
                     <View style={[styles.width,{  alignItems:'flex-start'}]}>
                       <Text style={styles.same}>{item.rate}</Text>
                       </View>
                       <View style={[styles.width,{  alignItems:'center'}]}>
                       <Text style={styles.same}>{item.non_maitenance_penalty_rural}</Text>
                       </View>
                       <View style={[styles.width,{  alignItems:'center'}]}>
                       <Text style={styles.same}>{item.debit_card_amc_charges1}</Text>
                       </View>
                       <View style={[styles.width,{  alignItems:'center'}]}>
                       <Text style={styles.same}>{item.offers==null?'No':item.offers}</Text>
                       </View>
                   </View>
                   <View style={[styles.row2,{marginTop:0}]}>
                   <View style={[styles.width,{  alignItems:'flex-start'}]}>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/interest.png')}/>
                        </View>
                        <View style={[styles.width,{  alignItems:'center'}]}>
                       <Image
                         style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/penalty.png')}/>
                      </View>
                      <View style={[styles.width,{  alignItems:'center'}]}>
                       <Image 
                        style={styles.image} 
                       resizeMode='contain' source={require('../../../assets/Image/debit.png')}/>
                      </View>
                      <View style={[styles.width,{  alignItems:'center'}]}>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/offer.png')}/>
                        </View>
                   </View>
                   <View style={styles.row1}>
                   <View style={[styles.width,{  alignItems:'flex-start'}]}>
                     <Text  style={styles.same}>{'Interest\n Rate'}</Text>
                     </View>
                     <View style={[styles.width,{  alignItems:'center'}]}>
                     <Text  style={styles.same}>{'Non Maintenance\nPenalty'}</Text>
                     </View>
                     <View style={[styles.width,{  alignItems:'center'}]}>
                     <Text  style={styles.same}>{'Debit Card\nAMC'}</Text>
                     </View>
                     <View style={[styles.width,{  alignItems:'center'}]}>
                     <Text  style={[styles.same]}>{'Life Style\nOffer'}</Text>
                     </View>
                   </View>
                 </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
               <View>
            <View style={styles.mains}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{height:35,width:35,tintColor:colors.white}}  source={require('../../../assets/Images/arrow.png')}/>
            </TouchableOpacity>
            <View style={styles.views}>
            <Text style={styles.texts}>{'SB A/C LISTING'} </Text>
            </View>
            {selectedData.length==2?
            <TouchableOpacity 
             onPress={()=>compareFD()}
            style={styles.squareView}>
                <Text style={{fontSize:fontSize.eleven,color:colors.bc,fontFamily:'Montserrat-Normal',}}>{'Campare'}</Text>
            </TouchableOpacity>:<View></View>
            }
           </View>
        </View>   
               {isFetching?<Loader/>:null}
                       <Dialog
                          dialogStyle={{width:'94%',paddingHorizontal:10}}
                          visible={visible}
                          onTouchOutside={()=>setVisible(false)}
                         >
                       <DialogContent >
                       <View >
                  < View style={styles.view5}>
                     
                     <View  style={{marginTop:2}}>
                        <Text style={{fontFamily:'Montserrat-Normal',color:colors.bc,fontSize:16}}>Modify your search</Text>
                     </View>
                     <View style={styles.view5}>
                        <View style={styles.view52}>  
                             </View>
                        </View>
                      </View>
                      <View >
                           <View style={styles.view4}>
                               <Text style={[styles.text5,{fontSize:14}]}>Minimum Balance</Text>
                           </View>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                               <Image style={{height:18,width:12}} source={require('../../../assets/Image/rupay.png')}/>
                              <TextInput
                                 style={{paddingBottom:-10,width:'100%',marginTop:-10}}
                                 placeholderTextColor={colors.heading1}
                                 keyboardType='number-pad'
                                 defaultValue={balance}
                                 onChangeText={(val)=>setBalance(val)}
                              />
                           </View>
                           <View style={{borderWidth:1,marginTop:-1,borderColor:'#3D4785',}}></View>
                      </View>
                      <View style={{marginTop:25}}>
                          <View style={styles.view4}>
                              <Text style={[styles.text5,{fontWeight:'700'}]}>Location</Text>
                          </View>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:28}}>
                                <Image style={{width:24,height:24}} source={require('../../../assets/Image/search.png')}/>
                                <Text style={[styles.text5,{marginLeft:20}]}>Current Location</Text>
                          </View>
                       </View>
                       <View style={styles.view6}>
                             <Text style={{fontWeight:'700',fontFamily:'Montserrat-Normal'}}>OR</Text>
                       </View>
                      <View style={styles.view7}>
                           <TextInput
                              style={{borderBottomWidth:1.5,borderColor:'#3D4785',paddingBottom:0}}
                              placeholder='Enter Pincode'
                              placeholderTextColor={colors.heading1}
                              value={location}
                              onChangeText={(val)=>setLocation(val)}
                              keyboardType='number-pad'
                              maxLength={6}
                           />
                       </View>

                       <View style={{marginTop:26}}>
                           <Text style={{fontSize:14,fontFamily:'Montserrat-Normal',}}>Type of SB A/C</Text>
                           <RNPickerSelect
                                           onValueChange={(val)=>setType(val)}
                                           items={SBType}
                                           style={{ 
                                           inputAndroid: { color: colors.textColor,width:'100%',height:40 },
                                           placeholder:{color:colors.heading1,fontSize:fontSize.twelve}
                                           }}
                                           value={type}
                                           useNativeAndroidPickerStyle={false}
                                           placeholder={{ label: "Select SB A/C", value: null }}
                                           Icon={()=><Image 
                                           style={{width:24,height:24,marginTop:5}} 
                                           source={require('../../../assets/Image/down.png')}/>}
                                       />
                           <View style={{borderWidth:1,marginTop:-10,borderColor:'#3D4785',}}></View>
                       </View>
                       <View style={styles.view8}>
                            <Button
                                onPress={()=>manageSearch()}
                                title='MODIFY'
                            />
                       </View>
                     </View>
                      
                        </DialogContent>
                       
                      </Dialog>
              <View style={styles.list}>
                <TouchableOpacity
                onPress={()=>setVisible(true)}
                style={{width:'100%',paddingHorizontal:5,paddingVertical:6}}>
                  <View style={[styles.card,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,paddingVertical:8}]}>
                    <Text style={{fontFamily:'Montserrat-Normal',color:colors.bc,fontSize:14}}>{`Minimum balance : ${route.params.balance}`}</Text>
                     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontFamily:'Montserrat-Normal',color:colors.bc,fontSize:14,marginRight:15}}>{`Location : ${route.params.location}`}</Text>
                        <Image resizeMode='contain' source={require('../../../assets/Images/down.png')}/>
                    </View>
                  </View>
               </TouchableOpacity>
                <FlatList
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   keyExtractor={(item, index) => item.source}
                   style={{width:'100%'}}
                 />

              </View>
         
          <StatusBar/>
         
       </View>
    )
}
export default SBAccountList;
const SBType=[
  { label: 'Regular', value: 'Regular' },
  { label: 'Female', value: 'Female' },
  { label: 'Defense', value: 'Defense' },
  { label: 'Zero Balance', value: 'Zero Balance' },
  { label: 'Senior Citizen', value: 'Senior Citizen' },
]