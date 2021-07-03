import React,{useRef} from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import BottomTab from '../../../component/FDBottomTab';
import BottomSheet from 'react-native-simple-bottom-sheet';
const data=[
    {source:require('../../../assets/Images/sbi.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'},
    {source:require('../../../assets/Images/union.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'},
    {source:require('../../../assets/Images/axis.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'},
    {source:require('../../../assets/Images/pnb.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'},
    {source:require('../../../assets/Images/hdfc.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'},
    {source:require('../../../assets/Images/bob.png'),title:'Regular Fixed Deposit',value1:'5.5%',value2:'9%',value3:'3 Lakh',value4:'12%'}
]
const FDList=()=>{
        const panelRef1 = useRef(null);
        const panelRef2 = useRef(null);
        const navigation=useNavigation()
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
          <TouchableOpacity 
          onPress={()=>navigation.navigate('FDDetail')}
           style={styles.card}>
             <View style={styles.cardView}>
               <Image source={item.source}/>
               <Text style={styles.title}>{item.title}</Text>
               <View style={{width:'20%'}}></View>
             </View>
             <View style={styles.row}>
               <Text style={styles.same}>{item.value1}</Text>
               <Text style={styles.same}>{item.value2}</Text>
               <Text style={styles.same}>{item.value3}</Text>
               <Text style={styles.same}>{item.value4}</Text>
            
             </View>
          </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
          <Header
            title={'     FD LIST'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareFD')}
            /> 
            <View style={styles.list}>
                <FlatList
                 data={data}
                 renderItem={({item})=>renderItem(item)}
                 keyExtractor={(item, index) => item.source}
                 style={{width:'100%'}}
                />

            </View>
            <BottomSheet 
            isOpen={false}
            sliderMinHeight={0}
            lineStyle={{width:0}}
            lineContainerStyle={{width:0,height:0,borderRedius:0}}
            ref={ref => panelRef1.current = ref}>
            <View style={{width:'100%',height:120,padding:10}}>
              <Text style={{fontFamily:'Montserrat-Normal',fontSize:12,color:colors.textColor}}>SORT BY</Text>
              <View style={{width:"100%",borderWidth:1/2,borderColor:colors.textColor,marginTop:10,marginBottom:10}}></View>
              <Text style={{fontFamily:'Montserrat-Normal',fontSize:12,color:colors.textColor}}>Popular</Text>
              <Text style={{fontFamily:'Montserrat-Normal',fontSize:12,color:colors.textColor}}>Alphabetical</Text>
              <Text style={{fontFamily:'Montserrat-Normal',fontSize:12,color:colors.textColor}}>Interest Rate</Text>
            </View>
          </BottomSheet>

          <BottomSheet 
            isOpen={false}
            sliderMinHeight={0}
            lineStyle={{width:0}}
            lineContainerStyle={{width:0,height:0,borderRedius:0}}
            ref={ref => panelRef2.current = ref}>
            <View style={{width:'100%',height:200,padding:10}}>
              <Text style={{fontFamily:'Montserrat-Normal',fontSize:12,color:colors.textColor}}>COMPARISON</Text>
              <View style={{width:"100%",borderWidth:1/2,borderColor:colors.textColor,marginTop:10,marginBottom:15}}></View>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../../../assets/Images/sbi.png')}/>
                  <Text style={{textAlign:'center',marginTop:10,color:colors.textColor,fontFamily:'Montserrat-Normal'}}>{`Regular Fixed\nDeposit`}</Text>
                </View>

                <View style={{width:0,height:60,borderWidth:1/2,borderColor:colors.textColor}}></View>

               <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../../../assets/Images/union.png')}/>
                  <Text style={{textAlign:'center',marginTop:10,color:colors.textColor,fontFamily:'Montserrat-Normal'}}>{`Regular Fixed\nDeposit`}</Text>
                </View>
              </View>
              <View style={{width:'100%',alignItems:'center',marginTop:20}}>
              <TouchableOpacity style={{height:45,width:'50%',backgroundColor:colors.textColor,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:colors.white}}>COMPARE</Text>
              </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
            <BottomTab
          // onPres={()=>}
           onPress1={()=>panelRef1.current.togglePanel()}
           onPress2={()=>panelRef2.current.togglePanel()}
         //  onPress2
            />
        </View>
    )
}
export default FDList;