import React from "react";
import { View,Text } from "react-native";
import FlashMessage from "react-native-flash-message";

function App() {
  return (
    <View style={{ flex: 1 }}>
     <Text style ={{color:'red'}}>Tis is iworking fine</Text>
      <FlashMessage position="top" duration={5000} />
    </View>
  );
}
export default App;