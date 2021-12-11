import React from 'react';
import { View,Text,TouchableOpacity,FlatList, ScrollView, } from 'react-native';
import {connect } from "react-redux";
import styles from "./styles";
import Header from '../../../../component/compareHeader';
import  colors  from '../../../../component/colors';
import { CheckBox } from "react-native-elements";
import Toast from 'react-native-simple-toast';

class UserSelection extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      data:'',
      my_fixed_deposit_id:this.props.route.params.my_fixed_deposit_id
    };
  }
  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked = (itemId,item) => {
     console.log('thisi isfasfkld;skfl;dkfdlfkdlfklk toggle working');
    if(this.state.ids.includes(itemId)){
      this.setState({ids:[]})
    }
    this.setState({ids:itemId})
    this.setState({data:item})
  };
  renderItem=(item)=>{
    return(
        <View style={[styles.card,{marginTop:10}]}>
             <View style={styles.container1}>
                 <View style={{}}>
                     <Text style={[styles.text,{fontWeight:'bold'}]}>{item.name}</Text>
                     <Text style={styles.text}>{`Date of Birth : ${item.dob}`}</Text>
                     <Text style={styles.text}>{`Relationship : ${item.relation==null?'':item.relation}`}</Text>
                     <Text style={styles.text}>{`Pincode : ${item.pincode}`}</Text>
                 </View>
                
               <View>
               <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor={colors.bc}
                    checked={this.isChecked(item.user_id)}
                    onPress={() => this.toggleChecked(item.user_id,item)}/>
               </View>
               </View>
        </View>
    )
}
render(){
        return(
            <View style={{flex:1,backgroundColor:colors.card}}>
              <Header
                  source={require('../../../../assets/Image/arrow2.png')}
                  title={'FAMILY LIST'}
                  onPress={()=>this.props.navigation.goBack()}
               />
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
                             onPress={()=>this.props.navigation.navigate('AddFamily')} 
                              style={styles.Touch}>
                             <Text  style={styles.Btntext}>ADD FAMILY</Text>
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
                    onPress={()=>this.props.navigation.navigate('UserInfo',{
                      data:this.state.data,
                      my_fixed_deposit_id:this.state.my_fixed_deposit_id
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
                    {/* <CustomButton
                    title='CONTINUE'
                    onPress={()=>this.props.navigation.navigate('UserInfo',{
                      data:this.state.data
                    })}
                    /> */}
                   </View>  
            </View>
       )
  }
}
const mapStateToProps=(state)=>{
    return{
        isFetching:state.isFetching,
        List:state.FamilyList
    }
  }
  export default connect(mapStateToProps)(UserSelection)


