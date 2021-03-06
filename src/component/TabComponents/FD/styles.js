import { Platform, StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:10,
        paddingBottom:20,
        marginBottom:150
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
        marginTop:Platform.OS == 'android'?7:7
    },
    
   main:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
    },
//    main1:{
//        flexDirection:'row',
//        justifyContent:'space-between',
//        marginTop:20,
//        paddingHorizontal:20
//     },
    total:{
        fontSize:fontSize.thirteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        marginTop:Platform.OS=='android'?0:3
    }, 
   input:{
       flexDirection:'row',
       alignItems:'center',
       
    },
    
})