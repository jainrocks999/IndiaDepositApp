import React,{useRef,useEffect} from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../component/compareHeader';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from "../../../component/StatusBar";
import { useDispatch,useSelector } from 'react-redux';

const data=
[
    {source:require('../../../assets/Images/sbi.png'),
    title:'Regular Fixed Deposit',
    value1:'5%',value2:'1.05 Lakh',
    value3:'Yes',value4:'10%',
    img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
    },
    {source:require('../../../assets/Images/union.png'),
    title:'Regular Fixed Deposit',
    value1:'6%',value2:'1.06 Lakh',
    value3:'Yes',value4:'9%',
    img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
    },
    {source:require('../../../assets/Images/axis.png'),
    title:'Regular Fixed Deposit',
    value1:'7%',value2:'1.07 Lakh',
    value3:'Yes',value4:'8%',
     img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
  },
    {source:require('../../../assets/Images/pnb.png'),
    title:'Regular Fixed Deposit',
    value1:'8%',value2:'1.08 Lakh',
    value3:'Yes',value4:'7%', 
    img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
  },
    {source:require('../../../assets/Images/hdfc.png'),
    title:'Regular Fixed Deposit',
    value1:'9%',value2:'1.09 Lakh',
    value3:'Yes',value4:'6%',
     img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
  },
    {source:require('../../../assets/Images/bob.png'),
    title:'Regular Fixed Deposit',
    value1:'10%',value2:'1.10 Lakh',
    value3:'Yes',value4:'5%',
    img1:require('../../../assets/Image/interest.png'),
    img2:require('../../../assets/Image/maturity.png'),
    img3:require('../../../assets/Image/loan.png'),
    img4:require('../../../assets/Image/premature.png'),
    tx:'Interest\n Rate',tx1:'Maturity\nAmount',tx2:'Loan',
    tx3:'Premature\nPenalty'
    }
 ]
const FDList=()=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.FDList)
console.log('this is selector value',selector);

const manageList=(item)=>{
  dispatch({
    type: 'FD_Detail_Request',
    url: 'fddetail',
    fixed_deposit_id:item,
    navigation:navigation
  })
  
}
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <TouchableOpacity 
                    onPress={()=>manageList(item.fixed_deposit_id)}
                    style={styles.card}>
                   <View style={styles.cardView}>
                      <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%'}}></View>
                   </View>
                   <View style={[styles.row2,{paddingRight:10}]}>
                       <Text style={styles.same}>{item.rate}</Text>
                       <Text style={styles.same}>{item.min_amount}</Text>
                       <Text style={styles.same}>{item.loan}</Text>
                       <Text style={styles.same}>{item.premature_penality}</Text>
                   </View>
                   <View style={[styles.row2,{marginTop:0}]}>
                       <Image style={{width:30,height:30}} resizeMode='contain' source={require('../../../assets/Image/interest.png')}/>
                       <Image style={{width:30,height:30}} resizeMode='contain' source={require('../../../assets/Image/maturity.png')}/>
                       <Image style={{width:30,height:30}} resizeMode='contain' source={require('../../../assets/Image/loan.png')}/>
                       <Image style={{width:30,height:30}} resizeMode='contain' source={require('../../../assets/Image/premature.png')}/>
                   </View>
                   <View style={styles.row1}>
                     <Text  style={styles.same}>{'Interest\n Rate'}</Text>
                     <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                     <Text  style={styles.same}>{'Loan'}</Text>
                     <Text  style={[styles.same]}>{'Premature\nPenalty'}</Text>
                   </View>
                 </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
              <Header
                    title={'FD LISTING'}
                    source={require('../../../assets/Images/arrow.png')}
                   // titleTwo='Compare'
                    onPress={()=>navigation.goBack()}
                   // onPress1={()=>navigation.navigate('CompareFD')}
               /> 
              <View style={styles.list}>
                <FlatList
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   keyExtractor={(item, index) => item.source}
                   style={{width:'100%'}}
                 />

              </View>
         
          <StatusBar/>
         
       </View>
    )
}
export default FDList;