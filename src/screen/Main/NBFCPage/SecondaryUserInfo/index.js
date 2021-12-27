import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView,TextInput,Platform,BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../../component/StatusBar';
import colors from '../../../../component/colors';
import Header from '../../../../component/compareHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../../component/button1';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../../../../component/loader';
const RegisterPage=({route})=>{
    const navigation=useNavigation('')
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const data=route.params.data[0]
    const my_fixed_deposit_id=route.params.my_fixed_deposit_id
    console.log('this is uder narendra pal f;adk', route.params);
   const validateUser=async()=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      dispatch({
        type: 'Create_FD_Request',
        url: 'addmyfd',
        formtype:'secondaryuser',
        deposit_option:'',
        amount:'',
        tenure:'',
        name:data.name==0||data.name=='undefined'?0:data.name,
        mobile_number:data.mobile==0||data.mobile=='undefined'?0:data.mobile,
        email:data.email==0||data.email=='undefined'?0:data.email,
        address_communication:data.address1==0||data.address1=='undefined'?0:data.address1,
        address_permanent:data.address2==0||data.address2=='undefined'?0:data.address2,
        qualifications:data.education==0||data.education=='undefined'?0:data.education,
        mother_name:data.mother_maiden_name==0||data.mother_maiden_name=='undefined'?0:data.mother_maiden_name,
        father_name:data.father_spouse_name==0||data.father_spouse_name=='undefined'?0:data.father_spouse_name,
        marital_status:data.marital_status==0||data.marital_status=='undefined'?0:data.marital_status,
        my_fixed_deposit_id:my_fixed_deposit_id,
        spouse_name:'',
        occupation:data.occupation==0||data.occupation=='undefined'?0:data.occupation,
        annual_income:data.income_group==0||data.income_group=='undefined'?0:data.income_group,
        fd_user_id:user_id,
        user_id:user_id,
        user_dob:data.dob,
        pan:data.pan,
        user_relation:data.relation,
        cheque_copy:'',
        address_proof:'',
        pan_card:'',
        user_photo:'',
        nominee_name:'',
        relationship:'',
        dob:'',
        nominee_address:'',
        secondarySecondData:route.params.data,
        navigation:navigation
    })
   }
    return(
               <View style={styles.container}>
                  <Header
                     source={require('../../../../assets/Image/arrow2.png')}
                     title='SECONDARY USER INFO'
                     onPress={()=>navigation.goBack()}
                  />
                  {isFetching?<Loader/>:null}
                  <ScrollView style={styles.scroll}>
                  <KeyboardAwareScrollView
                     extraScrollHeight={10}
                     enableOnAndroid={true} 
                     keyboardShouldPersistTaps='handled'
                     contentContainerStyle={{flex:1}}>
                     <View style={styles.main}>
                       <View style={styles.row}>
                          <Text style={styles.better}>Name</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.name==0?'':data.name}
                             editable={false}
                           />
                       </View>
                       
                       <View style={styles.row}>
                          <Text style={styles.better}>Father/Spouse Name</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.father_spouse_name==0||data.father_spouse_name=='undefined'?'':data.father_spouse_name}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Mother Maiden Name</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.mother_maiden_name==0||data.mother_maiden_name=='undefined'?'':data.mother_maiden_name}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Gender</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.gender==1?'Male':data.gender==2?'Female':data.gender==3?'Others':''}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Date of Birth</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.dob}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Email</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.email}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Mobile</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.mobile}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>PAN</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.pan==0||data.pan=='undefined'?'':data.pan}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Address Line1</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.address1==0||data.address1=='undefined'?'':data.address1}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Address Line2</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.address2==0||data.address2=='undefined'?'':data.address2}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Pincode</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.pincode==0||data.pincode=='undefined'?'':data.pincode}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Occupation</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.occupation==0||data.occupation=='undefined'?'':data.occupation}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Country</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.country_name==0||data.country_name=='undefined'?'':data.country_name}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>State</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.state_name==0||data.state_name=='undefined'?'':data.state_name}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>City</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.city_name==0||data.city_name=='undefined'?'':data.city_name}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Relationship</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.relation==0||data.relation=='undefined'?'':data.relation}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Income Group</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.income_group==0||data.income_group=='undefined'?'':data.income_group}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Education</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.education==0||data.education=='undefined'?'':data.education}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Marital Status</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.marital_status==0||data.marital_status=='undefined'?'':data.marital_status}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Residential Status</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.residential_status==0||data.residential_status=='undefined'?'':data.residential_status}
                             editable={false}
                           />
                       </View>
                       
                    <View style={{paddingVertical:30,marginBottom:10}}>
                     <CustomButton
                     title='VERIFY & CONTINUE'
                     onPress={()=>validateUser()}
                     />
                    </View>
                    </View>
                    </KeyboardAwareScrollView>
                    </ScrollView>
                 <StatusBar/>
             </View>
    )
}
export default RegisterPage;
