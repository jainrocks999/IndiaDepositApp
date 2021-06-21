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
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../../component/colors';
import Header from '../../../component/compareHeader';
//import * as ImagePicker from "react-native-image-picker"
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';

const loginValidationSchema=yup.object().shape({
  name:yup.string().required('Name is required'),
  surName:yup.string().required('Surname is required'),
  fatherName:yup.string().required('Father name is required'),
  motherName:yup.string().required('Mother name is required'),
  spouseName:yup.string().required('Spouse name is required'),
  panNumber:yup.string().min(10,({min})=>`Pan number must be atleast ${min} number`).required('Pan number is required'),
  email:yup.string().email('Please enter valid email').required('Email address is required'),
  mobile:yup.string().min(10).required('Mobile number is required').matches(/^[0]?[789]\d{9}$/,"Please Enter valid Mobile Number"),
  gender:yup.string().required('Gender is required is required'),
  dob:yup.string().min(4).required('Date of Birth is required'),
  adharNumber:yup.string().min(12,({min})=>`Aadhar number must be atleast ${min} number`).required('Aadhar number is required'),
  income:yup.string().required('Income Per Annum is required'),
  residential:yup.string().required('Residential status is required'),
})

const data1=[
{ label: 'Others', value: 'Others'},
{ label: 'Male', value: 'Male' },
{ label: 'Female', value: 'Female' },
]

const RegisterPage=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [date,setDate]=useState('')
    const [photos, setphotos] = useState('');
    const [visible,setVisible]=useState(false)
    const [data,setData]=useState('')

useEffect(async()=>{
//  const photo= await AsyncStorage.getItem(Storage.photo)
//  setData(photo)
},[])
const openCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
      let source = { uri: image.path };
      AsyncStorage.setItem(Storage.photo,JSON.stringify(source))
      setphotos(source)
      console.log(image)
      });
    setVisible(false)
  };

const openGallery = () => {
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    let source = { uri: images[0].path };
   setphotos(source)
   console.log(source)
  });
  setVisible(false)
};
const renderImage=()=>{
  // if(data==''){
  return(
    <View style={styles.textView}>
    {/* {uri:photos.uri} */}
       {photos?<Image style={{width:'100%',height:'100%',borderRadius:57}} source={photos}/>
       : <Image style={{marginTop:-4,width:'100%',height:'100%'}} source={require('../../../assets/Images/pfile.png')}/>}
     
       <View style={styles.profile}>
    <TouchableOpacity onPress={()=>setVisible(true)} style={styles.icon}>
        <Image source={require('../../../assets/Images/camera.png')}/>
    </TouchableOpacity>
    </View>
    </View>
  )
 // }
  // else{
  //   return(
  //     <View style={styles.textView}>
  //     {/* {uri:photos.uri} */}
  //        {data?<Image style={{width:'100%',height:'100%',borderRadius:57}} source={data}/>
  //        : <Image style={{marginTop:-4,width:'100%',height:'100%'}} source={require('../../../assets/Images/pfile.png')}/>}
       
  //        <View style={styles.profile}>
  //     <TouchableOpacity onPress={()=>setVisible(true)} style={styles.icon}>
  //         <Image source={require('../../../assets/Images/camera.png')}/>
  //     </TouchableOpacity>
  //     </View>
  //     </View>
  //   )
  // }
}

    return(
      <Formik
      initialValues={{ name: '',email:'',mobile:'',dob:'',gender:'',panNumber:'',
      surName:'',fatherName:'',motherName:'',spouseName:'',adharNumber:'',income:'',residential:'' }}
      onSubmit={values => console.log(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}
    >
      
      {({ handleChange, handleBlur, handleSubmit, values,touched,isValid,errors }) => (
        <View style={styles.container}>
        
         <Header
         source={require('../../../assets/Images/drawer.png')}
         title='EDIT PROFILE'
         titleTwo={`MANAGE \nNOMINEE`}
         onPress1={()=>navigation.navigate('Manage')}
         onPress={()=>navigation.toggleDrawer()}
         />
          <ScrollView>
         
          <Dialog
           dialogStyle={{width:200,height:150}}
          visible={visible}
          onTouchOutside={() => {
           setVisible(false)
          }}
        >
          <DialogContent >
          <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>openCamera()} style={styles.buton}>
            <Text style={styles.came}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openGallery()} style={styles.buton}>
            <Text style={styles.came}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
          </DialogContent>
        </Dialog>
       
            <View style={styles.row}>
             {renderImage()}
           </View>
          
           <View style={styles.main}>
             <Text style={styles.per}>PERSONAL DETAILS</Text>
            <View style={styles.con}>
            <View style={styles.view1}>
              <TextInput 
              style={styles.input1}
              placeholder='Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.name && touched.name) &&
                <Text style={styles.warn}>{errors.name}</Text>
                }
            </View>
            {/* ////////////// */}
             
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Surname'
              onChangeText={handleChange('surName')}
              onBlur={handleBlur('surName')}
              value={values.surName}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.surName && touched.surName) &&
                <Text style={styles.warn}>{errors.surName}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Father’s Name'
              onChangeText={handleChange('fatherName')}
              onBlur={handleBlur('fatherName')}
              value={values.fatherName}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.fatherName && touched.fatherName) &&
                <Text style={styles.warn}>{errors.fatherName}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Mother’s Name'
              onChangeText={handleChange('motherName')}
              onBlur={handleBlur('motherName')}
              value={values.motherName}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.motherName && touched.motherName) &&
                <Text style={styles.warn}>{errors.motherName}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Spouse Name'
              onChangeText={handleChange('spouseName')}
              onBlur={handleBlur('spouseName')}
              value={values.spouseName}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/profile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.spouseName && touched.spouseName) &&
                <Text style={styles.warn}>{errors.spouseName}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
               style={styles.input1}
              placeholder='Email id'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              maxLength={40}
              />
              <Image source={require('../../../assets/Images/message.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.email && touched.email) &&
                <Text style={styles.warn}>{errors.email}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
             style={styles.input1}
              placeholder='Mobile No'
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType={'number-pad'}
              maxLength={11}
              />
              <Image source={require('../../../assets/Images/mobile.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.mobile && touched.mobile) &&
                <Text style={styles.warn}>{errors.mobile}</Text>
                }
              </View>
              <View style={[styles.drop,{marginTop:10}]}>
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
                   // width:300 
                },
                dateText:{
                  color:colors.textColor
                }
                }}
                
                onDateChange={handleChange('dob')}
            />
             <Image source={require('../../../assets/Images/calender.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.dob && touched.dob) &&
                <Text style={styles.warn}>{errors.dob}</Text>
                }
              </View>
            <View style={[styles.drop,{marginTop:10}]}>
            <RNPickerSelect
            onValueChange={handleChange('gender')}
            onOpen={handleBlur('gender')}
            items={data1}
            style={{  inputAndroid: { color:colors.textColor,width:250},placeholder:{color:colors.textColor} }}
            value={values.gender}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Gender", value: '' }}
            // Icon={()=>
            //   <Image style={{margin:12}} 
            //   source={require('../../../assets/Images/down.png')}/>}
            />
           <Image source={require('../../../assets/Images/gender.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.gender && touched.gender) &&
                <Text style={styles.warn}>{errors.gender}</Text>
                }
              </View>
            <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
               style={styles.input1}
              placeholder='Pan Number'
              onChangeText={handleChange('panNumber')}
              onBlur={handleBlur('panNumber')}
              value={values.confirm}
              maxLength={10}
              />

              <Image source={require('../../../assets/Images/pan.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.panNumber && touched.panNumber) &&
                <Text style={styles.warn}>{errors.panNumber}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
              style={styles.input1}
              placeholder='Adhar Number'
              onChangeText={handleChange('adharNumber')}
              onBlur={handleBlur('adharNumber')}
              value={values.adharNumber}
              maxLength={16}
              keyboardType='number-pad'
              />
              <Image source={require('../../../assets/Images/pan.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.adharNumber && touched.adharNumber) &&
                <Text style={styles.warn}>{errors.adharNumber}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
               style={styles.input1}
              placeholder='Income per Annum'
              onChangeText={handleChange('income')}
              onBlur={handleBlur('income')}
              value={values.income}
              maxLength={30}
              />
              <Image source={require('../../../assets/Images/income.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.income && touched.income) &&
                <Text style={styles.warn}>{errors.income}</Text>
                }
              </View>
              <View style={[styles.view1,{marginTop:10}]}>
              <TextInput 
               style={styles.input1}
              placeholder='Residential Status'
              onChangeText={handleChange('residential')}
              onBlur={handleBlur('residential')}
              value={values.residential}
              />
              <Image source={require('../../../assets/Images/home.png')}/>
            </View>
            <View style={styles.error}>
              {(errors.residential && touched.residential) &&
                <Text style={styles.warn}>{errors.residential}</Text>
                }
              </View>
            </View>
             <View style={styles.button}>
                 <CustomButton
                   onPress={()=>handleSubmit()}
                 title='UPDATE PROFILE'
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
