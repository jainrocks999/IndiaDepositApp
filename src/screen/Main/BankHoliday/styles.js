import { StyleSheet,Platform } from "react-native";
import colors from '../../../component/colors';
import fontSize from "../../../component/fontSize";
export default StyleSheet.create({
    container1:
    {
        flex:1,
        backgroundColor:colors.card,
      //  paddingTop:Platform.OS=='android'?0:40
    },
    Textview:
    {
         backgroundColor:colors.white,
         marginTop:20,
         borderRadius:6
    },
    Textview1:
    {
        paddingHorizontal:20,
        marginTop:20
    },
   jan:
   {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:colors.bc,
        justifyContent:'space-between'
    },
    border:
    {
        borderColor: colors.white,
        borderWidth: 1,
    },
    month:
    {
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-Regular',
        color:colors.white
    },
    border1:
    {
        borderColor: colors.textColor,
        borderStyle: 'dashed',
        borderWidth: .5,
        borderRadius:0.000001
    },
    container:
    {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:10,
        justifyContent:'space-between'
    },
    main:
    {
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    heading:
    {
        fontSize:fontSize.seventeen,
        color:colors.bc,
        marginBottom:15,
        fontFamily:'Montserrat-SemiBold'
    },
    item1:
    {
        fontSize:fontSize.fefteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    item2:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    result:
    {
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.fourteen,
        marginTop:20
    },
    search:
    {
        color:colors.white,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.fourteen
    },
    button:
    {
        backgroundColor:colors.bc,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        height:50
    },
    input:
    {
        borderWidth:1,
        height:40,
        borderRadius:10,
        paddingHorizontal:10,
        borderColor:colors.black,
        justifyContent:'center'
    },
    dummy:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    fdata:{
        color:colors.textColor,
        fontSize:fontSize.thirteen
    },
})
