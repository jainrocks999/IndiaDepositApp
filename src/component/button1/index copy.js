// //import Npm dependancy
// import React, {useEffect, useState} from 'react';
// import {
//   ImageBackground,
//   Text,
//   TextInput,
//   View,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import styles from './style';
// import {useNavigation} from '@react-navigation/native';
// import CustomHeader from '../../../component/header1';

// import Toast from 'react-native-simple-toast';
// import {useDispatch, useSelector} from 'react-redux';
// import Loader from '../../../component/loader';
// import AsyncStorage from '@react-native-community/async-storage';
// import storage from '../../../component/storage';
// import TitleText from '../../../component/TitleText';
// import CustomButton from '../../../component/Button';
// import TextValue from '../../../component/StaticText';

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [userId, setUserId] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const dispatch = useDispatch();
//   const isFetching = useSelector((state) => state.isFetching);
//   const loadData = async () => {
//     const userId1 = await AsyncStorage.getItem(storage.UserId);
//     setUserId(userId1);
//     if (oldPassword == '') {
//       Toast.show('Please enter old password');
//     } else if (newPassword == '') {
//       Toast.show('Please enter new Password');
//     } else if (confirmPassword == '') {
//       Toast.show('Please Confirm Password');
//     } else {
//       dispatch({
//         type: 'User_Change_Password_Request',
//         url: 'v1/user/change_password?',
//         Old: oldPassword,
//         New: newPassword,
//         Id: userId1,
//       });
//     }
//   };
//   return (
//     <View style={styles.imageBackground}>
//       <CustomHeader />
//       {isFetching ? <Loader /> : null}
//       <ImageBackground
//         style={styles.imageBackground}
//         source={require('../../../assets/Images/AppBackground.jpg')}>
//         <ScrollView contentContainerStyle={styles.ScrollView}>
//           <View style={styles.heading}>
//             <TitleText title={TextValue.AccManagement.toUpperCase()} />
//           </View>
//           <View style={styles.settings}>
//             <Text style={styles.SignIn}>{TextValue.ChangePassword}</Text>
//             <View>
//               <TextInput
//                 style={styles.textInput}
//                 placeholder={TextValue.PlaceholderOldpwd}
//                 placeholderTextColor={colors.textGrey}
//                 // secureTextEntry={true}
//                 onChangeText={(text) => setOldPassword(text)}
//               />
//             </View>
//             <View>
//               <TextInput
//                 style={styles.textInput}
//                 placeholder={TextValue.PlaceholderNewpwd}
//                 placeholderTextColor={colors.textGrey}
//                 secureTextEntry={true}
//                 onChangeText={(text) => setNewPassword(text)}
//               />
//               <TextInput
//                 style={styles.textInput}
//                 placeholder={TextValue.PlaceholderConpwd}
//                 placeholderTextColor={colors.textGrey}
//                 secureTextEntry={true}
//                 onChangeText={(text) => setConfirmPassword(text)}
//               />
//             </View>

//             <CustomButton title={TextValue.BtnSEND} onPress={loadData} />
//           </View>
//         </ScrollView>
//       </ImageBackground>
//       <StatusBar backgroundColor={colors.darkOrange} barStyle="default" />
//     </View>
//   );
// };

// export default ChangePassword;
