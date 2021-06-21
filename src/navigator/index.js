import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screen/Auth/SplashPage";
import LoginPage from '../screen/Auth/LoginPage';
import RegisterPage from '../screen/Auth/RegisterPage';
import ChangePassword from '../screen/Auth/ChangePassword';
import ForgetPassword from '../screen/Auth/ForgetPassword';
import OtpVarification from '../screen/Auth/OtpVarification';
import DashBoardPage from '../screen/DashBoardPage';
import ManageNaminee from '../screen/Main/ManageNaminee';
import FDCalculator from '../screen/Main/FDCalculator';
import FDSearch from '../screen/Main/FDSearch';
import FDList from '../screen/Main/FDList';
import FDDetail from '../screen/Main/FDDetail';
import SBSearch from '../screen/Main/SBSearch';
import AccountList from '../screen/Main/AccountList';
import AccountDetail from '../screen/Main/AccountDetail';
import CompareFD from '../screen/Main/CompareFD';
import CompareSBAccount from '../screen/Main/CompareSBAccount';
import BuyNow from '../screen/Main/BuyNow';
const Stack = createStackNavigator();
function Navigate() {
  return (
    //InitialPages
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="Forget" component={ForgetPassword}/>
        <Stack.Screen name="Otp" component={OtpVarification}/>
        <Stack.Screen name="DashBoardPage" component={DashBoardPage}/>
        <Stack.Screen name="Manage" component={ManageNaminee}/>
        <Stack.Screen name="FDCalculator" component={FDCalculator} />
        <Stack.Screen name="FDSearch" component={FDSearch}/>
        <Stack.Screen name="FDList" component={FDList}/>
        <Stack.Screen name="FDDetail" component={FDDetail}/>
        <Stack.Screen name="SBSearch" component={SBSearch}/>
        <Stack.Screen name="AccountList" component={AccountList}/>
        <Stack.Screen name="AccountDetail" component={AccountDetail}/>
        <Stack.Screen name="CompareFD" component={CompareFD}/>
        <Stack.Screen name="CompareSBAccount" component={CompareSBAccount}/>
        <Stack.Screen name="BuyNow" component={BuyNow}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
