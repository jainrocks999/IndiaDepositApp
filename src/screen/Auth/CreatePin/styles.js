import {StyleSheet, Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  main: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  input1: {
    width: '100%',
    marginLeft: 5,
    paddingVertical: -10,
    color: colors.textColor,
  },
  warn: {
    fontSize: fontSize.twelve,
    color: 'red',
  },
  main: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  card: {
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
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
  button: {
    width: '100%',
    marginTop: 25,
    marginBottom: 20,
  },
  error: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginTop: 6,
  },
  round: {
    width: 115,
    height: 115,
    backgroundColor: colors.bc,
    borderRadius: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'space-between',
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});
