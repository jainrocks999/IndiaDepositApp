import React,{useEffect} from 'react';
import {View, Text,Image,BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../../component/header';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import styles from './styles';
import CustomButton from '../../../../component/button1';
import Constants from '../../../../component/Constants';
import BottomTab from '../../../../component/StoreButtomTab';

const MyFDDetail = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.MYFDetail);
   console.log('this is lokin period from my f detail page',selector);
  const date = selector[0].create_date;

  const [dd1, mm1, yyyy1] = selector[0].create_date.split('/');
  var msDiff =
    new Date().getTime() - new Date(`${yyyy1}-${mm1}-${dd1}`).getTime();
  const days = (msDiff / (1000 * 60 * 60 * 24)).toFixed(0);
  const years = days / 365;
  const value = (
    selector[0].amount *
    Math.pow(1 + selector[0].interest_rate / (1 * 100), 1 * years)
  ).toFixed(2);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick=() =>{
    if(navigation.isFocused()){
      navigation.navigate('MyFD')
    return true;
    }
  }

  const fd_status = item => {
    if (item.fd_status == 2) {
      return (
        <View>
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item.doc_verification_status == 1 ? (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/rightIcon.png')}
                />
              ) : (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/greyRight.png')}
                />
              )}
              <Text style={[styles.status, {marginLeft: 10}]}>
                Document verified
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              {item.payment_status == 2 && item.document_status == 1 ? (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/rightIcon.png')}
                />
              ) : (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/greyRight.png')}
                />
              )}
              <Text style={[styles.status, {marginLeft: 10}]}>
                Fund Transfer initiated
              </Text>
            </View>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            {item.redeem_status == 2 ? (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/Image/rightIcon.png')}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/Image/greyRight.png')}
              />
            )}
            <Text style={[styles.status, {marginLeft: 10}]}>Redeemed</Text>
          </View>
        </View>
      );
    } else if (item.fd_status == 3) {
      return (
        <View>
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item.document_status == 1 ? (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/rightIcon.png')}
                />
              ) : (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/greyRight.png')}
                />
              )}
              <Text style={[styles.status, {marginLeft: 10}]}>
                Document verified
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              {item.payment_status == 2 ? (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/rightIcon.png')}
                />
              ) : (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/Image/greyRight.png')}
                />
              )}
              <Text style={[styles.status, {marginLeft: 10}]}>
                Payment verified
              </Text>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            {item.payment_status == 2 && item.document_status == 1 ? (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/Image/rightIcon.png')}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/Image/greyRight.png')}
              />
            )}
            <Text style={[styles.status, {marginLeft: 10}]}>
              Generation in process
            </Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={'MY FD Detail'}
        source={require('../../../../assets/Image/arrow2.png')}
        onPress={() => navigation.navigate('MyFD')}
      />
      <View style={styles.list}>
        <Image
          resizeMode="contain"
          style={{height: 20, width: 80}}
          source={{
            uri: `${Constants.imageUrl}${selector[0].bank_logo1}`,
          }}
        />
      </View>

      <ScrollView>
        <View style={styles.view4}>
          <View style={styles.container1}>
            <View style={[styles.view2]}>
              <Text style={[styles.item1, {textAlign: 'center'}]}>
                {selector[0].my_fixed_deposit_id}
              </Text>
              <Text style={styles.item}>{'FD Name/ID'}</Text>
            </View>
            <View style={[styles.view2]}>
              <Text style={styles.item1}>{selector[0].type}</Text>
              <Text style={styles.item}>{'FD Type'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.view4}>
          <View style={styles.container1}>
            <View style={styles.view2}>
              <Text style={[styles.item1, {textAlign: 'center'}]}>
                {selector[0].amount}
              </Text>
              <Text style={styles.item}>{'FD Open Amount'}</Text>
            </View>
            <View style={[styles.view2]}>
              <Text style={styles.item1}>{selector[0].create_date}</Text>
              <Text style={styles.item}>{'FD Created Date'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.view4}>
          <View style={styles.container1}>
            <View style={[styles.view2]}>
              <Text style={styles.item1}>{`${selector[0].tenure} Years`}</Text>
              <Text style={styles.item}>{'Tenure'}</Text>
            </View>
            <View style={styles.view2}>
              <Text
                style={[
                  styles.item1,
                  {textAlign: 'center'},
                ]}>{`${selector[0].interest_rate}%`}</Text>
              <Text style={styles.item}>{'Interest Rate'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.view4}>
          {selector[0].fd_status == 2 ? (
            <View style={styles.container1}>
              <View style={styles.view2}>
                <Text style={[styles.item1, {textAlign: 'center'}]}>
                  {selector[0].redeemed_amount}
                </Text>
                <Text style={styles.item}>{'Redeemed Amount'}</Text>
              </View>
              <View style={[styles.view2]}>
                <Text style={styles.item1}>{selector[0].redemption_date}</Text>
                <Text style={styles.item}>{'Redeemed Date'}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.container1}>
              <View style={styles.view2}>
                <Text style={[styles.item1, {textAlign: 'center'}]}>
                  {selector[0].maturity_amount}
                </Text>
                <Text style={styles.item}>{'Maturity Amount'}</Text>
              </View>
              <View style={[styles.view2]}>
                <Text style={styles.item1}>{selector[0].date_of_maturity}</Text>
                <Text style={styles.item}>{'Maturity Date'}</Text>
              </View>
            </View>
          )}
        </View>
       
        <View style={[styles.view4, {marginTop: 10, marginBottom: 10}]}>
          <View style={[styles.container1]}>
            <View style={styles.view2}>
              <Text
                style={[
                  styles.item1,
                  {textAlign: 'center'},
                ]}>{`${selector[0].username}`}</Text>
              <Text style={styles.item}>{'Name'}</Text>
            </View>
            <View style={styles.view2}>
              <Text style={[styles.item1, {textAlign: 'center'}]}>
                {selector[0].user_dob}ß
              </Text>
              <Text style={styles.item}>{'Date of Birth'}</Text>
            </View>
          </View>
        </View>

      <View style={[styles.view4, {marginTop: 0, marginBottom: 10}]}>
          <View style={{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:13,
        paddingHorizontal:12
    }}>
            <View style={styles.view2}>
              <Text
                style={[
                  styles.item1,
                  {textAlign: 'center'},
                ]}>{`${selector[0].lockin_period==null?'':selector[0].lockin_period} days`}</Text>
              <Text style={styles.item}>{'Lockin Period'}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      {selector[0].fd_status == 1 ? (
        <View
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            backgroundColor: '#fff',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <CustomButton 
            title="REDEEM"
            onPress={() =>
              navigation.navigate('BankDetailScrn',
               {
                data: selector[0],
                name: selector[0].username,
                my_fixed_deposit_id: selector[0].my_fixed_deposit_id,
              }
              )
            }
           
          />
        </View>
      ) : (
        <View />
      )}
      {selector[0].fd_status == 2 || selector[0].fd_status == 3 ? (
        <View style={[styles.view4, {marginTop: 0, marginBottom: 10}]}>
          <View style={[styles.container1]}>{fd_status(selector[0])}</View>
        </View>
      ) : (
        <View />
      )}

       {/* <View>
        <BottomTab/>
      </View> */}
    </View>
  );
};
export default MyFDDetail;
