import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card,
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        paddingVertical:10
    },
})