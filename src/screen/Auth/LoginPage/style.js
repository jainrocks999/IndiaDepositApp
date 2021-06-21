import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    },
   
    imageContainer:{
        alignItems:'center',
        marginTop:20
    },
    main:{
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },
    second:{
        width:'90%',
        height:40,
        borderWidth:1,
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:6,
        borderColor:colors.textColor
    },
    imageView:{
        justifyContent:'center',
        alignItems:'center',
        width:40,
        height:'100%',
        borderRightWidth:1,
        borderRightColor:colors.textColor
    },
    input:{
        width:'87%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:10
    },
    textView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:60
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:22
    },
    main1:{
        height:40,
        width:'92%',
        flexDirection:'row',
       // paddingHorizontal:12,
        alignItems:'center',
        justifyContent:'space-between'
    },
    check:{
        flexDirection:'row',
        alignItems:'center',
       // paddingHorizontal:13,
       
    },
    keep:{
        color:colors.textColor,
        fontSize:11
    },
    forgot:{
        marginRight:5,
        color:colors.textColor,
        fontSize:11
    },
    button:{
        width:'100%',
        paddingHorizontal:20,
        marginTop:7
    },
    bottom:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    },
    account:{
        color:colors.textColor,
        fontSize:13
    },
    image:{
        width:'82%',
        height:75,
        resizeMode:'stretch'
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:0,
        marginTop:6
    },
    input1:{
        width:'100%',
        color:colors.textColor
    },
    image1:{
        height:13,
        width:19
    },
    text1:{
        fontSize:14,
        color:'red'
    }
   
})