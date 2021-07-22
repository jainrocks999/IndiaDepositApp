import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'#E5E5E5'
    },
   
    imageContainer:{
        alignItems:'center',
        marginTop:20,
    },
    round:{
        width:115,
        height:115,
        backgroundColor:'#5A4392',
        borderRadius:57,
        justifyContent:'center',
        alignItems:'center'
    },
    input1:{
        width:'90%',
        marginLeft:11

    },
    card: { 
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        height:60,
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10
    },
    heading:{
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        color:'#777777'
    },
    input:{
        marginTop:-14,
        flexDirection:'row',
        alignItems:'center'
    },
    main:{
        paddingHorizontal:20,
        marginTop:50
    },
    button:{
        width:'100%',
        marginTop:15
    },
    bottom:{
        flexDirection:'row',
        marginTop:8,
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center'
    },
    account:{
        color:colors.textColor,
        fontSize:13
    },
    account1:{
        color:'#3D4785',
        fontSize:13
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:0,
        marginTop:6
    },
    warn:{
        fontSize:14,
        color:'red'
    },
})