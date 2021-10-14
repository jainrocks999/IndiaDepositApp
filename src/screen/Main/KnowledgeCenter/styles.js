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
        marginVertical:4,
        marginTop:20
       
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
        width:28,
        height:28, 
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:5,width:0},
        elevation:2,
        borderRadius:14,
        marginLeft:-28,marginTop:63,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center'
    },
    change:
    {
        fontSize:fontSize.fourteen,
        //fontSize: hp('1.9%'),
        marginHorizontal:15,
        marginTop:5,
        color:colors.bc
    },
    title:
    { 
     
        fontSize:fontSize.eleven,
        //  hp('1.9%'),
        fontFamily:'Montserrat-SemiBold' ,
       
    },
    buttomview:
    {
        bottom:0,
        left:0,
        right:0,
        position:'absolute'
    },
})