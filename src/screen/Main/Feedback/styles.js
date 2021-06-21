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
        marginTop:50
    },
    how:{
        color:colors.textColor,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    star:{
        alignItems:'flex-start',
        marginLeft:-8,
        marginTop:13
    },
    what:{
        color:colors.textColor,
        marginTop:13,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    drop:{
        marginTop:13 ,
        borderWidth:1,
        height:35,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
    },
    better:{
        color:colors.textColor,
        marginTop:13,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    bottom:{
        height:60,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:10,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flex:1
    },
    input:{
        width:'100%',
        color:colors.textColor,
    },
    bottomView:{
        marginTop:18,
        marginBottom:20
    }
    
   
    
})