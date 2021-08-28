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
    main:
    {
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
    },
    button:
    {
        width:'100%',
        paddingHorizontal:20,
        marginTop:12,
        marginBottom:20
    },
    view1:
    {
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:14,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:0,
        marginTop:6
    },
    button1:
    {
        width:'45%',
        height:45,
        backgroundColor:colors.bc,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:
    {
        color:colors.white,
        fontFamily:'Montserrat-Normal',
        fontSize:fontSize.thirteen
    },
    con:
    {
        paddingHorizontal:20,
        width:'100%'
    },
    row:
    {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    input:
    {
        width:'90%',
        color:colors.textColor
    },
    warn:
    {
        fontSize:fontSize.fourteen,
        color:'red'
    },
    modalView:
    {
        width:'100%',
        height:'100%',
       // paddingHorizontal:10,
        alignItems:'center',
       // justifyContent:'center'
    },
    buton:
    {
        width:'100%',
        height:40,
        backgroundColor:colors.textColor,
        marginTop:25,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center'
    },
    came:
    {
        color:colors.white,
        fontFamily:'Montserrat-SemiBold',
        fontSize:fontSize.sixteen
    }
   
   
})