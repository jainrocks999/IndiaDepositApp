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
import Storage from "../../../component/AsyncStorage";
import AsyncStorage from '@react-native-community/async-storage';
import MultiSelect from 'react-native-multiple-select';

const FDList=({route})=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.FDList)
        const isFetching=useSelector((state)=>state.isFetching)
        const [selectedData,setSelectedData]=useState([])
        const [visible,setVisible]=useState(false)
        const [day, setDay] = useState(route.params.days)
        const [month, setMonth] = useState(route.params.month)
        const [year,setYear] = useState(route.params.year)
        const [amount,setAmount] = useState(route.params.amount)
        const [pincode,setPincode]=useState(route.params.location)
        const [selected,setSelected]=useState(route.params.type1)
        const [sort,setSort]=useState('Alphabetical')
console.log('thisi sis selected',selected);
     console.log('fdasfjkladsjfakldjfskldafjkldjs',route.params);

const manageList=(item)=>{
  dispatch({
    type: 'FD_Detail_Request',
    url: 'fddetail',
    fixed_deposit_id:item,
    navigation:navigation
  })
  
}
const manageSearch=async()=>{
if(year==0 && month==0 && day==0){
    Toast.show('Tenure should be more than 7 days')
 }
 else if(year==0 && month==0 && day<7){
    Toast.show('Tenure should be more than 7 days')
 }
  else if(amount==''){
     Toast.show('Please enter amount')
  }
  else if(pincode==''){
     Toast.show('Please enter location')
  }
   
  else{
  dispatch({
     type: 'FD_Search_Request',
     url: 'fdlist1',
     year:year,
     month:month,
     days:day,
     amount:amount,
     location:pincode,
     type1:selected,
     bank_id:'',
     interest_rate:'',
     nationalized:'',
     sb_account_required:'',
     offer:'',
     gender:'',
     interest_payout:'',
     premature_penalty:'',
     oan:'',
     navigation:navigation
   })
   setVisible(false)
  //  setSelected([])
}
}
const compareFD=async()=>{
const user_id=await AsyncStorage.getItem(Storage.user_id)
if(selectedData.length==0){
Toast.show('Please select FD for Compare')
}
else if(selectedData.length==1){
  Toast.show('Please select one more FD')
}
else if(selectedData.length>2)(
  Toast.show('Please select only two FD')
)
else{
  dispatch({
    type: 'FD_Compare_Request',
    url: 'fdcompare',
    user_id,
    value_id1:selectedData[0],
    value_id2:selectedData[1],
    navigation
  })
  // setSelectedData([])
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


const openDialog=()=>{
  setVisible(true)
  // setSelected([])
}
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <TouchableOpacity 
                    onLongPress={(val)=>handleSelectionMultiple(item.fixed_deposit_id)}
                    onPress={()=>handleonPress(item.fixed_deposit_id)}
                    style={[styles.card,
                      {
                      backgroundColor:selectedData.includes(item.fixed_deposit_id) ? '#c9c9f0' :'#fff',
                      padding:13,
                      }
                      ]}>
                    <View style={styles.cardView}>  
                      <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%'}}></View>
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7,}}>

                     <View style={{alignItems:'center'}}>
                     <Text style={styles.same}>{item.rate}</Text>
                     <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/interest.png')}/>
                          <Text  style={styles.same}>{'Interest\n Rate'}</Text>
                     </View>

                     <View style={{alignItems:'center'}}>
                       <Text style={styles.same}>{item.min_amount}</Text>
                       <Image
                         style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/maturity.png')}/>
                     <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                     </View>

                     <View style={{alignItems:'center'}}>
                       <Text style={styles.same}>{item.loan}</Text>
                       <Image 
                        style={styles.image} 
                       resizeMode='contain' source={require('../../../assets/Image/loan.png')}/>
                     <Text  style={styles.same}>{'Loan'}</Text>
                         </View>  
                     <View style={{alignItems:'center'}}>
                     <Text style={styles.same}>{item.premature_penality}</Text>
                     <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/premature.png')}/>
                     <Text  style={[styles.same]}>{'Premature\nPenalty'}</Text>
                     </View>
                   </View>
                   {/* <View style={[styles.row2,{width:'93%'}]}>
                       <Text style={styles.same}>{item.rate}</Text>
                       <Text style={styles.same}>{item.min_amount}</Text>
                       <Text style={styles.same}>{item.loan}</Text>
                       <Text style={styles.same}>{item.premature_penality}</Text>
                   </View>
                   <View style={[styles.row2,{width:'96%'}]}>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/interest.png')}/>
                       <Image
                         style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/maturity.png')}/>
                       <Image 
                        style={styles.image} 
                       resizeMode='contain' source={require('../../../assets/Image/loan.png')}/>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/premature.png')}/>
                   </View>
                   <View style={styles.row1}>
                     <Text  style={styles.same}>{'Interest\n Rate'}</Text>
                     <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                     <Text  style={styles.same}>{'  Loan'}</Text>
                     <Text  style={[styles.same]}>{'Premature\nPenalty'}</Text>
                   </View> */}
                 </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1,backgroundColor:colors.card}}>
           <View>
            <View style={styles.mains}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image style={{height:35,width:35,tintColor:colors.white}}  source={require('../../../assets/Images/arrow.png')}/>
            </TouchableOpacity>
            <View style={styles.views}>
            <Text style={styles.texts}>{'FD LISTING'} </Text>
            </View>
            <View></View>
           </View>
        </View>   
                  {isFetching?<Loader/>:null}
                       <Dialog
                          dialogStyle={{width:'94%'}}
                          visible={visible}
                        
                          //onTouchOutside={()=>setVisible(false)}
                          onHardwareBackPress={()=>setVisible(false)}
                         >
                       <DialogContent >
                       <View >
                  < View style={styles.view5}>
                     <Text style={{marginTop:10,color:colors.bc}}>Modify your search</Text>
                     <View  style={{marginTop:10,}}>
                        <Text style={[styles.text5,{fontWeight:'700'}]}>Tenure</Text>
                     </View>
                     <View style={styles.view5}>
                        <View style={styles.view52}>
                              <View style={styles.view53}>
                                 <View style={styles.input5}>
                                    <RNPickerSelect
                                      onValueChange={(val)=>setYear(val)}
                                      items={Years}
                                      style={{ 
                                      inputAndroid: { color: colors.textColor,width:'100%',height:40 },
                                      placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                      }}
                                      value={year}
                                      useNativeAndroidPickerStyle={false}
                                      placeholder={{ label: "YY", value: null }}
                                      Icon={()=><Image 
                                      style={styles.image4} 
                                      source={require('../../../assets/Image/down.png')}/>}
                                    />
                                      <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-8}}/>
                                  </View>
                               </View>
                               <View style={styles.view53}>
                                    <View style={styles.input5}>
                                       <RNPickerSelect
                                          onValueChange={(val)=>setMonth(val)}
                                          items={Month}
                                          style={{ 
                                          inputAndroid: { color: colors.textColor,width:'100%',height:40 },
                                          placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                          }}
                                          value={month}
                                          useNativeAndroidPickerStyle={false}
                                          placeholder={{ label: "MM", value: null }}
                                          Icon={()=><Image 
                                          style={styles.image4} 
                                          source={require('../../../assets/Image/down.png')}/>}
                                        />
                                          <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-8}}/>
                                     </View>
                               </View>
                               <View style={styles.view53}>
                                    <View style={styles.input5}>
                                       <RNPickerSelect
                                           onValueChange={(val)=>setDay(val)}
                                           items={days}
                                           style={{ 
                                           inputAndroid: { color: colors.textColor,width:'100%',height:40 },
                                           placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                           }}
                                           value={day}
                                           useNativeAndroidPickerStyle={false}
                                           placeholder={{ label: "Days", value: null }}
                                           Icon={()=><Image 
                                           style={styles.image4} 
                                           source={require('../../../assets/Image/down.png')}/>}
                                       />
                                         <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-8}}/>
                                     </View>
                                 </View>
                             </View>
                        </View>
                      </View>
                      <View style={{marginTop:23}}>
                           <View style={styles.view4}>
                               <Text style={[styles.text5,{fontWeight:'700'}]}>Amount</Text>
                           </View>
                           <View style={{flexDirection:'row',alignItems:'center',marginTop:-10}}>
                             <Image style={{width:12,height:18}} source={require('../../../assets/Image/rupay.png')}/>
                              <TextInput
                                 style={{width:'90%'}}
                                 placeholderTextColor={colors.heading1}
                                 keyboardType='number-pad'
                                 value={amount}
                                 onChangeText={(val)=>setAmount(val)}
                              />
                           </View>
                           <View style={{borderBottomWidth:1.5,borderColor:colors.bc,marginTop:-10}}/>
                      </View>
                      <View style={{marginTop:24}}>
                          <View style={styles.view4}>
                              <Text style={[styles.text5,{fontWeight:'700'}]}>Location</Text>
                          </View>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:28}}>
                                <Image style={{width:24,height:24}} source={require('../../../assets/Image/search.png')}/>
                                <Text style={[styles.text5,{marginLeft:20}]}>Current Location</Text>
                          </View>
                       </View>
                       <View style={styles.view6}>
                             <Text style={{fontWeight:'700',fontFamily:'Montserrat-Regular'}}>OR</Text>
                       </View>
                      <View style={styles.view7}>
                           <TextInput
                              style={{borderBottomWidth:1.5,borderColor:'#3D4785',paddingBottom:0}}
                              placeholder='Enter Pincode'
                              placeholderTextColor={colors.heading1}
                              value={pincode}
                              onChangeText={(val)=>setPincode(val)}
                              keyboardType='number-pad'
                              maxLength={6}
                           />
                       </View>
                       <View style={{marginTop:16}}>
                           <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',}}>Type of FD</Text>
                           <MultiSelect     
                                items={item}
                                uniqueKey="name"
                                onSelectedItemsChange={(val)=>setSelected(val)}
                                selectedItems={selected}
                                searchIcon={false}
                                tagBorderColor={colors.bc}
                                tagRemoveIconColor={'#fff'}
                                tagTextColor={'#fff'}
                                selectText={selected.length>0?'':"Select FD"}
                                // selectedItems
                                // styleSelectorContainer={{marginTop:100}}
                                // searchInputPlaceholderText="Select FD"
                                onChangeInput={ (text)=> console.log(text)}
                                selectedItemTextColor={colors.bc}
                                selectedItemIconColor={colors.bc}
                                itemTextColor={colors.textColor}
                                displayKey="name"
                                submitButtonColor={colors.bc}
                                submitButtonText="Submit"
                                textInputProps={{ editable: false,autoFocus:false, }}
                                searchInputPlaceholderText=""
                                searchIcon={false}
                                
                                styleDropdownMenu={{
                                  width:'100%',
                                  borderBottomWidth:1.5,
                                  borderColor:colors.bc,
                                  height:55,
                                  alignSelf:'center',
                                  // paddingBottom:-10,
                                  flexDirection:'row',
                                 // marginTop:-10
                               
                                }}
                                tagContainerStyle={{backgroundColor:colors.bc}}
                              />
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
                onPress={()=>openDialog()}
                style={{width:'100%',paddingHorizontal:10,paddingVertical:6}}>
                  <View style={[styles.card,{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingHorizontal:10,
                    paddingVertical:8,
                    backgroundColor:'white'
                    }]}>
                    <Text style={{
                      fontFamily:'Montserrat-Regular',
                      color:colors.bc,fontSize:14}}>{`Amount : `}
                      <Image style={{height:18,width:12}} source={require('../../../assets/Image/rupay.png')}/>
                      {`${route.params.amount}`}
                      </Text>
                     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{
                          fontFamily:'Montserrat-Regular',
                          color:colors.bc,fontSize:14,marginRight:15}}>
                            {`Tenure : ${route.params.year}y-${route.params.month}m-${route.params.days}d`}</Text>
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
                 <View style={{
                   width:'100%',
                  // bottom:10,
                   flexDirection:'row',
                   justifyContent:'space-between',
                   paddingHorizontal:20,
                   alignItems:'center',
                   paddingVertical:10
                   }}>
                 <TouchableOpacity
                  onPress={()=>compareFD()}
                 style={{
                  paddingHorizontal:20,
                   paddingVertical:9,
                   backgroundColor:'#fff',
                   borderRadius:10
                   }}>
                   <Text style={{fontSize:13,fontFamily:'Montserrat-Regular',color:colors.bc}}>Compare</Text>
                 </TouchableOpacity>
                 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <Image source={require('../../../assets/Image/filter.png')}/>
                   <Text style={{fontFamily:'Montserrat-Regular',fontSize:13,marginLeft:3}}>Sort By</Text>
                 </View>
                 <TouchableOpacity style={{
                    paddingHorizontal:10,
                    paddingVertical:0,
                     backgroundColor:'#fff',
                     borderRadius:10,
                     flexDirection:'row',
                     alignItems:'center',
                   }}>
                      <RNPickerSelect
                          onValueChange={(val)=>setSort(val)}
                          items={Sorting}
                          style={{ 
                          inputAndroid: { color: colors.bc,height:35,marginTop:2},
                          placeholder:{color:colors.bc,fontSize:fontSize.twelve,marginTop:2},
                          }}
                          value={sort}
                          useNativeAndroidPickerStyle={false}
                          placeholder={{}}
                      />   
                   <Image style={{width:20,height:16,marginLeft:5}} 
                   resizeMethod='resize' 
                   source={require('../../../assets/Image/down.png')}/>
                 </TouchableOpacity>
                 <TouchableOpacity 
                 onPress={()=>navigation.navigate('FDFilter',{
                   data:route.params
                 })}
                 style={{
                   backgroundColor:colors.bc,
                   height:26,width:26,
                   borderRadius:13,
                   alignItems:'center',
                   justifyContent:'center'
                   }}>
                   <Image source={require('../../../assets/Image/sort.png')}/>
                 </TouchableOpacity>
                 </View>
              
              </View>
         
          <StatusBar/>
         
       </View>
    )
}
export default FDList;
const SBType=[
  { label: 'Regular', value: 'Regular' },
  { label: 'Female', value: 'Female' },
  { label: 'Defense', value: 'Defense' },
  { label: 'Zero Balance', value: 'Zero Balance' },
  { label: 'Senior Citizen', value: 'Senior Citizen' },
]
const Sorting=[
  { label: 'Popular', value: 'Popular' },
  { label: 'Alphabetical', value: 'Alphabetical' },
  { label: 'Interest Rate', value: 'Interest Rate' },
]
const days=[
   {label:'00',value:'0'},
   { label: '01', value: '1'},
   { label: '02', value: '2'},
   { label: '03', value: '3' },
   { label: '04', value: '4' },
   { label: '05', value: '5' },
   { label: '06', value: '6' },
   { label: '07', value: '7' },
   { label: '08', value: '8' },
   { label: '09', value: '9' },
   { label: '10', value: '10' },
   { label: '11', value: '11' },
   { label: '12', value: '12' },
   { label: '13', value: '13' },
   { label: '14', value: '14' },
   { label: '15', value: '15' },
   { label: '16', value: '16' },
   { label: '17', value: '17' },
   { label: '18', value: '18' },
   { label: '19', value: '19' },
   { label: '20', value: '20' },
   { label: '21', value: '21' },
   { label: '22', value: '22' },
   { label: '23', value: '23' },
   { label: '24', value: '24' },
   { label: '25', value: '25' },
   { label: '26', value: '26' },
   { label: '27', value: '27' },
   { label: '28', value: '28' },
   { label: '29', value: '29' },
   { label: '30', value: '30' },

]
const Month=[
  {label:'00',value:'0'},
  { label: '01', value: '1' },
  { label: '02', value: '2 ' },
  { label: '03', value: '3' },
  { label: '04', value: '4' },
  { label: '05', value: '5' },
  { label: '06', value: '6' },
  { label: '07', value: '7' },
  { label: '08', value: '8' },
  { label: '09', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
]

const Years=[
  {label:'00',value:'0'},
  { label: '01', value: '1' },
  { label: '02', value: '2' },
  { label: '03', value: '3' },
  { label: '04', value: '4'},
  { label: '05', value: '5' },
  
  
]
const item = [ {
  name: 'Regular',
  id: 10,
},
{
  name: 'Tax Saving',
  id: 17,
},
{
  name: 'NRI',
  id: 13,
},
{
  name: 'Senior Citizen',
  id: 15,
},
];