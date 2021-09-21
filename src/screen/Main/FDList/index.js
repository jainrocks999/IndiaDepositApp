import React,{useRef,useEffect,useState} from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../component/compareHeader';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from "../../../component/StatusBar";
import { useDispatch,useSelector } from 'react-redux';
import colors from '../../../component/colors';

const FDList=()=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.FDList)
        const [selectedData,setSelectedData]=useState([])
console.log('this is selcted data id',selectedData);
const manageList=(item)=>{
  dispatch({
    type: 'FD_Detail_Request',
    url: 'fddetail',
    fixed_deposit_id:item,
    navigation:navigation
  })
  
}
const handleonPress=(id)=>{
  if(selectedData.length){
    handleSelectionMultiple(id)
  }else{
    manageList(id)
  }
}

const handleSelectionMultiple = (id) => {
  var selectedIds = [...selectedData] // clone state

  if(selectedIds.includes(id))
    selectedIds = selectedIds.filter(_id => _id !== id)
  else 
    selectedIds.push(id)
    setSelectedData(selectedIds)
}
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <TouchableOpacity 
                    onLongPress={(val)=>handleSelectionMultiple(item.fixed_deposit_id)}
                    onPress={()=>handleonPress(item.fixed_deposit_id)}
                    style={[styles.card,{backgroundColor:selectedData.includes(item.fixed_deposit_id) ? colors.bc : null}]}>
                   <View style={styles.cardView}>
                      <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%'}}></View>
                   </View>
                   <View style={[styles.row2,{paddingRight:10}]}>
                     <View style={styles.width}>
                       <Text style={styles.same}>{item.rate}</Text>
                       </View>
                       <View  style={styles.width}>
                       <Text style={styles.same}>{item.min_amount}</Text>
                       </View>
                       <View  style={styles.width}>
                       <Text style={styles.same}>{item.loan}</Text>
                       </View>
                       <View  style={styles.width}>
                       <Text style={styles.same}>{item.premature_penality}</Text>
                       </View>
                   </View>
                   <View style={[styles.row2,{marginTop:0}]}>
                   <View  style={styles.width}>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/interest.png')}/>
                        </View>
                        <View  style={styles.width}>
                       <Image
                         style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/maturity.png')}/>
                      </View>
                      <View  style={styles.width}>
                       <Image 
                        style={styles.image} 
                       resizeMode='contain' source={require('../../../assets/Image/loan.png')}/>
                      </View>
                      <View  style={styles.width}>
                       <Image 
                        style={styles.image}
                        resizeMode='contain' source={require('../../../assets/Image/premature.png')}/>
                        </View>
                   </View>
                   <View style={styles.row1}>
                   <View  style={styles.width}>
                     <Text  style={styles.same}>{'Interest\n Rate'}</Text>
                     </View>
                     <View  style={styles.width}>
                     <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                     </View>
                     <View  style={styles.width}>
                     <Text  style={styles.same}>{'Loan'}</Text>
                     </View>
                     <View  style={styles.width}>
                     <Text  style={[styles.same]}>{'Premature\nPenalty'}</Text>
                     </View>
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
                    titleTwo={selectedData.length==2?'Campare':null}
                    onPress={()=>navigation.goBack()}
                    onPress1={()=>navigation.navigate('CompareFD')}
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