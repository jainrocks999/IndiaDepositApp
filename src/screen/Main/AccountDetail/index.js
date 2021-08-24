// import React from "react";
// import {View,Text,FlatList,Image,ScrollView} from 'react-native';
// import Header from '../../../component/compareHeader';
// import colors from '../../../component/colors';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// const data=[
//     {title:'Savings Account',value:'-------------',title1:'Bank Name',value1:'State Bank of India'},
//     {title:'Rate of Interest',value:'10%',title1:'Account Type',value1:'-------------'},
//     {title:'Security',value:'-----------',title1:'Minimum Age',value1:'--------'},
//     {title:'Minimum Balance',value:'----------',title1:'Nomination',value1:'------------'},
//     {title:'Eligibilty',value:'-----------',title1:'Net Banking Operation',value1:'-------'},
//     {title:'Joining kit',value:'-----------',title1:'Debit card AMC charges',value1:'------'},
//     {title:'Free ATM Transaction',value:'-------',title1:'PAN Required',value1:'yes'},
//     {title:'ECS/IMPS/NEFT/RTGS',value:'-------',title1:'Non-Maitenance Penalty',value1:'-------'},
//     {title:'Debit Card',value:'-------',title1:'ATM Point',value1:'-----'},
//     {title:'Phone Banking',value:'-------',title1:'Free Cheque',value1:'------'},
//     {title:'Locker Facility',value:'-------',title1:'TDS on Interest',value1:'yes'},
//     {title:'Auto Sweep',value:'-------',title1:'Interest Cal ,Frequency',value1:'-------'},
//     {title:'Cash Withdrawal Limit',value:'-------',title1:'Cash Traction Limit',value1:'------------'},
//     {title:'Salient feature',value:'-------',title1:'Insurance',value1:'------'},
//     {title:'Offers',value:'-------',title1:'',value1:''}
    
  
// ]
// const FDList=()=>{
// const navigation=useNavigation()
// const renderItem=(item)=>{
//       return(
//           <View style={styles.cont}>
//            <View style={styles.row}>
//             <View style={{width:'55%'}}>
//               <Text style={styles.title1}>{item.title}</Text>
//               <Text style={styles.value1}>{item.value}</Text>
//             </View>
//             <View style={{width:'45%'}}>
//             <Text style={styles.title1}>{item.title1}</Text>
//               <Text style={styles.value1}>{item.value1}</Text>
//             </View>
//             </View>
//             <View style={styles.border}></View>
//           </View>
//       )
// }
//     return(
//         <View style={{flex:1}}>
//           <Header
//             title={'ACCOUNT DETAILS'}
//             source={require('../../../assets/Images/arrow.png')}
//             titleTwo='Compare'
//             onPress={()=>navigation.goBack()}
//             onPress1={()=>navigation.navigate('CompareSBAccount')}
//             /> 
//             <View style={styles.list}>
//                 <FlatList
//                  data={data}
//                  renderItem={({item})=>renderItem(item)}
//                  keyExtractor={(item, index) => item.source}
//                  style={{width:'100%'}}
//                 />
//             </View>
//         </View>
//     )
// }
// export default FDList;
import React from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
const data=[
      
]
const FDList=()=>{
const navigation=useNavigation()

    return(
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
          <Header
            title={'SB A/C DETAILS'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareFD')}
            /> 
            <ScrollView>
            <View>
                <View style={styles.list}>
                    <Image style={{width:86,height:30}} source={require('../../../assets/Image/sbi.png')}/>
                  <Text style={{marginTop:10,fontSize:14,color:colors.bc,fontFamily:'Montserrat-Medium'}}>Saving Account</Text>
                   <Text style={{marginTop:6,fontSize:12,fontFamily:'Montserrat-Medium'}}>Account</Text>
                </View>
            </View>
            <View style={{backgroundColor:colors.white}}>
                <View style={styles.container}>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`6%`}</Text>
                       <Text style={styles.item1}>{`Interest Rate`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`300`}</Text>
                       <Text style={styles.item1}>{`Non-Maintenance Penalty`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`Yes`}</Text>
                       <Text style={styles.item1}>{`Locker Facility`}</Text>
                   </View>
                </View>
                <View style={{borderWidth:1,borderColor:'#C7BEBE'}}></View>
                <View style={styles.container}>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`Yes`}</Text>
                       <Text style={styles.item1}>{`Joining Kit`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`Yes`}</Text>
                       <Text style={styles.item1}>{`Net banking`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`Yes`}</Text>
                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Phone Banking`}</Text>
                   </View>
                </View>
            </View>
            {/* first row */}
            <View style={{backgroundColor:colors.white,marginTop:13}}>
                <View style={styles.container}>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`1 Lakh`}</Text>
                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Cash Withdrawal\nLimit`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`1 Lakh`}</Text>
                       <Text style={styles.item1}>{`Cash Deposit limit`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`3`}</Text>
                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Atm Free no of\nTransaction`}</Text>
                   </View>
                </View>
                <View style={{borderWidth:1,borderColor:'#C7BEBE'}}></View>
                <View style={styles.container}>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`Yes`}</Text>
                       <Text style={styles.item1}>{`Pan requirement`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`15`}</Text>
                       <Text style={styles.item1}>{`Bank Atm points`}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`100`}</Text>
                       <Text style={styles.item1}>{`ATM transaction\ncharges`}</Text>
                   </View>
                </View>
                <View style={{borderWidth:1,borderColor:'#C7BEBE'}}></View>
                <View style={styles.container}>
                   <View style={{alignItems:'center'}}>
                       <Text style={styles.item}>{`150`}</Text>
                       <Text style={styles.item1}>{`ATM Free transaction\nfrom other bank`}</Text>
                   </View>
                </View>
            </View>
           
               {/*  ButtonView */}
            <View style={styles.bank}>
              <TouchableOpacity >
                  <Text style={styles.bankDetails}>BANK DETAILS</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style={styles.bankDetails}>DOWNLOAD FORM</Text>
              </TouchableOpacity>
            </View>
            {/* Second row */}
            <View style={styles.top}>
               <Text style={styles.tds}>TDS applicable with info of 15 G option :</Text>
               <Text style={styles.lorem}>
                TDS is applicable to various interest income a taxpayer
                earns during the financial year. There are many
                taxpayers who have an income that is eligible for TDS
                deduction but the total tax payable in a financial year
                is nil.
               </Text>
            </View>
            <View style={styles.top}>
               <Text style={styles.tds}>Feature :</Text>
               <View style={{marginTop:6,flexDirection:'row'}}>
                   <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
               <View style={{marginTop:6,flexDirection:'row'}}>
                   <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
               <View style={{marginTop:6,flexDirection:'row'}}>
                   <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
            </View>

            <View style={styles.top}>
               <Text style={styles.tds}>Insurance :</Text>
               <Text style={styles.lorem}>
                Lorem Ipsum is simply dummy text of the printing and 
                typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley.
               </Text>
               <View style={{marginTop:6,flexDirection:'row'}}>
                   <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
               <View style={{marginTop:6,flexDirection:'row'}}>
                   <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
            </View>

            <View style={styles.top}>
               <Text style={{color:'#000',fontFamily:'Montserrat-Normal',marginTop:10}}>Eligibility :</Text>
               <Text style={styles.lorem}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea comm
                odo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
               </Text>
            </View>

            <View style={[styles.top,{marginBottom:20}]}>
               <Text style={{color:'#000',fontFamily:'Montserrat-Normal',marginTop:10}}>Bank contact information :</Text>
               <Text style={styles.lorem}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea comm
                odo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
               </Text>
            </View>
           
            </ScrollView>
        </View>
       
    )
}
export default FDList;