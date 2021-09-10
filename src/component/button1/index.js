import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../colors";
import fontSize from "../fontSize";
const CustomButton1 = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "100%",
    height:50,
    backgroundColor:colors.bc,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:30,
  },
  buttonText: {
    alignSelf: "center",
    color: colors.white,
    fontFamily:'Montserrat-SemiBold',
    fontSize:fontSize.fourteen,
  },
});

export default CustomButton1;
