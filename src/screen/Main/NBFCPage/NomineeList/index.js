import React from 'react';
import { View,Text,TouchableOpacity,FlatList, ScrollView, } from 'react-native';
import { connect } from "react-redux";
import styles from "./styles";
import Header from '../../../../component/compareHeader';
import  colors  from '../../../../component/colors';
import { CheckBox } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../../component/button1';
import Storage from '../../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../../component/loader';

class NomineeSelection extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      data:''
    };
  }
  componentDidMount=async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)   
        this.props.dispatch({
            type: 'Nominee_List_Request',
            url: 'nomineelist',
            user_id
          })
  }
  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };
  toggleChecked = (itemId,item) => {
   if(this.state.ids.includes(itemId)){
     this.setState({ids:[]})
   }
   this.setState({ids:itemId})
   this.setState({data:item})
 };
  // toggleChecked = (itemId,item) => {
  //   const ids = [...this.state.ids, itemId];
  //   if (this.isChecked(itemId)) {
  //     this.setState({
  //       ...this.state,
  //       ids: this.state.ids.filter((id) => id !== itemId),
  //     });
  //     this.setState({data:''})
  //   } else {
  //   if(this.state.ids.length>0){
  //       Toast.show('You can select only 1 user at a time')
  //   }else{
  //     this.setState({
  //       ...this.state,
  //       ids,
  //     });
  //     this.setState({data:item})
  //   }
  //   }
  // };
  renderItem=(item)=>{
    return(
        <View style={[styles.card,{marginTop:10}]}>
             <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                 <View style={{}}>
                     <Text style={[styles.text,{fontWeight:'bold'}]}>{item.name}</Text>
                     <Text style={styles.text}>{`Date of Birth : ${item.dob}`}</Text>
                     <Text style={styles.text}>{`Relationship : ${item.relationship==null?'':item.relationship}`}</Text>
                     <Text style={styles.text}>{`Pincode : ${item.pincode}`}</Text>
                 </View>
               <View>
               <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.isChecked(item.user_nominee_id)}
                    onPress={() => this.toggleChecked(item.user_nominee_id,item)}
                    checkedColor={colors.bc}
                    />
                      {/* <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor={colors.bc}
                    checked={this.isChecked(item.user_id)}
                    onPress={() => this.toggleChecked(item.user_id,item)}/> */}
               </View>
               </View>
               
                 
        </View>
    )
}

render(){
  const isFetching=this.props.isFetching
  console.log('this is not a user otherwise there',this.state.data);
        return(
            <View style={{flex:1,backgroundColor:colors.card}}>
              <Header
                  source={require('../../../../assets/Image/arrow2.png')}
                  title={'NOMINEE LIST'}
                  onPress={()=>this.props.navigation.goBack()}
               />
               {isFetching?<Loader/>:null}
                <ScrollView style={styles.Scroll}>
                       <View style={styles.list}>
                         <FlatList
                             data={this.props.List}
                             renderItem={({item})=>this.renderItem(item)}
                             style={{width:'100%',marginBottom:10,marginTop:5}}
                          />
                      </View>
                  <View style={styles.Button}>
                          <TouchableOpacity
                             onPress={()=>this.props.navigation.navigate('AddNominee')} 
                              style={styles.Touch}>
                             <Text  style={styles.Btntext}>ADD NOMINEE</Text>
                           </TouchableOpacity>
                 </View>  
                  
                </ScrollView>
                <View style={{
                     position:'absolute',
                     bottom:20,
                     left:0,right:0,
                     flex:1,
                     paddingHorizontal:20
                  }}>
                     <TouchableOpacity
                    disabled={this.state.data?false:true}
                    onPress={()=>this.props.navigation.navigate('NomineeUserInfo',{
                      data:this.state.data
                    })}
                    style={{
                      width:'100%',
                      backgroundColor:this.state.data? colors.bc:'grey',
                      height:50,
                      borderRadius:30,
                      alignItems:'center',
                      justifyContent:'center'
                      }}>
                      <Text style={{color:colors.white}}>{'CONTINUE'}</Text>
                    </TouchableOpacity> 
                    {/* <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('UploadDocument')}
                    style={{
                      width:'100%',
                      backgroundColor:colors.bc,
                      height:40,
                      borderRadius:10,
                      alignItems:'center',
                      justifyContent:'center'
                      }}>
                      <Text style={{color:colors.white}}>{'SAVE & CONTINUE'}</Text>
                    </TouchableOpacity>    */}
                   </View>  
            </View>
       )
  }
}
const mapStateToProps=(state)=>{
    return{
        isFetching:state.isFetching,
        List:state.NomineeList
    }
  }
  
  export default connect(mapStateToProps)(NomineeSelection)


