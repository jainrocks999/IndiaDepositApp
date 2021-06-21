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
        width:'82%',
        height:75,
        resizeMode:'stretch'
    },
    button:{width:70,
        height:24,
        borderRadius:6,
        borderWidth:1,
        borderColor:colors.textColor,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:8
    },
    num:{
        color:colors.textColor,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    toll:{
        fontSize:18,
        color:colors.textColor,
        fontFamily:'Montserrat-Medium'
    },
    call:{
        marginLeft:5,
        color:colors.textColor,
        fontFamily:'Montserrat-Medium',
        fontSize:12
    },
    line:{
        borderTopWidth:1,
        marginTop:20,
        borderTopColor:colors.textColor
    },
    main:{
        marginTop:20,
        paddingHorizontal:30
    },
    container1:{
        flexDirection:'row',
        alignItems:'center'
    },
    fb: {
        width:24,
        height:24,
        borderRadius:12,
        backgroundColor:colors.textColor,
        alignItems:'center',
        justifyContent:'center'
    },
    india:{
        color:colors.textColor,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    input:{  
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:14,
        
    },
    input1:{  
        width:'100%',
        height:100,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:14,
        
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:0,
        marginTop:6
    },
    header:{
        marginTop:50,
        paddingHorizontal:30
    },
    image:{height:11,width:11},
    warn:{fontSize:14,color:'red'},
    bottom:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
   
    
})