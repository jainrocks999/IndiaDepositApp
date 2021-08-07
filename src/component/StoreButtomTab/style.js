import { Dimensions, StyleSheet } from 'react-native';
import colors from '../colors';
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 10,
    paddingVertical:10,
  },

  itemSeperator: {
    borderBottomWidth: 0.5,
    borderColor: '#C1C1C1',
    width: '50%',
  },
  bottomTab: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
  bottomTab1: {
    height: 40,
    width: 40,
  },
  buttonText: {
    fontSize: 10,
    alignSelf: 'center',
    width: 90,
    padding: 4,
    textAlign: 'center',
  },
  text:{
    fontSize: 10,
    color:colors.textColor,
    fontFamily:'Poppins-SemiBold',
    marginTop:5
  },
  container:{
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center'
  }
});
