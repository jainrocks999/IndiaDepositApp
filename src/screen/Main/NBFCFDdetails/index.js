import React,{useEffect, useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity,TextInput,Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import colors from '../../../component/colors';
import { FlatList } from "react-native-gesture-handler";
import StatusBar from '../../../component/StatusBar';
import styles from './styles';
const BankCalu=({route})=>{
    const navigation = useNavigation()
    const [selectedItems, setSelectedItems] = useState([]);
    const [demo,setDemo]=useState(' - ₹25,000');
    const[demo1,setDemo1]=useState(' + ₹25,000');
    console.log("selectitem ",selectedItems[0]);
    const data1 = route.params;
    const ListItem = ({item, selected, onPress,}) => (
        <View style={{width:'33.3%',alignItems:'center',justifyContent:'center',height:85,marginTop:-5}}>
            <View  style={styles.touch1}>
                 <TouchableOpacity
                 delayPressIn={0}
                 disabled={selectedItems.length>0?true:false} 
                 onPress={onPress}
                 style={styles.imageView}>
                    <Text style={[styles.text,{color:colors.textColor}]}>{item.name}</Text>
                    <Text style={[styles.text,{color:colors.textColor}]}>{item.name1}</Text>
                 </TouchableOpacity>
                 {selected && <View style={styles.enable}>
                    <TouchableOpacity
                    delayPressIn={0}
                      onPress={onPress}
                      style={styles.touch1}>
                     <View>
                       <Text style={[styles.text,{color:colors.white}]}>{item.name}</Text>
                       <Text style={[styles.text,{color:colors.white}]}>{item.name1}</Text>
                     </View>
                   </TouchableOpacity>
               </View>
                 }
             </View>
            
         </View>                                           
   
   );

   const getSelected = contact => selectedItems.includes(contact.name);

   const deSelectItems = () => setSelectedItems([]);
   const selectItems = item => {
    setSelectedItems([])
    
     if (selectedItems.includes(item.name)) {
       const newListItems = selectedItems.filter(
         listItem => listItem !== item.name,
       );
       return setSelectedItems([...newListItems]);
     }
     setSelectedItems([...selectedItems, item.name]);
   };


 
return(
  <View style={styles.container1}>
     <View style={styles.container}>
          <TouchableOpacity delayPressIn={0} onPress={()=>navigation.goBack()}>
            <Image  style={styles.img}
              source={require('../../../assets/Image/arrow2.png')}
            />
          </TouchableOpacity>
       <Image  resizeMode='contain'
           style={{height:30,width:80,marginTop:-8,}}
              source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data1.image}`}}
         />
         <Text style={styles.text3}>{data1.type} </Text>  
    </View>
    <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
       <View style={styles.card}>
          <Text style={styles.text2}>Deposit Amount</Text>
           <View style={{marginTop:-2}}>
             <TextInput style={{width:'90%',marginLeft:10}}
                placeholder=' Enter your deposit amount'
                value={data1.principal}
                placeholderTextColor={colors.heading1}
                keyboardType='number-pad'
                style={{color:colors.textColor,width:'80%'}}
              />
               <View style={{ marginHorizontal:5,marginLeft:5,borderBottomWidth:1.5,borderColor:colors.bc,marginTop:Platform.OS=='android'?-8:6}}/>
                      
           </View>
             <View style={{flexDirection:'row',marginLeft:10}}>
                 <TouchableOpacity delayPressIn={0} style={styles.touch2}>
                
                    <Text style={styles.tt}>{demo}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity delayPressIn={0} style={[styles.touch2,{marginLeft:5}]}>
                   <Text style={styles.tt}>{demo1}</Text>
                 </TouchableOpacity>
             </View> 
               <Text style={styles.Text1}>Deposit Period</Text>
  
               <View style={styles.view1}>
                 {/* <Text style={{color:'black'}}>{selectedItems[0]}</Text> */}
                  <TextInput style={{width:'90%'}}
                       placeholder=''
                       value={selectedItems[0]}
                       placeholderTextColor={colors.heading1}
                       onChangeText={selectedItems[0]}
                       style={{color:colors.textColor,width:'90%'}}
                   />
                </View>
                 <Pressable onPress={deSelectItems}  
                   style={{ flexDirection:'row',justifyContent:'space-between',paddingHorizontal:0}}>
                       <FlatList
                         style={{ width: '100%' }}
                         data={data}
                         numColumns={3}
                         keyExtractor={(item, index) => item.id}
                          renderItem={({item})=>(
                          <ListItem
                          onPress={() => selectItems(item)}
                          selected={getSelected(item)}
                          item={item}
                          />
                           )}
                        />
                  </Pressable >
        </View> 
   </ScrollView>
     <StatusBar/>       
  </View>
)
}
export default BankCalu;
const data=[
    {name:'5 Years',
     name1:'6.4%p.a.',
    id:5},
   
    {name:'4 Years', id:4, name1:'6.0%p.a.'},
    {name:'3 Years',id:3, name1:'5.9%p.a.'},

    {name:'2 Years',id:2, name1:'5.4%p.a.'},
    {name:'1 Years',id:1, name1:'4.9%p.a.'},
]
