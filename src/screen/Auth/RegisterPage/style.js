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
        marginLeft:11,
        paddingVertical:-10,
        color:colors.textColor
    },
    input2:{
        width:'90%',
        marginLeft:11,
        color:colors.textColor,
        paddingVertical:-10,
    },
    card: { 
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderWidth:1,
    },
    card1: { 
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
       
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderWidth:1,
        borderColor:colors.bc,
      
    },
    heading:{
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Normal',
        color:colors.heading
    },
    input:{
        alignItems:'center',
        flexDirection:'row',
        marginTop:-3
    },
    main:{
        paddingHorizontal:30,
        marginTop:50
    },
    button:{
        width:'100%',
        marginTop:5,
       // marginBottom:20
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
        fontSize:fontSize.thirteen
    },
    account1:{
        color:'#3D4785',
        fontSize:fontSize.thirteen
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:{
        fontSize:fontSize.twelve,
        color:'red'
    },
    agree:{
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    }
})