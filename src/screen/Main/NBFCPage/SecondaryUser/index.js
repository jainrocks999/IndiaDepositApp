import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {useSelector, connect} from 'react-redux';
import styles from './styles';
import Header from '../../../../component/compareHeader';
import colors from '../../../../component/colors';
import {CheckBox} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../../component/button1';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import Storage from '../../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
let value = '';
class SecondaryUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      data: '',
      ids1: [],
      data1: '',
      primaryData: this.props.route.params.data,
      my_fixed_deposit_id: this.props.route.params.my_fixed_deposit_id,
      showModal1: false,
      name: '',
      email: '',
      mobile: '',
      gender: '',
      dob: '',
      relation: '',
      date: new Date(),
      open: false,
    };
  }
  // isChecked = itemId => {
  //   const isThere = this.state.ids.includes(itemId);
  //   return isThere;
  // };

  // isChecked1 = itemId => {
  //   const isThere = this.state.ids.includes(itemId);
  //   return isThere;
  // };

  // toggleChecked = (itemId, item) => {
  //   const ids = [...this.state.ids, itemId];
  //   const data = [...this.state.data, item];
  //   if (this.isChecked(itemId)) {
  //     this.setState({
  //       ...this.state,
  //       ids: this.state.ids.filter(id => id !== itemId),
  //     });
  //     this.setState({
  //       data: this.state.data.filter(id => id.user_id !== itemId),
  //     });
  //   } else {
  //     if (this.state.data.length > 1) {
  //       Toast.show('Only two user can select');
  //     } else {
  //       this.setState({
  //         ...this.state,
  //         ids,
  //       });
  //       this.setState({data: [...this.state.data, item]});
  //     }
  //   }
  // };

  // toggleChecked1 = (itemId, item) => {
  //   const ids = [...this.state.ids, itemId];
  //   const data = [...this.state.data, item];
  //   if (this.isChecked(itemId)) {
  //     this.setState({
  //       ...this.state,
  //       ids: this.state.ids.filter(id => id !== itemId),
  //     });
  //     this.setState({
  //       data: this.state.data.filter(id => id.user_id !== itemId),
  //     });
  //   } else {
  //     if (this.state.data.length > 1) {
  //       Toast.show('Only two user can select');
  //     } else {
  //       this.setState({
  //         ...this.state,
  //         ids,
  //       });
  //       this.setState({data: [...this.state.data, item]});
  //     }
  //   }
  // };

  isChecked = itemId => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked = (itemId, item) => {
    if (this.state.ids.includes(itemId)) {
      console.log('thisi s iworking prperly');
      this.setState({ids: []});
      this.setState({data: ''});
    } else {
      this.setState({ids: itemId});
      this.setState({data: item});
    }

    // this.setState({data: [...this.state.data, item]});
  };

  isChecked1 = itemId => {
    const isThere = this.state.ids1.includes(itemId);
    return isThere;
  };

  toggleChecked1 = (itemId, item) => {
    if (this.state.ids1.includes(itemId)) {
      this.setState({ids1: []});
      this.setState({data1: ''});
    } else {
      this.setState({ids1: itemId});
      this.setState({data1: item});
    }
    // this.setState({data: [...this.state.data, item]});
  };

  renderItem = item => {
    if (item.user_id == this.state.primaryData.user_id) {
      return <View></View>;
    } else {
      return (
        <View style={[styles.card, {marginTop: 10}]}>
          <View style={styles.container1}>
            <View style={{}}>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.name}
              </Text>
              <Text style={styles.text}>{`Date of Birth : ${item.dob}`}</Text>
              {item.relation == null ||
              item.relation == 0 ||
              item.relation == '' ? null : (
                <Text style={styles.text}>{`Relationship : ${
                  item.relation == null ? '' : item.relation
                }`}</Text>
              )}

              <Text
                style={styles.text}>{`Mobile Number : ${item.mobile}`}</Text>
            </View>
            <View>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={colors.bc}
                checked={this.isChecked(item.user_id)}
                onPress={() => this.toggleChecked(item.user_id, item)}
              />
            </View>
          </View>
        </View>
      );
    }
  };
  renderItem2 = item => {
    if (item.user_id == this.state.primaryData.user_id) {
      return <View></View>;
    } else {
      return (
        <View style={[styles.card, {marginTop: 10}]}>
          <View style={styles.container1}>
            <View style={{}}>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.name}
              </Text>
              <Text style={styles.text}>{`Date of Birth : ${item.dob}`}</Text>
              {item.relation == null ||
              item.relation == 0 ||
              item.relation == '' ? null : (
                <Text style={styles.text}>{`Relationship : ${
                  item.relation == null ? '' : item.relation
                }`}</Text>
              )}

              <Text
                style={styles.text}>{`Mobile Number : ${item.mobile}`}</Text>
            </View>
            <View>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={colors.bc}
                checked={this.isChecked1(item.user_id)}
                onPress={() => this.toggleChecked1(item.user_id, item)}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  manageFamily = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let reg1 = /^[0]?[6789]\d{9}$/;
    if (this.state.name == '') {
      Toast.show('Please enter name');
    } else if (this.state.email == '' || reg.test(this.state.email) === false) {
      Toast.show('Please enter valid email address');
    } else if (
      this.state.mobile == '' ||
      reg1.test(this.state.mobile) === false
    ) {
      Toast.show('Please enter valid mobile number');
    } else if (this.state.gender == '' || this.state.gender == 0) {
      Toast.show('Please select gender');
    } else if (this.state.relation == '' || this.state.relation == 0) {
      Toast.show('Please select relationship');
    } else {
      try {
        const data = new FormData();
        data.append('user_id', user_id);
        data.append('name', this.state.name);
        data.append('email', this.state.email);
        data.append('dob', value);
        data.append('gender', this.state.gender);
        data.append('father_spouse_name', 0);
        data.append('mother_maiden_name', 0);
        data.append('pan', 0);
        data.append('mobile', this.state.mobile);
        data.append('address1', 0);
        data.append('address2', 0);
        data.append('occupation', 0);
        data.append('pincode', 0);
        data.append('country', 0);
        data.append('state', 0);
        data.append('city', 0);
        data.append('relation', this.state.relation);
        data.append('income_group', 0);
        data.append('education', 0);
        data.append('marital_status', 0);
        data.append('residential_status', 0);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/createfamily',
        });

        console.log('this response value', response.data);
        if (response.data.status == 200) {
          this.setState({showModal1: false});
          Toast.show(response.data.messages);
          this.props.dispatch({
            type: 'Family_List_Request',
            url: 'getfamilylist',
            user_id: user_id,
          });
        } else {
          Toast.show(response.data.messages);
        }
      } catch (error) {
        throw error;
      }
    }
  };
  manageData = () => {
    if (this.state.data && this.state.data1) {
      if (this.state.data.name == this.state.data1.name) {
        Toast.show('Second holder and third holder could not be same');
      } else {
        this.props.navigation.navigate('UserInfo', {
          data: this.state.primaryData,
          my_fixed_deposit_id: this.state.my_fixed_deposit_id,
          secondaryData: [this.state.data, this.state.data1],
        });
      }
    } else if (this.state.data) {
      this.props.navigation.navigate('UserInfo', {
        data: this.state.primaryData,
        my_fixed_deposit_id: this.state.my_fixed_deposit_id,
        secondaryData: [this.state.data],
      });
    } else if (this.state.data1) {
      this.props.navigation.navigate('UserInfo', {
        data: this.state.primaryData,
        my_fixed_deposit_id: this.state.my_fixed_deposit_id,
        secondaryData: [this.state.data1],
      });
    } else {
      console.log('narendra pal here');
    }
  };

  render() {
    const value1 = this.state.date.toISOString().split('T')[0];
    const [yyyy, mm, dd] = value1.split('-');
    value = `${dd}-${mm}-${yyyy}`;
    console.log(
      'this user data from item',
      // this.state.primaryData,
      // this.state.my_fixed_deposit_id,
      this.state.data,
      this.state.data1,
    );

    return (
      <View style={{flex: 1, backgroundColor: colors.card}}>
        <Header
          source={require('../../../../assets/Image/arrow2.png')}
          title={'SECONDARY USER'}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={styles.Scroll}>
          <View style={styles.list}>
            <Text style={styles.header}>{'Second Holder'}</Text>
            <FlatList
              data={this.props.List}
              renderItem={({item}) => this.renderItem(item)}
              style={{width: '100%', marginBottom: 10, marginTop: 5}}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.header}>{'Third Holder'}</Text>
            <FlatList
              data={this.props.List}
              renderItem={({item}) => this.renderItem2(item)}
              style={{width: '100%', marginBottom: 10, marginTop: 5}}
            />
          </View>
          <View style={styles.Button}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => {
                if (this.props.List.length > 5) {
                  Toast.show('You can add maximum 6 members in family list!');
                } else {
                  this.setState({showModal1: true});

                  this.setState({name: ''});
                  this.setState({email: ''});
                  this.setState({mobile: ''});
                  this.setState({gender: ''});
                  this.setState({dob: ''});
                  this.setState({relation: ''});
                }
              }}
              style={styles.Touch}>
              <Text style={styles.Btntext}>+ ADD MEMBER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            flex: 1,
            paddingHorizontal: 20,
          }}>
          {this.state.data || this.state.data1 ? (
            <TouchableOpacity
              delayPressIn={0}
              disabled={this.state.data || this.state.data1 ? false : true}
              onPress={() => this.manageData()}
              style={{
                width: '100%',
                backgroundColor:
                  this.state.data || this.state.data1 ? colors.bc : 'grey',
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: colors.white}}>{'CONTINUE'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              delayPressIn={0}
              // disabled={this.state.data ? false : true}
              onPress={() =>
                this.props.navigation.navigate('UserInfo', {
                  data: this.state.primaryData,
                  my_fixed_deposit_id: this.state.my_fixed_deposit_id,
                  secondaryData: [],
                })
              }
              style={{
                width: '100%',
                backgroundColor: colors.bc,
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: colors.white}}>{'SKIP & CONTINUE'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Dialog
          dialogStyle={{
            width: '98%',
            paddingHorizontal: 0,
            height: '100%',
            paddingTop: 0,
          }}
          visible={this.state.showModal1}
          containerStyle={{marginTop:Platform.OS=='android'?20:90}}
          onHardwareBackPress={() => this.setState({showModal1: false})}>
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => this.setState({showModal1: false})}
              style={styles.cross}>
              <Text style={styles.x}>x</Text>
            </TouchableOpacity>
          </View>
          <DialogContent>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginBottom: 30}}>
                <Text style={styles.better}>Name</Text>
                <View style={styles.drop}>
                  <TextInput
                    style={{color: colors.textColor}}
                    placeholder="Jhon Mathew"
                    value={this.state.name}
                    onChangeText={val => this.setState({name: val})}
                    returnKeyType="done"
                  />
                </View>
                <Text style={styles.better}>Email</Text>
                <View style={styles.drop}>
                  <TextInput
                    style={{color: colors.textColor}}
                    placeholder="example@domain.com"
                    value={this.state.email}
                    onChangeText={val => this.setState({email: val})}
                    returnKeyType="done"
                    keyboardType="email-address"
                  />
                </View>
                <Text style={styles.better}>Mobile</Text>
                <View style={styles.drop}>
                  <TextInput
                    style={{color: colors.textColor}}
                    placeholder="9123456789"
                    value={this.state.mobile}
                    onChangeText={val => this.setState({mobile: val})}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    maxLength={11}
                  />
                </View>
                <Text style={styles.better}>Gender</Text>
                <View style={styles.drop}>
                  <RNPickerSelect
                    onValueChange={val => this.setState({gender: val})}
                    items={dataValu}
                    style={{
                      inputAndroid: {
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      inputIOS:{
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      placeholder: {
                        color: colors.heading1,
                        width: '100%',
                        //height: 40,
                        alignSelf: 'center',
                      },
                    }}
                    value={
                      this.state.gender == null || 0 ? '' : this.state.gender
                    }
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'Select Gender', value: 0}}
                    Icon={() => (
                      <Image
                        style={{
                          marginLeft: 12,
                          width: 25,
                          height: 9,
                          marginTop: Platform.OS == 'android' ? 14 : 4,
                        }}
                        source={require('../../../../assets/Image/down.png')}
                      />
                    )}
                  />
                </View>
                <Text style={styles.better}>Date of Birth</Text>

                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => this.setState({open: true})}
                  style={styles.dropCal}>
                  <View style={{width: '80%', marginLeft: 0}}>
                    <Text style={{color: colors.textColor}}>{value}</Text>
                    <DatePicker
                      date={this.state.date}
                      modal
                      mode={'date'}
                      open={this.state.open}
                      style={{alignItems: 'center'}}
                      onConfirm={date => {
                        // setOpen(false)
                        //  setDate(date)
                        this.setState({open: false});
                        this.setState({date: date});
                      }}
                      onCancel={() => {
                        // setOpen(false)
                        this.setState({open: false});
                      }}
                      textColor={colors.textColor}
                      maximumDate={new Date()}
                    />
                  </View>
                  <Image
                    style={{marginLeft: 0, width: 25, height: 9, marginTop: 0}}
                    source={require('../../../../assets/Image/down.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.better}>Relationship</Text>
                <View style={styles.drop}>
                  <RNPickerSelect
                    onValueChange={val => this.setState({relation: val})}
                    items={Relation}
                    style={{
                      inputAndroid: {
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      inputIOS:{
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      placeholder: {
                        color: colors.heading1,
                        width: '100%',
                       // height: 40,
                        alignSelf: 'center',
                      },
                    }}
                    value={
                      this.state.relation == null || 0
                        ? ''
                        : this.state.relation
                    }
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Please select relationship',
                      value: 0,
                    }}
                    Icon={() => (
                      <Image
                        style={{
                          marginLeft: 12,
                          width: 25,
                          height: 9,
                          marginTop: Platform.OS == 'android' ? 14 : 4,
                        }}
                        source={require('../../../../assets/Image/down.png')}
                      />
                    )}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <CustomButton
                    title="ADD"
                    onPress={() => this.manageFamily()}
                  />
                </View>
              </View>
            </ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    List: state.FamilyList,
  };
};
export default connect(mapStateToProps)(SecondaryUser);

const dataValu = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: 'Others', value: '3'},
];
const Relation = [
  {label: 'Father', value: 'Father'},
  {label: 'Mother', value: 'Mother'},
  {label: 'Sister', value: 'Sister'},
  {label: 'Brother', value: 'Brother'},

  {label: 'Spouse', value: 'Spouse'},
  {label: 'Daughter', value: 'Daughter'},
  {label: 'Other', value: 'Other'},
];
