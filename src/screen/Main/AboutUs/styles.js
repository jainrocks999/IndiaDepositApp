import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    },
    imageContainer:{
        alignItems:'center',
        marginTop:20
    }, 
    textView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:24
    },
    logo:{
        width:'80%',
        height:75,
        resizeMode:'stretch'
    },
    main:{
        paddingHorizontal:30,
        marginTop:50,
        marginBottom:20
    },
    heading:{
        fontSize:18,
        color:colors.textColor,
        fontFamily:'Montserrat-Normal'
    },
    normal:{
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
        marginTop:10
    },
    
    
   
    
})