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
import Storage from '../../../component/AsyncStorage';

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

    const selector=useSelector((state)=>state.NBFCNameList)
    const isFetching=useSelector((state)=>state.isFetching)
    const data=route.params.data

useEffect(async()=>{
   const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'NBFC_Name_Request',
        url: 'bankdetaillist',
        user_id
      })
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
        setToggleCheckBox(false)
        setToggleCheckBox1(false)
        setToggleCheckBox2(false)
    }

    const applyFilter=async()=>{
        const user_id=await AsyncStorage.getItem(Storage.user_id)
        if(isEnabled7==true&&penalty==''){
            Toast.show('Please enter premature penalty rate')
         }
         else if(isEnabled8==true&& loan1==''){
             Toast.show('Please enter loan rate')
         }
         else{
      dispatch({
            type: 'NBFC_Search_Request',
            url: 'fdlist1',
                user_id:user_id,
                year:data.year,
                month:parseInt(data.month),
                days:data.days,
                amount:data.amount,
                location:data.location,
                type1:data.type1,
                bank_id:selected,
                interest_rate:value1,
                nationalized:'',
                sb_account_required:'',
                offer:'',
                gender:'',
                interest_payout:'',
                premature_penalty:isEnabled7==true?1:0,
                loan:isEnabled8==true?1:0,
                order_on:'',
                order_to:'',
                premature_withdrawal_rate:penalty,
                load_lending_rate:loan1,
                btype:2,
                b_lat:'',
                b_long:'',
                navigation:navigation
          })
        }
        }
    return(
        <View style={{flex:1,
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
              <Text style={styles.heading}>Financial Institution</Text>
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
                                selectText={selected.length>0?'':"Select NBFC Name"}
                                // selectedItems
                                single={false}
                                searchInputPlaceholderText="Select Bank"
                                onChangeInput={ (text)=> console.log(text)}
                                selectedItemTextColor={colors.bc}
                                selectedItemIconColor={colors.bc}
                                itemTextColor={colors.textColor}
                                displayKey="label"
                                submitButtonColor={colors.bc}
                                submitButtonText="Submit"
                                textInputProps={{ editable: false,autoFocus:false }}
                                searchInputPlaceholderText=""
                                searchIcon={false}
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
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}> 
                  <Text style={styles.heading}>Interest Rate Slider</Text>
                  <Text>{`${parseFloat(value1).toFixed(1)} %`}</Text>
              </View>
                <Slider
                    minimumValue={0}
                    maximumValue={10}
                    step={.1}
                    value={parseInt(value1==''?0:value1)}
                    thumbTintColor={colors.bc}
                    minimumTrackTintColor={colors.bc}
                    onValueChange={(value) =>setValue1(JSON.stringify(value))} 
                />
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>Nationalized</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled1(previousState => !previousState)}
                    value={isEnabled1}
                />
                </View> */}
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>SB account required</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled2(previousState => !previousState)}
                    value={isEnabled2}
                />
                </View> */}
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>Offer</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled3(previousState => !previousState)}
                    value={isEnabled3}
                />
                </View> */}
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>Insurance</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled4(previousState => !previousState)}
                    value={isEnabled4}
                />
                </View> */}
                {/* <View style={styles.container}>
                    <Text style={styles.heading}>Interest Payout</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled6(previousState => !previousState)}
                    value={isEnabled6}
                />
                </View> */}
                <View style={styles.container}>
                    <Text style={styles.heading}>Premature Penalty</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled7(previousState => !previousState)}
                    value={isEnabled7}
                />
                </View>
                {isEnabled7?<View style={[styles.drop,{marginTop:15}]}>
                    <TextInput
                    placeholder='Enter Here'
                    returnKeyType='done'
                    style={{fontFamily:'Montserrat-Regular',color:colors.textColor,width:'95%'}}
                    onChangeText={(val)=>setPenalty(val)}
                    value={penalty}
                    keyboardType='number-pad'
                    />
                
                </View>:<View/>}
                <View style={[styles.container1]}>
                    <Text style={styles.heading}>Loan</Text>
                    <Switch
                    trackColor={{ false: "grey", true: colors.bc }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled8(previousState => !previousState)}
                    value={isEnabled8}
            
                />
                </View>
                {isEnabled8 ?<View style={[styles.drop,{marginTop:15,marginBottom:10}]}>
                   
                <TextInput
                    placeholder='Enter Here'
                    returnKeyType='done'
                    style={{fontFamily:'Montserrat-Regular',color:colors.textColor,width:'95%'}}
                    onChangeText={(val)=>setLoan(val)}
                    value={loan1}
                    keyboardType='number-pad'
                    />
                </View>:<View/>}
                
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
const penaltys=[
    { label: '10%', value: '10%' },
    { label: '15%', value: '15%' },
    { label: '20%', value: '20%'}]
const loan=[
    { label: '10%', value: '10%' },
    { label: '15%', value: '15%' },
    { label: '20%', value: '20%'}]

    const item = [ {
        name: 'SBI',
        id: 10,
      },
      {
        name: 'Union Bank',
        id: 17,
      },
      {
        name: 'HDFC',
        id: 13,
      },
      
      ];