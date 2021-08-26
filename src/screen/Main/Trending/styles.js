import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:'#E5E5E5'
    },
    card:{
        // shadowColor:'black',
        // shadowOpacity:0.25,
        // shadowRadius:8,
        // shadowOffset:{height:2,width:0},
        // elevation:5,
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10,
        // backgroundColor:'white',
        // marginHorizontal:15,
         paddingHorizontal:18,
         paddingVertical:20,
        // marginTop:20,
        // flex:1
        // card:{ 
            shadowColor:'black',
            shadowOpacity:0.25,
            shadowRadius:4,
            shadowOffset:{height:2,width:0},
            elevation:2,
            borderRadius:10,
            backgroundColor:'white',
            marginBottom:70
        // }
        // height:'70%'
    },
    
    heading:{
        fontSize:18,
        color:colors.textColor,
        fontFamily:'Montserrat-Normal'
    },
    normal:{
        fontSize:14,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
        marginTop:10
    },
    
    
   
    
})