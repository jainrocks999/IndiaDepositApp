import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
export default StyleSheet.create({
heading:{
    fontSize:15,
    fontWeight:'500',
    fontFamily:'Montserrat-Regular',
    color:colors.textColor
},
container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:30
},
container1:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:15
},
drop:{
    marginTop:5 ,
    // borderWidth:1,
    // height:40,
    // borderColor:colors.textColor,
    // borderRadius:6,
    // paddingHorizontal:5,
    // justifyContent:'center',
    // width:'100%',
    // paddingHorizontal:10,
    // alignContent:'center'
    borderWidth:1,
    height:40,
    borderRadius:6,
    paddingHorizontal:10,
    borderColor:colors.black,
    justifyContent:'center',
    marginTop:2
   
}, 
})