import {StyleSheet, Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#E5E5E5',
    height: '100%',
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  round: {
    width: 115,
    height: 115,
    backgroundColor: '#5A4392',
    borderRadius: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input1: {
    width: '90%',
    marginLeft: 1,
    paddingVertical: -10,
    color: colors.textColor,
  },
  input2: {
    marginLeft: 1,
    color: colors.textColor,
    paddingVertical: -10,
    width: 50,
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  card1: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    borderRadius: 10,
    backgroundColor: 'white',

    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.bc,
  },
  heading: {
    fontSize: fontSize.thirteen,
    fontFamily: 'Montserrat-Regular',
    color: colors.heading,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -3,
  },
  main: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  button: {
    width: '100%',
    marginTop: 5,
    // marginBottom:20
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  account: {
    color: colors.textColor,
    fontSize: fontSize.thirteen,
  },
  account1: {
    color: colors.bc,
    fontSize: fontSize.thirteen,
  },
  error: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginTop: 6,
  },
  warn: {
    fontSize: fontSize.twelve,
    color: 'red',
  },
  agree: {
    fontSize: fontSize.twelve,
    fontFamily: 'Montserrat-Regular',
    color: colors.textColor,
    marginLeft: Platform.OS == 'android' ? 0 : 10,
    width: '90%',
  },
  agree1: {
    fontSize: fontSize.twelve,
    fontFamily: 'Montserrat-Regular',
    color: colors.bc,
  },
  text1: {
    fontSize: fontSize.fourteen,
    color: 'red',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view1: {
    width: '47%',
  },
  image: {
    width: 24,
    height: 24,
  },
  cross: {
    backgroundColor: colors.bc,
    borderRadius: 30,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  x: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginBottom: 5,
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#303030',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});
