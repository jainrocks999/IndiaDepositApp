import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
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
class UserSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      data: '',
      my_fixed_deposit_id: this.props.route.params.my_fixed_deposit_id,
      showModal1: false,
      loggedinUser: '',
      name: '',
      email: '',
      mobile: '',
      gender: '',
      dob: '',
      relation: '',
      date: new Date(),
      open: false,
      checked:true
    };
  }
  isChecked = itemId => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked = (itemId, item) => {
    if (this.state.ids.includes(itemId)) {
      this.setState({ids: []});
    }
    this.setState({ids: itemId});
    this.setState({data: item});
  };
  componentDidMount = async () => {
    const name = await AsyncStorage.getItem(Storage.name);
    this.setState({loggedinUser: name});
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
        if (response.data.status == 200) {
          this.setState({showModal1: false});
          Toast.show(response.data.messages);
          this.props.dispatch({
            type: 'Family_List_Request',
            url: 'getfamilylist',
            user_id: user_id,
          });
        } else {
          Toast.show(response.data.Message);
        }
      } catch (error) {
        throw error;
      }
    }
  };

  manageUser=()=>{
    if(this.state.checked){
      this.setState({checked:false})
    }
    else{
      this.setState({checked:true})
    }
  }

  renderItem = item => {
    if (this.state.loggedinUser == item.name) {
      return (
        <View style={[styles.card, {marginTop: 10}]}>
          <View style={styles.container1}>
            <View style={{}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {item.name}
                </Text>
              </View>
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
            {/* {this.toggleChecked(item.user_id, item)} */}
            <View>
              {/* <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={colors.bc}
                checked={this.isChecked(item.user_id)}
                onPress={() => this.toggleChecked(item.user_id, item)}
              /> */}
              <CheckBox 
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={colors.bc}
              checked={this.state.checked}
              onPress={()=>this.manageUser()}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    const value1 = this.state.date.toISOString().split('T')[0];
    const [yyyy, mm, dd] = value1.split('-');
    value = `${dd}-${mm}-${yyyy}`;
    console.log('this is primart user data',this.props.List[0]);
    return (
      <View style={{flex: 1, backgroundColor: colors.card}}>
        <Header
          source={require('../../../../assets/Image/arrow2.png')}
          title={'PRIMARY USER'}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={styles.Scroll}>
          <View style={styles.list}>
            <FlatList
              data={this.props.List}
              renderItem={({item}) => this.renderItem(item)}
              style={{width: '100%', marginBottom: 10, marginTop: 5}}
            />
          </View>
          <View style={styles.Button}></View>
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
          <TouchableOpacity
            delayPressIn={0}
            disabled={this.state.checked ? false : true}
            onPress={() =>
              this.props.navigation.navigate('SecondaryUser', {
                data: this.props.List[0],
                my_fixed_deposit_id: this.state.my_fixed_deposit_id,
              })
            }
            style={[
              styles.button1,
              {backgroundColor: this.state.checked ? colors.bc : 'grey'},
            ]}>
            <Text style={{color: colors.white}}>{'CONTINUE'}</Text>
          </TouchableOpacity>
        </View>

        {/* Blow for add family popup */}

        <Dialog
          dialogStyle={{
            width: '98%',
            paddingHorizontal: 0,
            height: '100%',
            paddingTop: 0,
          }}
          visible={this.state.showModal1}
          containerStyle={{marginTop: 20}}
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
                    items={data}
                    style={{
                      inputAndroid: {
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      placeholder: {
                        color: colors.heading1,
                        width: '100%',
                        height: 40,
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
                      placeholder: {
                        color: colors.heading1,
                        width: '100%',
                        height: 40,
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
export default connect(mapStateToProps)(UserSelection);

const data = [
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
