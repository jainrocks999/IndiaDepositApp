import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'#E5E5E5'
    },
    main:
    {
        paddingHorizontal:10,
        justifyContent:'center',
      //  alignItems:'center',
        marginTop:100
    },
    second:
    {
        width:'90%',
        height:40,
        borderWidth:1,
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:6,
        borderColor:colors.textColor
    },
    imageView:
    {
        justifyContent:'center',
        alignItems:'center',
        width:40,
        height:'100%',
        borderRightWidth:1
    },
    // input:{
    //     width:'87%',
    //     justifyContent:'center',
    //     alignItems:'flex-start',
    //     paddingHorizontal:10
    // },
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
    button:
    {
        width:'100%',
        paddingHorizontal:20,
        marginTop:15,
        marginBottom:20
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:0,
        marginTop:6
    },
    otp:
    {
        width: 50,
        height: 50,
        borderWidth: 2,
        color:colors.black,
        backgroundColor:colors.white,
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
    },
    titleCont:
    {
        justifyContent:'flex-start',
        width:'100%',
        paddingHorizontal:25
    },
    otpView:
    {
        justifyContent:'center',
        paddingHorizontal:15
    },
    enter:
    {
        fontFamily:'Montserrat-SemiBold',
        marginLeft:5,
        fontSize:fontSize.thirteen,
        color:colors.black
    },
    input:
    {
        width:'100%',
        marginTop:7,
        alignItems:'center'
    },
    textBottom:
    {
        paddingHorizontal:7,
        alignItems:'center'
    }  ,
    your:
    {
        color:colors.black,
        alignSelf:'center',
        alignContent:'center',
        textAlign:'center',
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.thirteen,
    },
    image:
    {
        width:'82%',
        height:75,
        resizeMode:'stretch'
    },
    imageContainer:
    {
        justifyContent:'space-between',
        marginTop:20,
        flexDirection:'row',
        paddingHorizontal:15
    },
    main:
    {
        paddingHorizontal:20,
        marginTop:50
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
})