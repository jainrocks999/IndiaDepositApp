import React from "react";
import {View,Text,FlatList,Image,ScrollView, TouchableOpacity} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Button from '../../../component/button1';
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
    if(item.title=='list'){
        return(
            <FlatList
                  horizontal
                  data={item.data}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item})=>
               <View style={styles.View}>
                     <View style={styles.card}>
                          <View style={styles.xview}>
                                <View style={styles.row1}>
                                      <Text style={styles.xtext}>x</Text>
                                </View>
                         </View>
                         <Image source={item.source}/>
                         <Text style={styles.title1}>{item.title}</Text>
                         <View style={{position:'absolute',bottom:15}}>
                                <TouchableOpacity 
                                   onPress={()=>navigation.navigate('BuyNow')}
                                  style={styles.button}>
                                 <Text style={styles.invest}>{'INVEST NOW'}</Text>
                               </TouchableOpacity>
                         </View>
                     </View>
                </View>
                }
           />
        )
    }
    else
    {
         return(
                 <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{item.title}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{item.value}</Text>
                         <Text style={styles.value}>{item.value1}</Text>
                     </View>
                  </View>
           )
    }
}
    return(
        <View style={{flex:1}}>
              <Header
                  title={'COMPARE FD'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
               /> 
             <View style={styles.view2}>
                  <FlatList
                     data={data}
                     renderItem={({item})=>renderItem(item)}
                     keyExtractor={(item, index) => item.source}
                     style={{width:'100%'}}
                   />
             </View>
             <View style={styles.df}>
                 <Button
                    title='DOWNLOAD FORM'
                 />
             </View>
            <View>
            </View>
        </View>
    )
}
export default FDList;
const data=
[
 {
        title:'list',data:
    [
    {source:require('../../../assets/Images/sbi.png'),title:'Regular Fixed\n    Deposit',},
    {source:require('../../../assets/Images/union.png'),title:'Regular Fixed\n    Deposit',},
    {source:require('../../../assets/Images/axis.png'),title:'Regular Fixed\n    Deposit',},
    {source:require('../../../assets/Images/pnb.png'),title:'Regular Fixed\n    Deposit',},
    {source:require('../../../assets/Images/hdfc.png'),title:'Regular Fixed\n    Deposit',},
    {source:require('../../../assets/Images/bob.png'),title:'Regular Fixed\n    Deposit',}
    ]
 },
    {title:'Rate of interest',value:'5.5%',value1:'7.5%'},
    {title:'Calulator',value:'9%',value1:'10%'},
    {title:'Amount',value:'3 Lakh',value1:'5 Lakh'},
    {title:'Growth %',value:'12%',value1:'15%'},
    {title:'FD Type',value:'Normal FD',value1:'Tax-saving FD'},
    {title:'Duration',value:'3 Years',value1:'5 Years'},
    {title:'Security',value:'---------',value1:'---------'},
    {title:'Minimum amount',value:'5000',value1:'10000'},
    {title:'Maximum amount',value:'1.5 Lakh',value1:'5Lakh'},
    {title:'Minumum Tenure',value:'7 days',value1:'7 days'},
    {title:'Maximum Tenure',value:'15 Years',value1:'10 Years'},
    {title:'Loan',value:'----------',value1:'---------'},
    {title:'Premature Withdrawals',value:'Yes',value1:'Yes'},
    {title:'Nomination',value:'----------',value1:'-------------'},
    {title:'SB account Required',value:'Yes',value1:'Yes'},
    {title:'Eligibility',value:'Indian resident',value1:'Indian resident'},
    {title:'Online link',value:'-------',value1:'-----------'},
    {title:'Auto renewal',value:'Yes',value1:'Yes'},
    {title:'Interest Payout',value:'--------',value1:'-------'},
    {title:'Premature penality',value:'1.00%',value1:'1.00%'},
    {title:'Flexi/auto sweep',value:'Yes',value1:'Yes'},
    {title:'Net Banking operation',value:'Yes',value1:'Yes'},
    {title:'PAN required',value:'Yes',value1:'Yes'},
    {title:'Salient feature',value:'-------------',value1:'---------'},
    {title:'Insuarance',value:'5 Lakh',value1:'5 Lakh'},
    {title:'Offers',value:'-----------',value1:'-----------'},
 
]