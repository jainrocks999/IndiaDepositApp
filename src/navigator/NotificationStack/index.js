import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from '../../screen/Main/Notification';



const Stack = createStackNavigator();
function Navigate() {

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    //InitialPages
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Notification" component={Notification}/>
      </Stack.Navigator>
  );
}
export default Navigate;
