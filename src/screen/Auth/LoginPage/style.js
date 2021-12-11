import { StyleSheet ,Platform,} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:colors.card,
        height:'100%',
      //  paddingTop: Platform.OS === "android" ?0: 40

    },
   
    imageContainer:
    {
        alignItems:'center',
        marginTop:20,
    },
    round:
    {
        width:115,
        height:115,
        backgroundColor:colors.bc,
        borderRadius:57,
        justifyContent:'center',
        alignItems:'center'
    },
    input1:
    {
        width:'90%',
        marginLeft:Platform.OS=='android'?1:6,
        paddingVertical:-10,
        color:colors.textColor
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
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderWidth:1,
    },
    heading:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.heading
    },
    input:
    {
        alignItems:'center',
        flexDirection:'row',
        marginTop:-3
    },
    main:
    {
        paddingHorizontal:30,
        marginTop:50
    },
    button:
    {
        width:'100%',
        marginTop:Platform.OS=='android'?5:12
    },
    bottom:
    {
        flexDirection:'row',
        marginTop:8,
        alignItems:'center',
        justifyContent:'center'
    },
    account:
    {
        color:colors.textColor,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular'
    },
    account1:
    {
        color:colors.bc,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular'

    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:
    {
        fontSize:fontSize.twelve,
        color:'red'
    },
    OtpInput:
    {
        width:'100%',
        alignItems:'flex-start',
        marginTop:5
    },
    otp:
    {
        width: 50,
        height: 50,
        backgroundColor:colors.white,
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
    },
    view1:
    {
        width:'100%',
        marginTop:20
    },
    view2:
    {
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    view3:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text1:
    {
        marginLeft:4,
        color:colors.heading,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.thirteen
    },
    text2:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.bc
    },
    text3:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        marginLeft:Platform.OS=='android'?0:10
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        // borderWidth: 1,
        // borderColor:colors.bc,
        borderRadius:10,
        color:colors.textColor,
        backgroundColor:colors.white,
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        // borderRadius:10,
      },
    
      underlineStyleHighLighted: {
        borderColor: colors.bc
      },
   
})