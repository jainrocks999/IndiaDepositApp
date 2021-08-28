import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'#E5E5E5'
    },
    imageContainer:{
        alignItems:'center',
        marginTop:20
    },
    main:{
        alignItems:'center',
        paddingHorizontal:15,
        width:'100%',
        //paddingVertical:20
    },
    round:{
        width:115,
        height:115,
        backgroundColor:'#5A4392',
        borderRadius:57,
        justifyContent:'center',
        alignItems:'center'
    },
    heading:{
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
        alignContent:'center',
        textAlign:'center'
    },
    india:{
        fontFamily:'Montserrat-SemiBold', 
        color:colors.bc,
        fontSize:fontSize.twenty,
        marginTop:10
    },
    lorem:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10
    },
button:{
        height:45,
        width:'45%',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:colors.bc,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:30,
        alignItems:'center',
        width:'100%',
        marginTop:10,
        paddingHorizontal:16
    },
    text:{
        color:colors.white,
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-Normal'
    }
    
    
    
})