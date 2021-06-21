
import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    },
    main:{
        paddingHorizontal:30,
        marginTop:'40%'
    },
   
   
    input:{
        marginTop:15,
        borderWidth:1,
        borderColor:colors.textColor,
        borderRadius:6,
        height:40,
        paddingHorizontal:10,
        justifyContent:'center'
    },
    interest:{
        marginTop:15,
        borderWidth:1,
        borderColor:colors.textColor,
        borderRadius:6,
        height:40,
        paddingHorizontal:10,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    container1:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15
    },
    same:{
        width:'47%',
        borderWidth:1,
        height:40,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:8
    },
    input1:{
        height:40,
        width:'90%',
        fontSize:13,
        color:colors.textColor
    },
    
})