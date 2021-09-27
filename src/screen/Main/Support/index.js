import React,{useState,useEffect}from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import FAQs from '../../../component/TabComponents/FAQs';
import Support from '../../../component/TabComponents/Support';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import { Formik } from 'formik';
import * as yup from 'yup';
import fontSize from '../../../component/fontSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../component/loader';

const loginValidationSchema=yup.object().shape({
  name:yup.string().max(40,({max})=>`Name must be maximum ${max} character`).required('Please enter your Name ').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid name"),
  email:yup.string().email('Please enter valid Email ').required('Please enter your Email '),
  mobile:yup.string().min(10,({})=>'Mobile Number must be 10 digit number').required('Please enter your Mobile number').matches(/^[0]?[6-9]\d{9}$/,"Please enter valid Mobile Number"),
  subject:yup.string().required('Please enter subject'),
  message:yup.string().required('Please enter message')
})

const Supports=({route})=>{

  const SecondRoute = () => {
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)

    const validateUser=async(values)=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      dispatch({
        type: 'Support_Request',
        url: 'support',
        user_id:user_id,
        name:values.name,
        email:values.email,
        mobile:values.mobile,
        subject:values.subject,
        message:values.message,
        navigation:navigation
    })
    }
  
      return(
        <Formik
        initialValues={{ name: route.params.name,email:route.params.email,mobile:route.params.mobile,subject:'',message:''}}
        onSubmit={values => validateUser(values)}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
          <View style={styles.container1}>
                  <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                  <KeyboardAwareScrollView
                    extraScrollHeight={10}
                    enableOnAndroid={true} 
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{flex:1}}>
                      {isFetching?<Loader/>:null}
                    <Text style={styles.better1}>How can we help you?</Text>
                      <Text style={styles.better}>Name</Text>
                        <View style={styles.drop}>
                          <TextInput
                            style={{color:colors.textColor}}
                            placeholder='Jhon Mathew'
                            placeholderTextColor={colors.heading1}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            editable={false}
                          />
                      </View>
                      <View style={styles.error}>
                      {(errors.name && touched.name) &&
                        <Text style={styles.warn}>{errors.name}</Text>
                        }
                      </View>
                      <Text style={styles.better}>Email</Text>
                        <View style={styles.drop}>
                          <TextInput
                           style={{color:colors.textColor}}
                           placeholder='example@domain.com'
                           placeholderTextColor={colors.heading1}
                           onChangeText={handleChange('email')}
                           onBlur={handleBlur('email')}
                           value={values.email}
                           editable={false}
                          />
                      </View>
                      <View style={styles.error}>
                      {(errors.email && touched.email) &&
                        <Text style={styles.warn}>{errors.email}</Text>
                        }
                      </View>
                      <Text style={styles.better}>Mobile Number</Text>
                        <View style={styles.drop}>
                          <TextInput
                         style={{color:colors.textColor}}
                          placeholder='9123456789'
                          placeholderTextColor={colors.heading1}
                          keyboardType='phone-pad'
                          onChangeText={handleChange('mobile')}
                          onBlur={handleBlur('mobile')}
                          value={values.mobile}
                          editable={false}
                          />
                      </View>
                      <View style={styles.error}>
                      {(errors.mobile && touched.mobile) &&
                        <Text style={styles.warn}>{errors.mobile}</Text>
                        }
                      </View>
                      <Text style={styles.better}>Subject</Text>
                        <View style={styles.drop}>
                        <TextInput
                           style={{color:colors.textColor}}
                          placeholder=''
                          placeholderTextColor={colors.heading1}
                          onChangeText={handleChange('subject')}
                          onBlur={handleBlur('subject')}
                          value={values.subject}
                         
                          />
                          
                      </View>
                      <View style={styles.error}>
                      {(errors.subject && touched.subject) &&
                        <Text style={styles.warn}>{errors.subject}</Text>
                        }
                      </View>
                      <Text style={styles.better}>Message</Text>
                        <View style={styles.drop1}>
                        <TextInput
                          multiline = {true}
                          style={{color:colors.textColor}}
                          placeholder=''
                          placeholderTextColor={colors.heading1}
                          onChangeText={handleChange('message')}
                          onBlur={handleBlur('message')}
                          value={values.message}
                          />
                          
                      </View>
                      <View style={styles.error}>
                      {(errors.message && touched.message) &&
                        <Text style={styles.warn}>{errors.message}</Text>
                        }
                      </View>
                      <View style={{marginTop:20}}>
                        <CustomButton
                        title='SUBMIT'
                        onPress={()=> handleSubmit()}
                        onChangeText={handleChange('message')}
                        onBlur={handleBlur('message')}
                        value={values.message}
                        />
                      </View>
                      <View style={{marginTop:80}}></View>
                      </KeyboardAwareScrollView>
                  </ScrollView>
         </View>
          )}
          </Formik>
      )
    }
  const renderScene = SceneMap
  ({
     first: FAQs,
     second: SecondRoute,
  });

     const navigation=useNavigation()
    const [index, setIndex] = useState(0);
    const [routes] = React.useState
    ([
      { key: 'first', title: 'FAQ’S' },
      { key: 'second', title: 'SUPPORT' },
    ]);
    return(
            <View style={styles.container}>
                 <Header
                     source={require('../../../assets/Images/arrow.png')}
                     title={'SUPPORT'}
                     onPress={()=>navigation.goBack()}
                  />
                  <View style={styles.card}>
                       <TabView
                          navigationState={{ index, routes }}
                          renderScene={renderScene}
                          onIndexChange={setIndex}
                          initialLayout={{ width: '100%' }}
                          renderTabBar={props => <TabBar
                          indicatorStyle={{ 
                          backgroundColor: colors.bc, 
                          height:3,
                         
                          }}
                          renderLabel={({route, color,focused}) => (
                            <Text style={[styles.title,{ color:focused?colors.bc: colors.textColor}]}>
                              {route.title}
                            </Text>
                          )}
                          {...props} style={{backgroundColor: 'white',borderTopRightRadius:10,borderTopLeftRadius:10}}/>}
                       />
                  </View>
                  <StatusBar/>
            </View>
          )
}
export default Supports;

  