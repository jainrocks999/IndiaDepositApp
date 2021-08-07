import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:'#E5E5E5'
    },
    main:{
        paddingHorizontal:30,
        marginTop:50,
        marginBottom:20
    }, 
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'white',
        marginHorizontal:15,
        paddingVertical:18,
        //paddingHorizontal:20,
        marginTop:-32,
        height:'100%'
    },
    pfile:{
        width:'100%',
        height:254,
        backgroundColor:'#B2B2F9',
        alignItems:'center',
        justifyContent:'center',
       
    },
    round:{
        width:56,
        borderWidth:2,
        height:56,
        borderRadius:28,
        borderColor:'#5A4392',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        color:'#5A4392'
    }
})