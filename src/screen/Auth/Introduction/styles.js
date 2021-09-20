import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
flex: 1,
    backgroundColor:'#E5E5E5'
    },
    imageContainer:
    {
        alignItems:'center',
        marginTop:20
    },
    main:
    {
        alignItems:'center',
        paddingHorizontal:15,
        width:'100%',
        bottom:20,
        position:'absolute',
        left:0,
        right:0,
        flex:1
    },
    round:
    {
        width:115,
        height:115,
        backgroundColor:'#5A4392',
        borderRadius:57,
        justifyContent:'center',
        alignItems:'center'
    },
    heading:
    {
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
        alignContent:'center',
        textAlign:'center'
    },
    india:
    {
        fontFamily:'Montserrat-SemiBold', 
        color:colors.bc,
        fontSize:fontSize.twenty,
        marginTop:10
    },
    lorem:
    {
        
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        paddingHorizontal:15
    },
button:
{
        height:45,
        width:'47%',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:colors.bc,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        //marginBottom:30,
        alignItems:'center',
        width:'100%',
        marginTop:10,
        paddingHorizontal:16,
        
    },
    text:
    {
        color:colors.white,
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-Normal'
    },
    view:
    {
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        width:'100%',
        height:275,
        padding:10,
        
    },
    img:
    {
        width:'90%',
        height:'100%'
    },
    
    
    
})