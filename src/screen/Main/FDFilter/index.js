import React,{useState,useEffect} from 'react';
import { View,Text,Image, TextInput ,Switch,ScrollView,BackHandler} from "react-native";
import colors from '../../../component/colors';
import Slider  from "react-native-slider";
import styles from './styles';
import CheckBox from "@react-native-community/checkbox";
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Loader from '../../../component/loader';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from "../../../component/AsyncStorage";
import fontSize from '../../../component/fontSize';

const FDFilter=({route})=>{
    const dispatch=useDispatch()
    const navigation=useNavigation()
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);
    const [isEnabled5, setIsEnabled5] = useState(false);
    const [isEnabled6, setIsEnabled6] = useState(false);
    const [isEnabled7, setIsEnabled7] = useState(false);
    const [isEnabled8, setIsEnabled8] = useState(false);
    const [gender,setGender]=useState([])
    const [selected,setSelected]=useState([])
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const [toggleCheckBox1,setToggleCheckBox1]=useState(false)
    const [toggleCheckBox2,setToggleCheckBox2]=useState(false)
    const [value1,setValue1]=useState('0')
    const [penalty,setPenalty]=useState('')
    const [loan1,setLoan]=useState('')
    const selector=useSelector((state)=>state.BankNameList)
    const isFetching=useSelector((state)=>state.isFetching)
    const data=route.params.data
    const [len,setLen]=useState(5)
    const [bankType,setBankType]=useState([])
    const [creditRating,setCreditRating]=useState([])
    const [loan,setLoans]=useState('')
    const [premature,setPremature]=useState('')
    const [clear,setClear]=useState(false)

useEffect(()=>{
    const backAction = () => {
        navigation.goBack()
        return true;
      }
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    
      return () => backHandler.remove();
},[])
    const manageClear=()=>{
        setClear(true)
        setIsEnabled1(false)
        setIsEnabled2(false)
        setIsEnabled3(false)
        setIsEnabled4(false)
        setIsEnabled5(false)
        setIsEnabled6(false)
        setIsEnabled7(false)
        setIsEnabled8(false)
        setValue1('')
        setSelected([])
        setCreditRating([])
        setBankType([])
        setToggleCheckBox(false)
        setToggleCheckBox1(false)
        setToggleCheckBox2(false)
        setLoans('')
        setPremature('')
    }
    const applyFilter=async()=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      dispatch({
            type: 'FD_Search_Request',
            url: 'fdlist1',
            user_id,
            year:data.year,
            month:parseInt(data.month),
            days:data.days,
            amount:data.amount,
            location:data.location,
            type1:data.type1,
            bank_id:selected,
            interest_rate:parseFloat(value1).toFixed(1),
            nationalized:isEnabled1==true?1:'',
            sb_account_required:isEnabled2==true?1:'',
            offer:isEnabled3==true?1:'',
            interest_payout:isEnabled6==true?1:'',
            premature_penalty:premature,
            loan:loan,
            order_on:data.order_on,
            order_to:data.order_to,
            b_lat:data.b_lat,
            b_long:data.b_long,
            b_type:1,
            filter:'true',
            credit_rating:creditRating,
            bank_type:bankType,
            navigation:navigation
          })
        // }
    }
    const rateOnchange=(value)=>{
        if(value>10){
          setValue1(parseFloat(10).toString())
        }
        else{
          if(isNaN(value)){
          }
          else{
            setValue1(value)
          if(value<10){
            setLen(4)
          }
          else{
            setLen(5)
          }
          }  
        }
      }
    return(
        <View style={{flex:1,
       // paddingTop:Platform.OS=='android'?0:40
        }}>
            <View style={{
                flexDirection:'row',
                paddingHorizontal:20,
                paddingVertical:15 ,
                justifyContent:'space-between',
                borderBottomWidth:1,
                borderColor:colors.bc
                }}>
            
                <Text>Filters </Text>
                <Text onPress={()=>manageClear()}>CLEAR ALL</Text>
            </View>
            {/* <View> */}
            <ScrollView style={{marginBottom:0}}>
            {isFetching?<Loader/>:null}
            <View style={{paddingHorizontal:20,marginTop:20,marginBottom:30}}>
              <Text style={styles.heading}>Bank Name</Text>
              <View style={{width:'100%',marginTop:5}}>
                          <MultiSelect   
                                items={selector}
                                uniqueKey="value"
                                onSelectedItemsChange={(val)=>setSelected(val)}
                                selectedItems={selected}
                                searchIcon={false}
                                tagBorderColor={colors.bc}
                                tagRemoveIconColor={'#fff'}
                                tagTextColor={'#fff'}
                                selectText={selected.length>0?'':"Select Bank Name"}
                                single={false}
                                searchInputPlaceholderText="Select Bank"
                                selectedItemTextColor={colors.bc}
                                selectedItemIconColor={colors.bc}
                                itemTextColor={colors.textColor}
                                displayKey="label"
                                submitButtonColor={colors.bc}
                                submitButtonText="Submit"
                                textInputProps={{ editable: false,autoFocus:false }}
                
                                styleDropdownMenu={{
                                    width:'100%',
                                    borderBottomWidth:1.5,
                                    borderColor:colors.bc,
                                    height:55,
                                    alignSelf:'center',
                                    flexDirection:'row',
                                    backgroundColor:'#fff',
                                    paddingHorizontal:12
                                 
                                  }}
                                tagContainerStyle={{backgroundColor:colors.bc}}
                              />
              </View>
              <Text style={[styles.heading,{marginTop:5}]}>Credit Rating</Text>
              <View style={{width:'100%',marginTop:5}}>
                          <MultiSelect   
                                items={Credit}
                                uniqueKey="value"
                                onSelectedItemsChange={(val)=>setCreditRating(val)}
                                selectedItems={creditRating}
                                searchIcon={false}
                                tagBorderColor={colors.bc}
                                tagRemoveIconColor={'#fff'}
                                tagTextColor={'#fff'}
                                selectText={creditRating.length>0?'':"Select Credit Rating"}
                                // selectedItems
                                single={false}
                                searchInputPlaceholderText="Select Credit Rating"
                                selectedItemTextColor={colors.bc}
                                selectedItemIconColor={colors.bc}
                                itemTextColor={colors.textColor}
                                displayKey="label"
                                submitButtonColor={colors.bc}
                                submitButtonText="Submit"
                                textInputProps={{ editable: false,autoFocus:false }}
                                
                                styleDropdownMenu={{
                                    width:'100%',
                                    borderBottomWidth:1.5,
                                    borderColor:colors.bc,
                                    height:55,
                                    alignSelf:'center',
                                    flexDirection:'row',
                                    backgroundColor:'#fff',
                                    paddingHorizontal:12
                                  }}
                                tagContainerStyle={{backgroundColor:colors.bc}}
                              />
              </View>
              <Text style={[styles.heading,{marginTop:5}]}>Bank Type</Text>
              <View style={{width:'100%',marginTop:5}}>
                          <MultiSelect   
                                items={BankType}
                                uniqueKey="value"
                                onSelectedItemsChange={(val)=>setBankType(val)}
                                selectedItems={bankType}
                                searchIcon={false}
                                tagBorderColor={colors.bc}
                                tagRemoveIconColor={'#fff'}
                                tagTextColor={'#fff'}
                                selectText={bankType.length>0?'':"Select Bank Type"}
                                single={false}
                                searchInputPlaceholderText="Select Bank"
                                selectedItemTextColor={colors.bc}
                                selectedItemIconColor={colors.bc}
                                itemTextColor={colors.textColor}
                                displayKey="label"
                                submitButtonColor={colors.bc}
                                submitButtonText="Submit"
                                textInputProps={{ editable: false,autoFocus:false }}
                               
                               
                                styleDropdownMenu={{
                                    width:'100%',
                                    borderBottomWidth:1.5,
                                    borderColor:colors.bc,
                                    height:55,
                                    alignSelf:'center',
                                    flexDirection:'row',
                                    backgroundColor:'#fff',
                                    paddingHorizontal:12
                                 
                                  }}
                                tagContainerStyle={{backgroundColor:colors.bc}}
                              />
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,alignItems:'center'}}> 
                  <Text style={styles.heading}>Interest Rate Slider</Text>
                  {/* <Text>{`${parseFloat(value1).toFixed(1)=='NaN'?0:parseFloat(value1).toFixed(1)} %`}</Text> */}
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                  value={value1}
                  onChangeText={(val)=>rateOnchange(val)}
                  maxLength={len}
                  style={{color:colors.textColor}}
                  underlineColorAndroid={colors.textColor}
                  keyboardType='number-pad'
                  />
                  <Text>{`%`}</Text>
                  </View>
              </View>
                <Slider
                    minimumValue={0}
                    maximumValue={10}
                    step={.1}
                    value={parseInt(value1==''?0:value1)}
                    thumbTintColor={colors.bc}
                    minimumTrackTintColor={colors.bc}
                    // onValueChange={(value) =>setValue1(JSON.stringify(value))} 
                    onValueChange={(val)=>setValue1(parseFloat(JSON.stringify(val)).toFixed(2))}

                />


                    <View style={{marginTop:5}}>
                    <Text style={styles.heading}>Premature Penalty</Text>
                <View style={{borderWidth:1,borderColor:colors.textColor,borderRadius:8,height:40,paddingHorizontal:10,marginTop:5}}>
                 <RNPickerSelect
                          onValueChange={(val)=>setPremature(val)}
                          items={Premature}
                          style={{ 
                            inputAndroid: { color: colors.bc,width:'100%',fontSize:14,marginBottom:-1 },
                            inputIOS:{color:colors.bc},
                          placeholder:{color:colors.textColor,fontSize:fontSize.fourteen,marginTop:2,fontFamily:'Montserrat-Regular'},
                          }}
                          value={premature}
                          useNativeAndroidPickerStyle={false}
                          placeholder={{label:'Please select premature penalty',value:''}}
                          Icon={()=><Image 
                                          style={[{marginTop:Platform.OS=='android'? 14:6,
                                          marginRight:-2,
                                          height:10,
                                          width:20,},{marginLeft:10}]} 
                                          source={require('../../../assets/Image/down.png')}/>}
                      />
                    </View>
                </View>
                <View style={{marginTop:9}}>
                    <Text style={styles.heading}>Loan</Text>
                <View style={{borderWidth:1,borderColor:colors.textColor,borderRadius:8,height:40,paddingHorizontal:10,marginTop:5}}>
                 <RNPickerSelect
                          onValueChange={(val)=>setLoans(val)}
                          items={Loan}
                          style={{ 
                            inputAndroid: { color: colors.bc,width:'100%',fontSize:14,marginBottom:-1 },
                            inputIOS:{color:colors.bc},
                          placeholder:{color:colors.textColor,fontSize:fontSize.fourteen,marginTop:2,fontFamily:'Montserrat-Regular'},
                          }}
                          value={loan}
                          useNativeAndroidPickerStyle={false}
                          placeholder={{label:'Please select premature penalty',value:''}}
                          Icon={()=><Image 
                                          style={[{marginTop:Platform.OS=='android'? 14:6,
                                          marginRight:-2,
                                          height:10,
                                          width:20,},{marginLeft:10}]} 
                                          source={require('../../../assets/Image/down.png')}/>}
                      />
                    </View>
                </View>
         
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>Premature Penalty</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled7(previousState => !previousState)}
                    value={isEnabled7}
                />
                </View>
                  <View style={[styles.container1]}>
                    <Text style={styles.heading}>Loan</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled8(previousState => !previousState)}
                    value={isEnabled8}
                />
                </View> */}
                
            </View>

            </ScrollView>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                borderTopWidth:1,
                height:50,
                borderColor:colors.bc
                }}>
                <View style={{
                    alignItems:'center',justifyContent:'center',width:'49%'
                }}>
                <TouchableOpacity delayPressIn={0} onPress={()=>navigation.goBack()}>
                   <Text style={{color:colors.bc,fontFamily:'Montserrat-Bold'}}>CLOSE</Text>
                </TouchableOpacity>
                </View>
                <View style={{borderWidth:0.5,height:30,borderColor:colors.bc,}}></View>
                <View style={{
                    alignItems:'center',justifyContent:'center',width:'49%'
                }}>
                <TouchableOpacity delayPressIn={0}>
                <Text onPress={()=>applyFilter()} style={{color:colors.bc,fontFamily:'Montserrat-Bold'}}>APPLY</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default FDFilter;
const Credit=[
    { label: 'AAA', value: 'AAA' },
    { label: 'AA', value: 'AA' },
    { label: 'A', value: 'A'},
    { label: 'BBB', value: 'BBB'},
    { label: 'BB', value: 'BB'},
    { label: 'B', value: 'B'},
    { label: 'C', value: 'C'},
    { label: 'D', value: 'D'},
  ]

const BankType=[
    { label: 'Private', value: '1' },
    { label: 'Public', value: '2' },
]
const Loan=[
  {label: 'Yes', value:'1'},
  {label: 'No', value:'0'}
]
const Premature=[
{label: 'Yes', value:'1'},
{label: 'No', value:'0'}
]

