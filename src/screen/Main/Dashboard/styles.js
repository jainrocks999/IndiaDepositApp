import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:38
    },
    imageView:{
        // width:60,
        // height:60,
        // backgroundColor:colors.bc,
        // borderRadius:30,
        // justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:12,
        color:colors.textColor,
        marginTop:6,
        fontWeight:'600',
        textAlign: 'center',
    },
    name:{
        color:colors.white,
        fontSize:19,
        fontFamily:'Montserrat-Normal'
    },
    last:{
        color:colors.white,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    pfile:{
        width:76,
        height:76,
        borderRadius:37,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    main:{
       // height:200,
        width:'100%',
        backgroundColor:'#C4C4C4',
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        marginBottom:20,
        // paddingVertical:25,
    },
    view:{
        width:'100%',
        paddingHorizontal:15,
        marginTop:5
    },
    view1:{
        borderBottomWidth:1,
        paddingVertical:8,
        paddingHorizontal:15,
        borderColor:'#DDDDDD'
    },
    text2:{
        fontSize:14,
        fontFamily:'Montserrat-SemiBold'
    },
    view2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    circle:{
        width:10,
        height:10,
        borderRadius:5,
        borderWidth:1,
        marginTop:6,
        marginLeft:2,
        alignItems:'center',
        justifyContent:'center'
    },
    buttomview:{
        borderTopWidth:1,
        paddingVertical:8,
        paddingHorizontal:15,
        borderColor:'#DDDDDD'
    },
    Text1:{
        fontSize:11,
        fontFamily:'Montserrat-Normal'
    },
    buttomview1:{
        width:'100%',
        paddingHorizontal:15,
        marginTop:-10
    },
    width:{width:'10%'},
    touch1:{alignItems:'center'},
})
