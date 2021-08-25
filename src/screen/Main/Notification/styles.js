import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:'#E5E5E5'
    },
    view1:{marginTop:15},
    view2:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
    text1:{fontFamily:'Montserrat-Normal'},
    text2:{color:colors.bc,fontSize:12,fontFamily:'Montserrat-Normal'},
    text3:{color:'grey',fontSize:12,fontFamily:'Montserrat-Normal'},
    line:{borderWidth:1,marginTop:15,borderColor:'#DDDDDD'},
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
        paddingHorizontal:18,
        marginTop:20,
        height:'89%'
    },
})