import React from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import BottomTab from '../../../component/StoreButtomTab';
import StatusBar from "../../../component/StatusBar";
import styles from './styles';
const data=
[
   {source:require('../../../assets/Images/sbi.png'),
          title:'Saving Account',
         value1:'5.5%',value2:'9%',value3:'Yes',value4:'No',
         value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
         value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
         img1:require('../../../assets/Image/interest.png'),
         img2:require('../../../assets/Image/penalty.png'),
         img3:require('../../../assets/Image/debit.png'),
         img4:require('../../../assets/Image/offer.png')
    },
    {source:require('../../../assets/Images/union.png'),
            title:'Saving Account',
            value1:'5.5%',value2:'9%',value3:'Yes',value4:'No',
            value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
            value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
            img1:require('../../../assets/Image/interest.png'),
            img2:require('../../../assets/Image/penalty.png'),
            img3:require('../../../assets/Image/debit.png'),
            img4:require('../../../assets/Image/offer.png')
    },
    {source:require('../../../assets/Images/axis.png'),title:'Saving Account',
             value1:'5.5%',value2:'9%',value3:'Yes',value4:'No', 
             value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
             value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
             img1:require('../../../assets/Image/interest.png'),
             img2:require('../../../assets/Image/penalty.png'),
             img3:require('../../../assets/Image/debit.png'),
             img4:require('../../../assets/Image/offer.png')
     },
     {source:require('../../../assets/Images/pnb.png'),title:'Saving Account',
               value1:'5.5%',value2:'9%',value3:'Yes',value4:'No', 
               value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
               value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
               img1:require('../../../assets/Image/interest.png'),
               img2:require('../../../assets/Image/penalty.png'),
               img3:require('../../../assets/Image/debit.png'),
              img4:require('../../../assets/Image/offer.png')
      },
     {source:require('../../../assets/Images/hdfc.png'),title:'Saving Account',
              value1:'5.5%',value2:'9%',value3:'Yes',value4:'No',
              value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
              value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
              img1:require('../../../assets/Image/interest.png'),
              img2:require('../../../assets/Image/penalty.png'),
              img3:require('../../../assets/Image/debit.png'),
              img4:require('../../../assets/Image/offer.png')
     },
     {source:require('../../../assets/Images/bob.png'),title:'Saving Account',
              value1:'5.5%',value2:'9%',value3:'Yes',value4:'No',
              value5:'Interest\nRate',value6:'Non Maintenance\nPenalty',
              value7:'Debit Card\nAMC',value8:'Life Style\nOffer',
              img1:require('../../../assets/Image/interest.png'),
              img2:require('../../../assets/Image/penalty.png'),
              img3:require('../../../assets/Image/debit.png'),
              img4:require('../../../assets/Image/offer.png')
      }
]
const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
 return(
         <View style={styles.cont}>
            <TouchableOpacity 
                     onPress={()=>navigation.navigate('AccountDetail')}
                     style={styles.card}>
                     <View style={styles.cardView}>
                          <Image source={item.source}/>
                          <Text style={styles.title}>{item.title}</Text>
                          <View style={{width:'25%'}}></View>
                     </View>
                      <View style={styles.row}>
                           <Text style={styles.same1}>{item.value1}</Text>
                           <Text style={styles.same1}>{item.value2}</Text>
                           <Text style={styles.same1}>{item.value3}</Text>
                           <Text style={styles.same1}>{item.value4}</Text>
                      </View>
                       <View style={styles.row}>
                           <Image source={item.img1}/>
                           <Image source={item.img2}/>
                           <Image source={item.img3}/>
                           <Image source={item.img4}/>
                       </View>
                      <View style={styles.row1}>
                          <Text style={styles.same}>{item.value5}</Text>
                          <Text style={styles.same}>{item.value6}</Text>
                          <Text style={styles.same}>{item.value7}</Text>
                         <Text style={styles.same}>{item.value8}</Text>
                      </View>
            </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
              <Header
                   title={'SB A/C LISTING'}
                   source={require('../../../assets/Image/arrow.png')}
                   //titleTwo='Compare'
                   onPress={()=>navigation.goBack()}
                //    onPress1={()=>navigation.navigate('CompareSBAccount')}
              /> 
             <View style={styles.list}>
                <FlatList
                   data={data}
                   renderItem={({item})=>renderItem(item)}
                   keyExtractor={(item, index) => item.source}
                   style={{width:'100%'}}
                />
            </View>
            <StatusBar/>
            <BottomTab/>
        </View>
    )
}
export default FDList;