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
        marginTop:50
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
        marginTop:30
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:22
    },
    button:{
        width:'100%',
        paddingHorizontal:20,
        marginTop:20,
        marginBottom:20
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
    warn:{
        fontSize:14,
        color:'red'
    }

   
})