import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container1:{
        flex:1,
        backgroundColor:'#E5E5E5'
    },
    img:{
        width:86,
        height:30
    },
    text:{
        marginTop:10,
        fontSize:14,
        color:colors.bc,
        fontFamily:'Montserrat-Medium'
    },
    text1:{
        marginTop:6,
        fontSize:12,
        fontFamily:'Montserrat-Medium',
        color:colors.textColor,
    },
    list:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        paddingVertical:15,
        marginHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:2,
        marginTop:13
    },
    item:{
        fontSize:12,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    item1:{
        fontSize:11,
        fontFamily:'Montserrat-Normal',
        color:'#777777'
    },
    view1:{backgroundColor:colors.white},
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:13,
        paddingHorizontal:12
    },
    line:{
        borderWidth:1,
        borderColor:'#C7BEBE'
    },
    view3:{marginTop:6,flexDirection:'row'},
    view2:{alignItems:'center'},
    tds:{color:'#000',fontFamily:'Montserrat-Normal',marginTop:10},
    lorem:{color:colors.textColor,fontFamily:'Montserrat-Normal',marginTop:10,fontSize:13},
    point:{width:6,height:6,borderRadius:3,backgroundColor:'#000',marginTop:7},
    pointText:{color:colors.textColor,fontFamily:'Montserrat-Normal',fontSize:13,marginLeft:10,marginTop:1},
    bank:{backgroundColor:colors.white,marginTop:13,paddingVertical:15,paddingHorizontal:50,
        flexDirection:'row',alignItems:'center',justifyContent:'space-between'
       },
    text3:{color:'white',fontFamily:'Montserrat-Normal',},
    text2:{color:'#000',fontFamily:'Montserrat-Normal',marginTop:10},
    bankDetails:{color:colors.bc,fontSize:13,fontFamily:'Montserrat-Normal'},
    top:{backgroundColor:colors.white,marginTop:13,paddingVertical:15,paddingHorizontal:20},
    button:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:20,marginBottom:20},
    btCont:{width:'47%',height:45,borderRadius:20,backgroundColor:colors.bc,alignItems:'center',justifyContent:'center'}
})
