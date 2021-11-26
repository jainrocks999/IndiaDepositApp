import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor:colors.card,
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
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
    },
    button:{
        backgroundColor:colors.bc,
        borderRadius:15,
        justifyContent:'center',
        height:30,
        width:30,
        alignItems:'center'
    },
    container1:{
        width:'100%',
        height:40,
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        paddingRight:10,
    },
    blog:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'90%'
    },
    x:{
        marginRight:10,
        color:'#fff',
        marginLeft:10,
        marginBottom:3
    }
})