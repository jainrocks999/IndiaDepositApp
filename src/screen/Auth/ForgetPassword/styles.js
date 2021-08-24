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
        justifyContent:'space-between',
        marginTop:20,
        flexDirection:'row',
        paddingHorizontal:15
    },
    main:{
        paddingHorizontal:30,
        marginTop:50
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
    heading:{
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        color:'#777777'
    },
    input:{
        alignItems:'center',
        flexDirection:'row',
        marginTop:-3
    },
    button:{
        width:'100%',
        marginTop:15,
        marginBottom:20
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
   
   
})