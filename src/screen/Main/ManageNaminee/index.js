import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import CustomButton from '../../../component/button1';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


const loginValidationSchema=yup.object().shape({
  name:yup.string().required('Name is required'),
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[789]\d{9}$/,"Please enter valid mobile number"),
  dob:yup.string().required('Date of Birth is required'),
  address:yup.string().required('Address is required'),
  relation:yup.string().required('Relationship with depositor is required'),
})
const RegisterPage=()=>{
    const navigation=useNavigation()
    const [visible,setVisible]=useState(false)
    return(
        <Formik
             initialValues={{ name: '',mobile:'',dob:'',address:'',relation:''}}
             validateOnMount={true}
             validationSchema={loginValidationSchema}>
            {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
            <View style={styles.container}>
                 <Header
                    source={require('../../../assets/Image/arrow2.png')}
                    title='MANAGE NOMINEE'
                   onPress={()=>navigation.goBack()}
                 />
                 <ScrollView>
                  
                      <View style={styles.main}>
                            <View style={styles.con}>
                                  <View style={styles.row}>
                                       <TouchableOpacity
                                         delayPressIn={0}
                                          onPress={()=>setVisible(true)}
                                          style={styles.button1}>
                                          <Text style={styles.buttonText}>Add Nominee</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity delayPressIn={0} style={styles.button1}>
                                         <Text style={styles.buttonText}>Delete Nominee</Text>
                                       </TouchableOpacity>
                                  </View>
                                  <View style={[styles.view1,{marginTop:16}]}>
                                       <TextInput 
                                         style={styles.input}
                                         placeholder='Nominee name'
                                         placeholderTextColor={colors.heading1}
                                         onChangeText={handleChange('name')}
                                         onBlur={handleBlur('name')}
                                         value={values.name}
                                         maxLength={40}
                                         returnKeyType='done'
                                       />
                                  </View>
                                  <View style={styles.error}>
                                      {(errors.name && touched.name) &&
                                      <Text style={styles.warn}>{errors.name}</Text>
                                      }
                                  </View>
                                  <View style={[styles.view1,{marginTop:10}]}>
                                       <TextInput 
                                             style={styles.input}
                                             placeholder='Mobile number'
                                             placeholderTextColor={colors.heading1}
                                             onChangeText={handleChange('mobile')}
                                             onBlur={handleBlur('mobile')}
                                             value={values.mobile}
                                             keyboardType={'number-pad'}
                                             maxLength={11}
                                             returnKeyType='done'
                                        />
                                  </View>
                                  <View style={styles.error}>
                                      {(errors.mobile && touched.mobile) &&
                                       <Text style={styles.warn}>{errors.mobile}</Text>
                                      }
                                 </View>
                                <View style={[styles.view1,{marginTop:10}]}>
                                      <DatePicker
                                            date={values.dob}
                                            mode="date"
                                            placeholder="Date of birth"
                                            format="DD-MM-YYYY"
                                            maxDate={new Date}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                            placeholderText:{marginLeft:12,color:colors.textColor},
                                            dateIcon: {
                                            width:0,
                                            height:0
                                            },
                                            dateInput: {
                                            marginLeft:-55,
                                            borderWidth:0,
                                            },
                                            dateText:{
                                            color:colors.textColor
                                            }
                                            }}
                                            onDateChange={handleChange('dob')}
                                     />
                                </View>
                                 <View style={styles.error}>
                                       {(errors.dob && touched.dob) &&
                                         <Text style={styles.warn}>{errors.dob}</Text>
                                        }
                                 </View>
                                  <View style={[styles.view1,{marginTop:10}]}>
                                        <TextInput 
                                             style={styles.input}
                                             placeholder='Address'
                                             placeholderTextColor={colors.heading1}
                                             onChangeText={handleChange('address')}
                                             onBlur={handleBlur('address')}
                                             value={values.address}
                                             returnKeyType='done'
                                        />
                                 </View>
                                 <View style={styles.error}>
                                  {(errors.address && touched.address) &&
                                    <Text style={styles.warn}>{errors.address}</Text>
                                  }
                                 </View>
                                 <View style={[styles.view1,{marginTop:10}]}>
                                    <TextInput 
                                         style={styles.input}
                                         placeholder='Relationship with depositor'
                                         placeholderTextColor={colors.heading1}
                                         onChangeText={handleChange('relation')}
                                         onBlur={handleBlur('relation')}
                                         value={values.relation}
                                         maxLength={40}
                                         returnKeyType='done'
                                    />
                                  </View>
                                 <View style={styles.error}>
                                    {(errors.relation && touched.relation) &&
                                      <Text style={styles.warn}>{errors.relation}</Text>
                                    }
                                 </View>
                              </View>
                              <View style={styles.button}>
                                   <CustomButton
                                      onPress={()=>handleSubmit()}
                                      title='UPDATE  NOMINEE'
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
export default RegisterPage;
