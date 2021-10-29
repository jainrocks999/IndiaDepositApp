import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    padding:16
    // backgroundColor:'#E5E5E5'
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        paddingHorizontal:18,
        paddingVertical:20,
        marginTop:20,
        height:'100%'
    },
    
    heading:{
        fontSize:fontSize.eighteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    normal:{
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        marginTop:10
    },
    img:{
        width:20,
        height:22,
        marginTop:7
    },
    
   main:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
    },
   main1:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop:20,
       paddingHorizontal:20
    },
    total:{
        fontSize:fontSize.fefteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    }, 
   input:{
       flexDirection:'row',
       alignItems:'center',
       
    },
    
})