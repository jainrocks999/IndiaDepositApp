import React,{useEffect, useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity,TextInput,Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import colors from '../../../../component/colors';
import { FlatList } from "react-native-gesture-handler";
import StatusBar from '../../../../component/StatusBar';
import styles from './styles';
import { useDispatch ,useSelector} from 'react-redux';
import Loader from '../../../../component/loader';
import Storage from '../../../../component/AsyncStorage';
import AsyncStorage from "@react-native-community/async-storage";

const BankCalu=({route})=>{
    const navigation = useNavigation()
    const [selectedItems, setSelectedItems] = useState([]);
    const [amount,setAmount]=useState(route.params.amount)
    const isFetching=useSelector(state=>state.isFetching)
    const dispatch=useDispatch()
    const re = /^[0-9\b]+$/;

const validateUser=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  dispatch({
    type: 'Create_FD_Request',
    url: 'addmyfd',
    formtype:'selectplan',
    deposit_option:'annual',
    amount:amount,
    tenure:selectedItems[0],
    name:'',
    mobile_number:'',
    email:'',
    address_communication:'',
    address_permanent:'',
    qualifications:'',
    mother_name:'',
    father_name:'',
    marital_status:'',
    my_fixed_deposit_id:'',
    spouse_name:'',
    occupation:'',
    annual_income:'',
    fd_user_id:'',
    user_id:user_id,
    cheque_copy:'',
    address_proof:'',
    pan_card:'',
    user_photo:'',
    nominee_name:'',
    relationship:'',
    dob:'',
    nominee_address:'',
    navigation:navigation
})
}
    const ListItem = ({item, selected, onPress,}) => (
        <View style={{width:'33.3%',alignItems:'center',justifyContent:'center',height:85}}>
            <View  style={styles.touch1}>
                 <TouchableOpacity
                //  disabled={selectedItems.length>0?true:false} 
                 onPress={onPress}
                 style={styles.imageView}>
                    <Text style={[styles.text,{color:colors.textColor}]}>{item.name}</Text>
                    <Text style={[styles.text,{color:colors.textColor}]}>{item.name1}</Text>
                 </TouchableOpacity>
                 {selected && <View style={styles.enable}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={styles.touch1}>
                     <View>
                       <Text style={[styles.text,{color:colors.white}]}>{item.name}</Text>
                       <Text style={[styles.text,{color:colors.white}]}>{item.name1}</Text>
                     </View>
                   </TouchableOpacity>
               </View>
                 }
             </View>
         </View>                                           
   
   );

   const getSelected = contact => selectedItems.includes(contact.data);
   const selectItems = item => {
     if (selectedItems.includes(item.data)) {
       return setSelectedItems([]);
     }
     setSelectedItems([item.data,item.intrest]);
   };

   const handleOnPress = contact => {
      selectItems(contact)
  };

const value=(amount* Math.pow((1 + (selectedItems[0] / (1 * 100))), (1 * selectedItems[1]))).toFixed(0)
const value1=(amount* Math.pow((1 + (selectedItems[0] / (1 * 100))), (1 * selectedItems[1]))-amount).toFixed(0)
 
return(
  <View style={styles.container1}>
     <View style={styles.container}>
          <TouchableOpacity  onPress={()=>navigation.goBack()}>
            <Image style={{height:32,width:32,tintColor:colors.white}}
              source={require('../../../../assets/Image/arrow2.png')}
            />
          </TouchableOpacity>
          <Text style={{color:colors.white,fontSize:18,fontFamily:'Montserrat-SemiBold',}}>{'SELECT PLAN'}</Text>
         <View style={{width:'20%'}}/>
    </View>
    {isFetching?<Loader/>:null}
    <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
       <View style={styles.card}>
          <Text style={styles.text2} onPress={()=>navigation.navigate('UserSelection')}>Deposit Amount</Text>
           <View style={{paddingHorizontal:5,flexDirection:'row',alignItems:'center',marginTop:-10}}>
           <Image style={{width:12,height:18}} source={require('../../../../assets/Image/rupay.png')}/>
             <View style={{width:'100%',marginTop:0}}>
             <TextInput 
                placeholder=' Enter your deposit amount'
                value={amount}
                placeholderTextColor={colors.heading1}
                keyboardType='number-pad'
                style={{color:colors.textColor,width:'90%'}}
                onChangeText={(val)=>{
                  if (re.test(val)||val=='') {
                    setAmount(val)
                  }
                }}
              />
               </View>  
               
                   
           </View>
           <View style={{
                 borderBottomWidth:1.5,borderColor:colors.bc,width:'100%',marginHorizontal:10,marginTop:-10}}/>
             <View style={{paddingHorizontal:5}}>
               <Text style={styles.Text1}>Deposit Period</Text>
  
               <View style={{borderWidth:1,borderRadius:6,height:40,marginTop:10,paddingHorizontal:10}}>
                  <TextInput style={{width:'90%'}}
                       value={selectedItems[0]?`${selectedItems[0]} Years`:''}
                       placeholderTextColor={colors.heading1}
                       onChangeText={selectedItems[0]}
                       style={{color:colors.textColor,width:'90%'}}
                       editable={false}
                   />
                </View>
                </View>
                <View style={{marginTop:15}}>
                 <View 
                   style={{ flexDirection:'row',justifyContent:'space-between',}}>
                       <FlatList
                         style={{ width: '100%' }}
                         data={data}
                         numColumns={3}
                         extraData={selectItems[0]}
                         keyExtractor={(item, index) => item.id}
                          renderItem={({item})=>(
                          <ListItem
                          onPress={() => handleOnPress(item)}
                          selected={getSelected(item)}
                          item={item}
                        
                          />
                           )}
                        />
                  </View >
                </View>
                <View style={styles.mContainer}>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.amount}>{'Maturity amount:'}</Text>
                    <Text style={styles.maturity}>{value=='NaN'?0:value}</Text>
                  </View>

                  <View style={{alignItems:'center'}}>
                    <Text style={styles.amount}>{'Intrest Amount:'}</Text>
                    <Text style={styles.maturity}>{value1=='NaN'?0:value1}</Text>
                  </View>
                </View>
                <View style={{marginTop:20}}>
                   <TouchableOpacity
                    disabled={selectedItems[0]&&amount?false:true}
                    onPress={()=>validateUser()}
                    style={{
                      width:'100%',
                      backgroundColor:selectedItems[0]&&amount? colors.bc:'grey',
                      height:50,
                      borderRadius:30,
                      alignItems:'center',
                      justifyContent:'center'
                      }}>
                      <Text style={{color:colors.white}}>{'CONTINUE'}</Text>
                    </TouchableOpacity>   
                
                </View>
        </View> 
   </ScrollView>
     <StatusBar/>       
  </View>
)
}
export default BankCalu;
const data=[{
     name:'5 Years',
     name1:'6.4%p.a.',
     id:5,
     data:'5',
     intrest:'6.4'
    },
    {
      name:'4 Years', 
      id:4, 
      name1:'6.0%p.a.',
      data:'4',
      intrest:'6'
    },
    {
      name:'3 Years',
      id:3, 
      name1:'5.9%p.a.',
      data:'3',
      intrest:'5.9'
    },
    {
      name:'2 Years',
      id:2, 
      name1:'5.4%p.a.',
      data:'2',
      intrest:'5.4'
    },
    {
      name:'1 Years',
      id:1, 
      name1:'4.9%p.a.',
      data:'1',
      intrest:'4.9'
    },
]
