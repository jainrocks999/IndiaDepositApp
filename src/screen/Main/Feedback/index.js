import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, BackHandler, Platform,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Stars from 'react-native-stars';
import CustomButton from '../../../component/button1';
import {TextInput} from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import Loader from '../../../component/loader';
import {useDispatch, useSelector} from 'react-redux';
import BottomTab from '../../../component/StoreButtomTab';

const Contact = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [rating1, setRatting1] = useState(0);
  const [rating2, setRatting2] = useState(0);
  const [rating3, setRatting3] = useState(0);
  const [rating4, setRatting4] = useState(0);
  const [rating5, setRatting5] = useState(0);
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg3, setMsg3] = useState('');
  const [msg4, setMsg4] = useState('');
  const [msg5, setMsg5] = useState('');

  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      navigation.navigate('Main');
      return true;
    }
  };

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    // if(value==''){
    //  Toast.show('Please select type')
    // }else if(value1==''){
    // Toast.show('Please select type')
    // }
    // else if(message==''){
    //     Toast.show('Please enter message')
    // }
    // else{
    dispatch({
      type: 'Feedback_Request',
      url: 'feedback',
      user_id,
      message: message,
      information_rating: rating1,
      information_msg_rating: msg1,
      navigation_rating: rating2,
      navigation_msg_rating: msg2,
      product_rating: rating3,
      product_msg_rating: msg3,
      onboarding_rating: rating4,
      onboarding_msg_rating: msg4,
      service_rating: rating5,
      service_msg_rating: msg5,
      navigation: navigation,
    });
    // }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'FEEDBACK'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.navigate('Main')}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView>
        <KeyboardAwareScrollView
          extraScrollHeight={0}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.view1}>
            <View style={styles.main}>
              <Text style={[styles.how, {marginTop: 15}]}>
                {/* How would you rate your experience with India Deposit app? */}
                Rate your experience with IndiaDeposit
              </Text>
              <View style={styles.same}>
                <View style={styles.font} />
                <Text style={[styles.how, {marginLeft: 7}]}>Information :</Text>
              </View>
              <View style={styles.star}>
                <Stars
                  half={false}
                  default={0}
                  update={val => setRatting1(val)}
                  spacing={10}
                  starSize={35}
                  count={5}
                  emptyStar={require('../../../assets/Image/icon-star-blank.png')}
                  fullStar={require('../../../assets/Image/icon-star.png')}
                />
              </View>
              {rating1 != '' && rating1 < 3 ? (
                <View style={[styles.bordrView,styles.inputs]}>
                  <TextInput
                    style={{
                       color: colors.textColor,
                      }}
                    onChangeText={val => setMsg1(val)}
                    placeholder="Any suggestion/feedback"
                    multiline
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={styles.same}>
                <View style={styles.font} />
                <Text style={[styles.how, {marginLeft: 7}]}>Navigation :</Text>
              </View>
              <View style={styles.star}>
                <Stars
                  half={false}
                  default={0}
                  update={val => setRatting2(val)}
                  spacing={10}
                  starSize={35}
                  count={5}
                  emptyStar={require('../../../assets/Image/star-blank.png')}
                  fullStar={require('../../../assets/Image/star.png')}
                />
              </View>
              {rating2 != '' && rating2 < 3 ? (
                <View style={[styles.bordrView,styles.inputs]}>
                  <TextInput
                    style={{
                      color: colors.textColor, 
                    }}
                    onChangeText={val => setMsg2(val)}
                    placeholder="Any suggestion/feedback"
                    multiline
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={styles.same}>
                <View style={styles.font} />
                <Text style={[styles.how, {marginLeft: 7}]}>Products :</Text>
              </View>
              <View style={styles.star}>
                <Stars
                  half={false}
                  default={0}
                  update={val => setRatting3(val)}
                  spacing={10}
                  starSize={35}
                  count={5}
                  emptyStar={require('../../../assets/Image/star-blank.png')}
                  fullStar={require('../../../assets/Image/star.png')}
                />
              </View>
              {rating3 != '' && rating3 < 3 ? (
                <View style={[styles.bordrView,styles.inputs]}>
                  <TextInput
                    style={{
                       color: colors.textColor,
                      }}
                    onChangeText={val => setMsg3(val)}
                    placeholder="Any suggestion/feedback"
                    multiline
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={styles.same}>
                <View style={styles.font} />
                <Text style={[styles.how, {marginLeft: 7}]}>Onboarding :</Text>
              </View>
              <View style={styles.star}>
                <Stars
                  half={false}
                  default={0}
                  update={val => setRatting4(val)}
                  spacing={10}
                  starSize={35}
                  count={5}
                  emptyStar={require('../../../assets/Image/star-blank.png')}
                  fullStar={require('../../../assets/Image/star.png')}
                />
              </View>
              {rating4 != '' && rating4 < 3 ? (
                <View style={[styles.bordrView,styles.inputs]}>
                  <TextInput
                    style={{color: colors.textColor, 
                    }}
                    onChangeText={val => setMsg4(val)}
                    placeholder="Any suggestion/feedback"
                    multiline
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={styles.same}>
                <View style={styles.font} />
                <Text style={[styles.how, {marginLeft: 7}]}>Service :</Text>
              </View>
              <View style={styles.star}>
                <Stars
                  half={false}
                  default={0}
                  update={val => setRatting5(val)}
                  spacing={10}
                  starSize={35}
                  count={5}
                  emptyStar={require('../../../assets/Image/star-blank.png')}
                  fullStar={require('../../../assets/Image/star.png')}
                />
              </View>
              {rating5 != '' && rating5 < 3 ? (
                <View style={[styles.bordrView,styles.inputs]}>
                  <TextInput
                    style={{color: colors.textColor, 
                    }}
                    onChangeText={val => setMsg5(val)}
                    placeholder="Any suggestion/feedback"
                    multiline
                  />
                </View>
              ) : (
                <View />
              )}
              <Text style={styles.better}>
                Help us become better
              </Text>
              <View style={styles.view2}>
                <View style={styles.inputs}>
                  <TextInput
                    onChangeText={val => setMessage(val)}
                    multiline={true}
                    style={{
                      color: colors.textColor,
                      height: '100%',
                      width: '100%',
                    }}
                    placeholderTextColor={colors.heading1}
                  />
                </View>
                <View style={styles.bottomView}>
                <TouchableOpacity
                  delayPressIn={0}
                  disabled={
                    rating1 && rating2 && rating3 && rating4 && rating5
                      ? false
                      : true
                  }
                  onPress={() => validateUser()}
                  style={[
                    styles.button1,
                    {
                      backgroundColor:
                        rating1 && rating2 && rating3 && rating4 && rating5
                          ? colors.bc
                          : 'grey',
                    },
                  ]}>
                  <Text style={{color: colors.white}}>{'CONTINUE'}</Text>
                </TouchableOpacity>
                  {/* <CustomButton onPress={() => validateUser()} title="SUBMIT" /> */}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View>
        <BottomTab/>
      </View>
      <StatusBar />
    </View>
  );
};
export default Contact;
