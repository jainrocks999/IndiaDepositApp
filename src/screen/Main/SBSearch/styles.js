
import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:'#E5E5E5'
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
        marginBottom:40
    },
    input:{
        marginTop:-8,
        borderBottomWidth:1.5,
        borderColor:'#3D4785',
        borderRadius:6,
        height:40,
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
    ten:{
        height:40,
        width:'99%',
        fontSize:13,
        color:colors.textColor
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:-5,
        marginTop:10
    },
    image:{
        marginTop:16,
        marginRight:8
    }
    
})