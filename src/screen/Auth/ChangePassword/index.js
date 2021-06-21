import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../component/loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../../component/header';
import colors from '../../../component/colors';

const loginValidationSchema=yup.object().shape({
  oldPassword:yup.string().min(8,({min})=>`Old Password must be atleast ${min} charrecter`).
  required('Old Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  newPassword:yup.string().min(8,({min})=>`New Password must be atleast ${min} charrecter`).
  required('New Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword:yup.string().when("newPassword", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("newPassword")],
      "Both password need to be the same"
    )
  }).
  required('Confirm Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
})

const ChangePassword=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [visible,setVisible]=useState(true)
    const [visible1,setVisible1]=useState(true)
    const [visible2,setVisible2]=useState(true)

const showVisible=()=>{
    return(
      <TouchableOpacity 
          onPress={()=>visible?setVisible(false):setVisible(true)}>
          {!visible?<Image 
          style={{width:19,height:13}} 
          source={require('../../../assets/Images/eye.png')}/>:
          <Image style={{width:19,height:13}} 
          source={require('../../../assets/Images/eye1.png')}/>
        }
        </TouchableOpacity>
      )
    }    
const showVisible1=()=>{
      return(
        <TouchableOpacity 
            onPress={()=>visible1?setVisible1(false):setVisible1(true)}>
            {!visible1?<Image 
            style={{width:19,height:13}} 
            source={require('../../../assets/Images/eye.png')}/>:
            <Image style={{width:19,height:13}} 
            source={require('../../../assets/Images/eye1.png')}/>
          }
          </TouchableOpacity>
        )
      }    
const showVisible2=()=>{
        return(
          <TouchableOpacity 
              onPress={()=>visible2?setVisible2(false):setVisible2(true)}>
              {!visible2?<Image 
              style={{width:19,height:13}} 
              source={require('../../../assets/Images/eye.png')}/>:
              <Image style={{width:19,height:13}} 
              source={require('../../../assets/Images/eye1.png')}/>
            }
            </TouchableOpacity>
          )
        }    
const validateUser=()=>{
    if(oldPassword==''){
        Toast.show('Enter Old Password')
    }
    else if(newPassword==''){
        Toast.show('Enter New Password')
    }
    else if(confirmPassword!=newPassword){
        Toast.show('Enter Confirm Password')
    }
    else{
        dispatch({
          type: 'Change_Password_Request',
          url: '',
          oldPassword,
          newPassword,
          confirmPassword,
          navigation: navigation,
        })
      }
}
    return(
      <Formik
      initialValues={{ email: '',password:'' }}
      onSubmit={values => validateUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
         {isFetching?<Loader/>:null} 
         <Header
         title={'CHANGE PASSWORD'}
         source={require('../../../assets/Images/drawer.png')}
         onPress={()=>navigation.toggleDrawer()}
         />
          <ScrollView>
           <View style={styles.main}>
              <View style={styles.second}>
                <View style={styles.imageView}>
                {showVisible()}
                </View>
                <View style={styles.input}>
                <TextInput
                 style={styles.input1}
                 placeholder='Old Password'
                 onChangeText={handleChange('oldPassword')}
                 onBlur={handleBlur('oldPassword')}
                 value={values.oldPassword}
                 secureTextEntry={visible}
                 />
                </View>
              </View> 
              <View style={styles.error}>
              {(errors.oldPassword && touched.oldPassword) &&
                <Text style={styles.warn}>{errors.oldPassword}</Text>
                }
              </View>
              <View style={[styles.second,{marginTop:15}]}>
                <View style={styles.imageView}>
                {showVisible1()}
                </View>
                <View style={styles.input}>
                <TextInput
                 style={styles.input1}
                 placeholder='New Password'
                 onChangeText={handleChange('newPassword')}
                 onBlur={handleBlur('newPassword')}
                 value={values.newPassword}
                 secureTextEntry={visible1}
                 />
                </View>
              </View> 
              <View style={styles.error}>
              {(errors.newPassword && touched.newPassword) &&
                <Text style={styles.warn}>{errors.newPassword}</Text>
                }
              </View>
              <View style={[styles.second,{marginTop:15}]}>
                <View style={styles.imageView}>
                {showVisible2()}
                </View>
                <View style={styles.input}>
                <TextInput
                 style={styles.input1}
                 placeholder='Confirm Password'
                 onChangeText={handleChange('confirmPassword')}
                 onBlur={handleBlur('confirmPassword')}
                 value={values.confirmPassword}
                 secureTextEntry={visible2}
                 />
                </View>
              </View> 
              <View style={styles.error}>
              {(errors.confirmPassword && touched.confirmPassword) &&
                <Text style={styles.warn}>{errors.confirmPassword}</Text>
                }
              </View>
             <View style={styles.button}>
                 <CustomButton
                 title='UPDATE PASSWORD'
                 onPress={()=>errors.oldPassword ||
                   errors.newPassword ||
                   errors.confirmPassword ?Toast.show('All field required'):navigation.navigate('Login')}
                 />
             </View>
           </View>
         </ScrollView>
         <StatusBar/>
       </View>
         )}
         </Formik>
    )
}
export default ChangePassword;
