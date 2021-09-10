import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        // paddingVertical:20,
        marginTop:20,
        height:'100%'
    }, 
    title:{
      fontSize:fontSize.eleven,
      fontFamily:'Montserrat-SemiBold' ,
    }
    
})