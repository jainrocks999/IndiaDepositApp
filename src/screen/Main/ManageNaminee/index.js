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
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[789]\d{9}$/,"Please Enter valid Mobile Number"),
  dob:yup.string().required('Date of Birth is required'),
  address:yup.string().required('Address is required'),
  relation:yup.string().required('Relationship with Depositor is required'),
})
const RegisterPage=()=>{
    const navigation=useNavigation()
    const [visible,setVisible]=useState(false)
    return(
        <Formik
             initialValues={{ name: '',mobile:'',dob:'',address:'',relation:''}}
             onSubmit={values => console.log(values)}
             validateOnMount={true}
             validationSchema={loginValidationSchema}>
            {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
            <View style={styles.container}>
                 <Header
                    source={require('../../../assets/Images/arrow.png')}
                    title='MANAGE NOMINEE'
                   onPress={()=>navigation.goBack()}
                 />
                 <ScrollView>
                     {/* <Dialog
                       dialogStyle={{width:'95%',height:248}}
                       visible={visible}
                       onTouchOutside={() => {
                       setVisible(false)
                       }}
                       >
                       <DialogContent>
                       <View style={styles.modalView}>
                       <View style={{width:'112%',height:40,backgroundColor:colors.bc,
                        flexDirection:'row',alignItems:'center',justifyContent:'space-between',
                        paddingHorizontal:20
                        }}>
                       <View></View>
                       <Text style={{color:colors.white}}>Get the latest version</Text>
                       <View style={{width:20,height:20,borderRadius:10,borderColor:colors.white,borderWidth:1,
                        alignItems:'center',justifyContent:'center'
                       }}>
                       <Text style={{color:colors.white,marginTop:-5}}>x</Text>
                       </View>
                       </View>
                      <View style={{paddingVertical:20,width:'100%'}}>
                         <Text>
                          You are using an old version of the app. Enjoy our
                          latest update where we have fixed some bugs,
                          introduced some new service and improved our
                          app to provide a seamless banking experience. It
                          will take only a few moments.
                         </Text>
                       <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity style={{width:'48%',height:40,backgroundColor:colors.bc,borderRadius:30}}></TouchableOpacity>
                        <TouchableOpacity ></TouchableOpacity>
                       </View>
                      </View>
                     </View>
                      </DialogContent>
                     </Dialog> */}
                      <View style={styles.main}>
                            <View style={styles.con}>
                                  <View style={styles.row}>
                                       <TouchableOpacity
                                          onPress={()=>setVisible(true)}
                                          style={styles.button1}>
                                          <Text style={styles.buttonText}>Add Nominee</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity style={styles.button1}>
                                         <Text style={styles.buttonText}>Delete Nominee</Text>
                                       </TouchableOpacity>
                                  </View>
                                  <View style={[styles.view1,{marginTop:16}]}>
                                       <TextInput 
                                         style={styles.input}
                                         placeholder='Nominee Name'
                                         onChangeText={handleChange('name')}
                                         onBlur={handleBlur('name')}
                                         value={values.name}
                                         maxLength={40}
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
                                             placeholder='Mobile Number'
                                             onChangeText={handleChange('mobile')}
                                             onBlur={handleBlur('mobile')}
                                             value={values.mobile}
                                             keyboardType={'number-pad'}
                                             maxLength={11}
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
                                            placeholder="Date Of Birth"
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
                                             onChangeText={handleChange('address')}
                                             onBlur={handleBlur('address')}
                                             value={values.address}
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
                                         placeholder='Relationship with Depositor'
                                         onChangeText={handleChange('relation')}
                                         onBlur={handleBlur('relation')}
                                         value={values.relation}
                                         maxLength={40}
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
