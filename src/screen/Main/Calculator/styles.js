import { StyleSheet } from 'react-native';
import fontSize from '../../../component/fontSize';
import colors from '../../../component/colors';
import {  widthPercentageToDP as wp,
    heightPercentageToDP as hp, } from "react-native-responsive-screen";

export default StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor:'#E5E5E5'
    },
    card:
    {
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'white',
        marginHorizontal:15,
        // paddingVertical:20,
        marginTop:20,
        
         height:'100%'
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
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:5,width:0},
        elevation:2,
        borderRadius:14,
        marginLeft:-28,
        marginTop:63,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    change:
    {
        fontSize:fontSize.thirteen,
        marginHorizontal:15,
        marginTop:5,
        color:colors.bc
    },
    title:
    { 
     
        fontSize:fontSize.thirteen,
        //  hp('1.9%'),
        fontFamily:'Montserrat-SemiBold' 
    },
    prop:
    {
        backgroundColor: 'white',
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
})