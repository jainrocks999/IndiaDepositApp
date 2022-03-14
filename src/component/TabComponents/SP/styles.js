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
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    view1:{
        // flexDirection:'row',
        // justifyContent:'space-between',
        marginTop:20,
        // paddingHorizontal:20
    },
    view2:{
        alignItems:'center'
    },
    view3:{
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        fontSize:fontSize.thirteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        marginTop: Platform.OS == 'android'?0:10
    },
    img:{
        width:20,
        height:22,
        marginTop:Platform.OS=='android'?8:5
    },
    font:{
        fontSize:fontSize.thirteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    row:{
        alignItems:'center',
        // marginBottom:20,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    colorBox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    total:{
        fontSize:12,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        marginLeft:5
    },
    box:{
        width:30,
        height:10,
        backgroundColor:'#FA5E8E'
    },
    box1:{
        width:30,
        height:10,
        backgroundColor:'#AC4BE0'
    }
    
   
    
})