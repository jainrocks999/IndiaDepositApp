import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor:colors.card
    },
    imageContainer:
    {
        alignItems:'center',
        marginTop:20
    }, 
    textView:
    {
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    text:
    {
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:fontSize.twenty
    },
    logo:
    {
        width:'82%',
        height:75,
        resizeMode:'stretch'
    },
    button:
    {
        width:70,
        height:24,
        borderRadius:6,
        borderWidth:1,
        borderColor:colors.textColor,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:8
    },
    num:
    {
        color:colors.textColor,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular'
    },
    view:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    view1:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    view2:{
        flexDirection:'row',
        width:'50%',
        alignItems:'center'
    },
   
    text1:{
        marginLeft:10,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.thirteen
    },

    toll:
    {
        fontSize:fontSize.seventeen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    call:
    {
        marginLeft:5,
        color:colors.bc,
        fontFamily:'Montserrat-Medium',
        fontSize:fontSize.twelve
    },
    line:
    {
        borderTopWidth:1,
        marginTop:20,
        borderTopColor:'#DDDDDD'
    },
    main:
    {
        marginTop:20,
        paddingHorizontal:20
    },
    container1:
    {
        flexDirection:'row',
        alignItems:'center'
    },
    fb: 
    {
        width:24,
        height:24,
        borderRadius:12,
        backgroundColor:colors.bc,
        alignItems:'center',
        justifyContent:'center'
    },
    india:
    {
        color:colors.textColor,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular'
    },
    input:
    {  
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:14,
        
    },
    input1:
    {  
        // width:'100%',
        // height:100,
        // borderWidth:1,
        // borderRadius:6,
        // borderColor:colors.textColor,
        // paddingHorizontal:14,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:14,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flex:1
        
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:10,
        marginTop:6
    },
    header:
    {
        marginTop:30,
        paddingHorizontal:20
    },
    image:
    {
        height:11,
        width:11
    },
    warn:
    {
        fontSize:fontSize.twelve,
        color:'red'
    },
    
    bottom:
    {
        marginTop:15,
    },
    card:
    { 
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:colors.white,
        marginBottom:40
    }
   
    
})