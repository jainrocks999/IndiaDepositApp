import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    },
   
    imageContainer:
    {
        alignItems:'center',
        marginTop:20
    },
    main:
    {
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
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
        borderRightWidth:1,
        borderRightColor:colors.textColor
    },
    input:
    {
        width:'87%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:10
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
        fontSize:fontSize.twenty,
    },
    // button:{
    //     width:'100%',
    //     paddingHorizontal:20,
    //     marginTop:20,
    //     marginBottom:20
    // },
    // error:{
    //     width:'90%',
    //     justifyContent:'center',
    //     alignItems:'flex-start',
    //     paddingHorizontal:0,
    //     marginTop:6
    // },
    input1:
    {
        width:'90%',
        marginLeft:11,
        paddingVertical:-10,
        color:colors.textColor
    },
    warn:
    {
        fontSize:fontSize.fourteen,
        color:'red'
    },
    main:
    {
        paddingHorizontal:30,
        marginTop:50
    },
    round:
    {
        width:115,
        height:115,
        backgroundColor:'#5A4392',
        borderRadius:57,
        justifyContent:'center',
        alignItems:'center'
    },

    // input1:{
    //     width:'90%',
    //     marginLeft:11,
    //     paddingVertical:-10,
    //     color:colors.textColor
    // },
    card:
    { 
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderWidth:1,
    },
    heading:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Normal',
        color:colors.heading
    },
    input:
    {
        alignItems:'center',
        flexDirection:'row',
        marginTop:-3
    },
    button:
    {
        width:'100%',
        marginTop:15,
        marginBottom:20
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },

   
})