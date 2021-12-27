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
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../component/loader';
const RegisterPage=({route})=>{
    const navigation=useNavigation('')
    const data=route.params.data
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    console.log('this is data',route.params.my_fixed_deposit_id);


    const validateUser=async()=>{
      console.log('this is working');
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      dispatch({
        type: 'Create_FD_Request',
        url: 'addmyfd',
        formtype:'nomineedetail',
        deposit_option:'',
        amount:'',
        tenure:'',
        name:'',
        mobile_number:'',
        email:'',
        address_communication:'',
        address_permanent:'',
        qualifications:'',
        mother_name:'',
        father_name:'',
        marital_status:'',
        my_fixed_deposit_id:route.params.my_fixed_deposit_id,
        spouse_name:'',
        occupation:'',
        annual_income:'',
        fd_user_id:user_id,
        user_id:user_id,
        cheque_copy:'',
        address_proof:'',
        pan_card:'',
        user_photo:'',
        nominee_name:data.name,
        relationship:data.relationship,
        dob:data.dob,
        nominee_address:`${data.address1},${data.address2}`,
        navigation:navigation
    })
   }

    return(
               <View style={styles.container}>
                  <Header
                     source={require('../../../../assets/Image/arrow2.png')}
                     title='NOMINEE INFO'
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
                             value={data.name}
                             editable={false}
                           />
                       </View>
                       
                       <View style={styles.row}>
                          <Text style={styles.better}>Address Line1</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.address1}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Address Line2</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.address2}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Country</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.country}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>State</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.state}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>City</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.city}
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
                          <Text style={styles.better}>Relationship</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.relationship}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Guardian</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.guardian}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Guardian Relationship</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.guardian_relationship}
                             editable={false}
                           />
                       </View>
                       <View style={styles.row}>
                          <Text style={styles.better}>Pincode</Text>
                       </View>
                       <View style={styles.drop}>
                            <TextInput
                             style={styles.input}
                             value={data.pincode}
                             editable={false}
                           />
                       </View>
                      
                       
                    <View style={{paddingVertical:30,marginBottom:10}}>
                     <CustomButton
                     title='VERIFY & CONTINUE'
                     onPress={()=>validateUser('')}
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
