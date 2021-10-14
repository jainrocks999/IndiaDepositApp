import React from "react";
import { StatusBar } from "react-native";
import colors from "../colors";

export default (Status) => {
  return <StatusBar  barStyle="default" backgroundColor={colors.bc} />;
};
