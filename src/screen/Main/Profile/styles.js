import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import {  widthPercentageToDP as wp,
    heightPercentageToDP as hp, } from "react-native-responsive-screen";
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor:colors.card,
       // paddingTop:Platform.OS=='android'?0:40
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        // paddingVertical:20,
        marginTop:20,
        
         height:'94%',
         borderBottomRightRadius:10,
         borderBottomLeftRadius:10
    }, 
    view1:
    {
        width:'35%'
    },
    view2:
    {
        width:'100%',
        // flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    img:
    {
        height:'100%',
        width:'100%',
        borderRadius:42
    },
    main:
    {
        flexDirection:'row',
        paddingHorizontal:20,
        marginBottom:10,
        marginTop:20
    },
    imageContainer:
    {
        height:84,
        width:84,
        borderRadius:42
    },
    camera:
    {
        // width:28,
        // height:28, 
        // shadowColor:colors.black,
        // shadowOpacity:0.25,
        // shadowRadius:8,
        // shadowOffset:{height:5,width:0},
        // elevation:2,
        // borderRadius:14,
        // marginLeft:'-23%',
        // marginTop:63,
        // backgroundColor:colors.white,
        // alignItems:'center',
        // justifyContent:'center'
             width:28,
             height:28, 
             shadowColor:colors.black,
             shadowOpacity:0.25,
             shadowRadius:8,
             shadowOffset:{height:5,width:0},
             elevation:2,
             borderRadius:14,
             marginLeft:55,
             marginTop:-20,
             backgroundColor:colors.white,
             alignItems:'center',
             justifyContent:'center'
    },
    change:
    {
        fontSize:fontSize.eleven,
       // marginHorizontal:20,
        marginTop:5,
        color:colors.bc,
    },
    change1:
    {
        fontSize:fontSize.eleven,
       // marginHorizontal:20,
        marginTop:5,
        color:colors.bc,
        width:55
    },
    title:{ 
    // fontSize:,
        fontSize:fontSize.ten,
        fontFamily:'Montserrat-SemiBold' ,
        textAlign:'center'
    },
    modalView:
    {
        width:'100%',
        paddingHorizontal:10,
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
    },
    buton:
    {
         marginTop:35,
    },
    came:
    {
        color:colors.bc,
        fontFamily:'Montserrat-SemiBold',
        fontSize:16
    },
    img1:{
        width:60,
        height:40
    }
})