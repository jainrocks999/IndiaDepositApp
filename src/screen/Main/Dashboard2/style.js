import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:171,
        marginHorizontal:15,
    },
    main:{
        width:182,
        height:90,
        paddingHorizontal:10,
        paddingVertical:10
    },
    touch:{
        width:84,
        height:25,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    border:{
        width:'100%',
        borderWidth:1,
        borderColor:'#DDDDDD'
    }

});