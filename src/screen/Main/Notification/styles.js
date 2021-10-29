import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor:colors.card,
    //paddingTop:Platform.OS=='android'?0:40
    },
    view1:
    {
        marginTop:15
    },
    view2:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text1:
    {
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.twelve
    },
    text2:
    {
        color:colors.bc,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Regular'
    },
    text3:
    {
        color:'grey',
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Regular'
    },
    line:
    {
        borderWidth:1,
        marginTop:15,
        borderColor:'#DDDDDD'
    },
    main:
    {
        paddingHorizontal:30,
        marginTop:50,
        marginBottom:20
    }, 
    // card:
    // {
    //     shadowColor:colors.black,
    //     shadowOpacity:0.25,
    //     shadowRadius:8,
    //     shadowOffset:{height:2,width:0},
    //     elevation:5,
    //     borderTopLeftRadius:10,
    //     borderTopRightRadius:10,
    //     backgroundColor:colors.white,
    //     marginHorizontal:15,
    //     paddingHorizontal:18,
    //     marginTop:20,
    //     height:'89%'
    // },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:colors.white,
        // marginBottom:40,
        paddingHorizontal:15,
    },
})