import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor:colors.card
    },
    card:{
        // shadowColor:'black',
        // shadowOpacity:0.25,
        // shadowRadius:8,
        // shadowOffset:{height:2,width:0},
        // elevation:5,
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10,
        // backgroundColor:'white',
        // marginHorizontal:15,
         paddingHorizontal:18,
         paddingVertical:20,
        // marginTop:20,
        // flex:1
        // card:{ 
            shadowColor:colors.black,
            shadowOpacity:0.25,
            shadowRadius:4,
            shadowOffset:{height:2,width:0},
            elevation:2,
            borderRadius:10,
            backgroundColor:colors.white,
            marginBottom:70
        // }
        // height:'70%'
    },
    
    heading:{
        fontSize:fontSize.eighteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    normal:{
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        marginTop:10
    },
    
   buttomview:{
       bottom:0,
       position:'absolute',
       left:0,right:0}, 
   
    
})