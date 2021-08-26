import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import { TextInput } from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1'
import RNPickerSelect from "react-native-picker-select";
import { ProgressBar, Colors } from 'react-native-paper';
import BottomTab from '../../../component/StoreButtomTab';

const data=
[
  { label: '10-20 Years', value: '10-20 Years'},
  { label: '20-50 Years', value: '20-50 Years' },
  { label: '50-80 Years', value: '50-80 Years' },
]

const data1=
[
  { label: 'Any', value: 'Any'},
  { label: 'Any', value: 'Any' },
  { label: 'Any', value: 'Any' },
]

const data2=
[
  { label: 'Any', value: 'Any'},
  { label: 'Any', value: 'Any' },
  { label: 'Any', value: 'Any' },
]
    
const SBAccount=()=>{
    const navigation=useNavigation()
    const [age, setAge] = useState('')
    const [account, setAccount] = useState('')
    const [acType, setAcType] = useState('')
    const [checked, setChecked] = React.useState(false);

    return(
        <View style={styles.container}>
                 <Header
                    title={'SB A/C SEARCH'}
                    source={require('../../../assets/Images/arrow.png')}
                    onPress={()=>navigation.goBack()}
                  />
                  <ScrollView style={styles.scroll}>
                     <View style={styles.main}>
                           <View style={styles.view}>
                              <Text style={styles.text1}>
                              Lorem ipsum, or lipsum as it is sometimes known,
                              is dummy text used in laying out print, graphic or
                              web designs. The passage is attributed to an
                              unknown typesetter book.</Text>
                              <View style={styles.view}>
                                  <Text>Minimum Balance </Text>
                                  <TextInput
                                      style={styles.textinput}
                                       // placeholder='Enter Pincode'
                                       keyboardType='number-pad'
                                  />
                                </View>
                           </View>
                           <View style={styles.view}>
                                 <View style={styles.view1}>
                                     <Text style={styles.text2}>Location</Text>
                                  </View>
                                  <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require('../../../assets/Image/search.png')}/>
                                           <Text style={styles.text3}>Current Location</Text>
                                  </View>
                              </View>
                              <View style={[styles.view,{alignItems:'center'}]}>
                                      <Text>OR</Text>
                              </View>
                              <View style={{marginTop:5}}>
                                   <TextInput
                                       style={styles.textinput1}
                                       placeholder='Enter Pincode'
                                    />
                               </View>
                               <View style={styles.view2}>
                                         <Button
                                             onPress={()=>navigation.navigate('AccountList')}
                                              title='SEARCH'
                                         />
                                </View>
                          </View>
                  </ScrollView>
                       <BottomTab/>
                        <StatusBar/>
        </View>
       )
}
export default SBAccount;

