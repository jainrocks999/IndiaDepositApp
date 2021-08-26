import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    },
   
    view:{marginTop:20},
    imageContainer:{
        alignItems:'center',
        marginTop:20
    },
    main:{
        paddingHorizontal:20,
        justifyContent:'center',
        marginTop:50
    },
   
    textView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:fontSize.twenty
    },
    first:{
        flexDirection:'row',
        paddingHorizontal:29,
        alignItems:'center'
    },
    personal:{
        marginLeft:14,
        fontFamily:'Montserrat-Normal',
        fontSize:fontSize.fourteen,
        color:colors.textColor
    },
    border:{
        width:'100%',
        borderWidth:1/2,
        marginTop:10,
        borderColor:colors.textColor
    }
   
   
   
})