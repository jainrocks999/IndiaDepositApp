import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import styles from './styles';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Loader from '../../../../component/loader';
import ImagePicker from 'react-native-image-crop-picker';

const Upload = ({route}) => {
  const [pan, setPan] = useState('');
  const [addressProof, setAddressProof] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  const [visible, setVisible] = useState(false);

  const [panType, setPanType] = useState('');
  const [addressProofType, setAddressProofType] = useState('');
  const [bankDetailsType, setBankDetailsType] = useState('');
  const [photoType, setPhotoType] = useState('');
  const [signatureType, setSignatureType] = useState('');

  const [panName, setPanName] = useState('');
  const [addressName, setAddressProofName] = useState('');
  const [bankDetailsName, setBankDetailsName] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [signatureName, setSignatureName] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const [user_name, set_user_name] = useState('');
  useEffect(async () => {
    const name = await AsyncStorage.getItem('secondary_user_name2');
    set_user_name(name);
  }, []);

  const uploadPan = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setPan(res[0].uri);
      setPanType(res[0].type);
      setPanName(res[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const uploadBankDetails = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setBankDetails(res[0].uri);
      setBankDetailsType(res[0].type);
      setBankDetailsName(res[0].name);
      console.log('this is user image', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const uploadAddressProof = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setAddressProof(res[0].uri);
      setAddressProofType(res[0].type);
      setAddressProofName(res[0].name);
      console.log('this is user image', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setPhoto(res[0].uri);
      setPhotoType(res[0].type);
      setPhotoName(res[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const uploadSignature = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setSignature(res[0].uri);
      setSignatureType(res[0].type);
      setSignatureName(res[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const CameraForAddress = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = image.path;
      setAddressProof(source);
      setAddressProofType(image.mime);
      setAddressProofName(
        image.path.substring(image.path.lastIndexOf('/') + 1),
      );
    });
  };
  const CameraForPan = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = image.path;
      setPan(source);
      setPanType(image.mime);
      setPanName(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const CameraForBank = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = image.path;
      setBankDetails(source);
      setBankDetailsType(image.mime);
      setBankDetailsName(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const CameraForPhoto = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = image.path;
      setPhoto(source);
      setPhotoType(image.mime);
      setPhotoName(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };
  const CameraForSignature = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = image.path;
      setSignature(source);
      setSignatureType(image.mime);
      setSignatureName(image.path.substring(image.path.lastIndexOf('/') + 1));
    });
  };

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    const fd_user_id2 = await AsyncStorage.getItem('fd_user_id2');
    try {
      setIsFetching(true);
      const data = new FormData();
      data.append('formtype', 'dcoument');
      data.append('deposit_option', '');
      data.append('amount', '');
      data.append('tenure', '');
      data.append('name', '');
      data.append('mobile_number', '');
      data.append('email', '');
      data.append('address_communication', '');
      data.append('address_permanent', '');
      data.append('qualifications', '');
      data.append('mother_name', '');
      data.append('father_name', '');
      data.append('marital_status', '');
      data.append('my_fixed_deposit_id', route.params.my_fixed_deposit_id);
      data.append('spouse_name', '');
      data.append('occupation', '');
      data.append('annual_income', '');
      data.append('fd_user_id', '');
      data.append('fd_joint_applicants_id', fd_user_id2);
      data.append('cheque_copy', {
        uri: bankDetails,
        name: bankDetailsName.substring(bankDetailsName.lastIndexOf('/') + 1),
        type: bankDetailsType,
      });

      data.append('address_proof', {
        uri: addressProof,
        name: addressName.substring(addressName.lastIndexOf('/') + 1),
        type: addressProofType,
      });
      data.append('pan_card', {
        uri: pan,
        name: panName.substring(panName.lastIndexOf('/') + 1),
        type: panType,
      });
      data.append('user_photo', {
        uri: photo,
        name: photoName.substring(photoName.lastIndexOf('/') + 1),
        type: photoType,
      });
      data.append('signature_copy', {
        uri: signature,
        name: signatureName.substring(signatureName.lastIndexOf('/') + 1),
        type: signatureType,
      });
      data.append('nominee_name', '');
      data.append('relationship', '');
      data.append('dob', '');
      data.append('nominee_address', '');
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/addmyfd',
      });
      if (response.data.status == 200) {
        AsyncStorage.setItem('fd_user_id', '');
        AsyncStorage.setItem('fd_user_id1', '');
        AsyncStorage.setItem('fd_user_id2', '');
        setIsFetching(false);
        navigation.navigate('Nominee', {
          my_fixed_deposit_id: route.params.my_fixed_deposit_id,
          amount: response.data.amount,
        });
      } else {
        isFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
      <Header
        source={require('../../../../assets/Image/arrow2.png')}
        title={'UPLOAD DOCUMENT'}
        onPress={() => navigation.goBack()}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView>
        {/* <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Montserrat-SemiBold'}}>
            {`Upload documents for ${user_name}`}
          </Text>
        </View> */}
         <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
            flexDirection:'row'
          }}>
             <Text style={{fontSize: 15, fontFamily: 'Montserrat-Regular'}}>
            {` Upload documents for`}
          </Text>
          <Text style={{fontSize: 15, fontFamily: 'Montserrat-SemiBold'}}>
            {` ${user_name}`}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.container}>
            {addressProof ? (
              addressProofType == 'image/jpeg'||'image/png' ? (
                <Image style={styles.image} source={{uri: addressProof}} />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 60, width: 44}}
                    source={require('../../../../assets/Image/pdf3.png')}
                  />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: colors.textColor,
                    }}>
                    {addressName}
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.row}>
                <Text style={styles.place}>Aadhar Card</Text>
                <Text style={styles.place}>Passport</Text>
                <Text style={styles.place}>{'Voter’s ID'}</Text>
                <Text style={styles.place}>{'Driving’s License'}</Text>
              </View>
            )}
          </View>
          {addressProof ? (
            <TouchableOpacity delayPressIn={0}
              onPress={() => setAddressProof('')}
              style={styles.button}>
              <Text style={styles.title}>REMOVE</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableOpacity delayPressIn={0}
                onPress={() => CameraForAddress()}
                style={styles.button}>
                <Text style={styles.title}>CAMERA</Text>
              </TouchableOpacity>

              <TouchableOpacity delayPressIn={0}
                onPress={() => uploadAddressProof()}
                style={styles.button}>
                <Text style={styles.title}>GALLERY</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.container}>
            {pan ? (
              panType == 'image/jpeg'||'image/png' ? (
                <Image style={styles.image} source={{uri: pan}} />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 60, width: 44}}
                    source={require('../../../../assets/Image/pdf3.png')}
                  />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: colors.textColor,
                    }}>
                    {panName}
                  </Text>
                </View>
              )
            ) : (
              <View>
                <Text style={styles.place}>{'Pan Card'}</Text>
              </View>
            )}
          </View>
          {pan ? (
            <TouchableOpacity onPress={() => setPan('')} style={styles.button}>
              <Text style={styles.title}>REMOVE</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableOpacity delayPressIn={0}
                onPress={() => CameraForPan()}
                style={styles.button}>
                <Text style={styles.title}>CAMERA</Text>
              </TouchableOpacity>

              <TouchableOpacity delayPressIn={0}
                onPress={() => uploadPan()}
                style={styles.button}>
                <Text style={styles.title}>GALLERY</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.container}>
            {bankDetails ? (
              bankDetailsType == 'image/jpeg'||'image/png' ? (
                <Image style={styles.image} source={{uri: bankDetails}} />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 60, width: 44}}
                    source={require('../../../../assets/Image/pdf3.png')}
                  />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: colors.textColor,
                    }}>
                    {bankDetailsName}
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.row}>
                <Text style={styles.place}>{'Cancelled cheque'}</Text>
                <Text style={styles.place}>{'Bank Pass Book'}</Text>
                <Text style={styles.place}>{'Bank statement copy'}</Text>
              </View>
            )}
          </View>
          {bankDetails ? (
            <TouchableOpacity delayPressIn={0}
              onPress={() => setBankDetails('')}
              style={styles.button}>
              <Text style={styles.title}>REMOVE</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableOpacity delayPressIn={0}
                onPress={() => CameraForBank()}
                style={styles.button}>
                <Text style={styles.title}>CAMERA</Text>
              </TouchableOpacity>

              <TouchableOpacity delayPressIn={0}
                onPress={() => uploadBankDetails()}
                style={styles.button}>
                <Text style={styles.title}>GALLERY</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.container}>
            {photo ? (
              photoType == 'image/jpeg'||'image/png' ? (
                <Image style={styles.image} source={{uri: photo}} />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 60, width: 44}}
                    source={require('../../../../assets/Image/pdf3.png')}
                  />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: colors.textColor,
                    }}>
                    {photoName}
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.row}>
                <Text style={styles.place}>{'Photo'}</Text>
              </View>
            )}
          </View>
          {photo ? (
            <TouchableOpacity delayPressIn={0}
              onPress={() => setPhoto('')}
              style={styles.button}>
              <Text style={styles.title}>REMOVE</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableOpacity delayPressIn={0}
                onPress={() => CameraForPhoto()}
                style={styles.button}>
                <Text style={styles.title}>CAMERA</Text>
              </TouchableOpacity>

              <TouchableOpacity delayPressIn={0}
                onPress={() => uploadPhoto()}
                style={styles.button}>
                <Text style={styles.title}>GALLERY</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.container}>
            {signature ? (
              signatureType == 'image/jpeg'||'image/png' ? (
                <Image style={styles.image} source={{uri: signature}} />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 60, width: 44}}
                    source={require('../../../../assets/Image/pdf3.png')}
                  />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: colors.textColor,
                    }}>
                    {signatureName}
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.row}>
                <Text style={styles.place}>{'Signature Copy'}</Text>
              </View>
            )}
          </View>
          {signature ? (
            <TouchableOpacity delayPressIn={0}
              onPress={() => setSignature('')}
              style={styles.button}>
              <Text style={styles.title}>REMOVE</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableOpacity delayPressIn={0}
                onPress={() => CameraForSignature()}
                style={styles.button}>
                <Text style={styles.title}>CAMERA</Text>
              </TouchableOpacity>

              <TouchableOpacity delayPressIn={0}
                onPress={() => uploadSignature()}
                style={styles.button}>
                <Text style={styles.title}>GALLERY</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{marginBottom: 80}}></View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
        delayPressIn={0}
          disabled={
            pan && addressProof && photo && bankDetails && signature
              ? false
              : true
          }
          onPress={() => validateUser()}
          style={[
            styles.button1,
            {
              backgroundColor:
                pan && addressProof && photo && bankDetails && signature
                  ? colors.bc
                  : 'grey',
            },
          ]}>
          <Text style={{color: colors.white}}>{'SUBMIT'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Upload;
