import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:'#E5E5E5'
    },
    view1:{paddingHorizontal:15,paddingVertical:20},
    view2:{ marginTop:13 },
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
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:40,
    },
    how:{
        color:colors.textColor,
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        marginTop:20
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