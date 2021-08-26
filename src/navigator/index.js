import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screen/Auth/SplashPage";
import LoginPage from '../screen/Auth/LoginPage';
import RegisterPage from '../screen/Auth/RegisterPage';
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
import Introduction from '../screen/Auth/Introduction';
import Main from './DrawerNavigator';
import AboutUs from '../screen/Main/AboutUs';
import Feedback from '../screen/Main/Feedback';
import Notification from '../screen/Main/Notification';
import BankLocator from '../screen/Main/BankLocator';
import Support from '../screen/Main/Support';
import Policy from '../screen/Main/PrivacyPolicy'
import LoginWithOtp from '../screen/Auth/LoginWithOtp';
import Referal from '../screen/Main/Referal';
import Profile from '../screen/Main/Profile';
import Calculator from '../screen/Main/Calculator';
import Contact from '../screen/Main/ContactUs'
import ChangePassword from '../screen/Auth/ChangePassword';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none" mode="modal" >
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={horizontalAnimation}/>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="LoginWithOtp" component={LoginWithOtp}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="Forget" component={ForgetPassword}/>
        <Stack.Screen name="Otp" component={OtpVarification}/>
        <Stack.Screen name="DashBoardPage" component={DashBoardPage}/>
        <Stack.Screen name="Manage" component={ManageNaminee}/>
        <Stack.Screen name="FDCalculator" component={FDCalculator} />
        <Stack.Screen name="FDSearch" component={FDSearch} options={horizontalAnimation}/>
        <Stack.Screen name="FDList" component={FDList}/>
        <Stack.Screen name="FDDetail" component={FDDetail}/>
        <Stack.Screen name="SBSearch" component={SBSearch}/>
        <Stack.Screen name="AccountList" component={AccountList}/>
        <Stack.Screen name="AccountDetail" component={AccountDetail}/>
        <Stack.Screen name="CompareFD" component={CompareFD}/>
        <Stack.Screen name="CompareSBAccount" component={CompareSBAccount}/>
        <Stack.Screen name="BuyNow" component={BuyNow} />
        <Stack.Screen name="Introduction" component={Introduction}/>
        <Stack.Screen name="Feedback" component={Feedback} options={horizontalAnimation}/>
        <Stack.Screen name="Notification" component={Notification}  options={horizontalAnimation}/>
        <Stack.Screen name="BankLocator" component={BankLocator} options={horizontalAnimation}/>
        <Stack.Screen name="Support" component={Support} options={horizontalAnimation}/>
        <Stack.Screen name="Policy" component={Policy} options={horizontalAnimation}/>
        <Stack.Screen name="Referal" component={Referal} options={horizontalAnimation}/>
        <Stack.Screen name="Profile" component={Profile} options={horizontalAnimation}/>
        <Stack.Screen name="Calculator" component={Calculator} options={horizontalAnimation}/>
        <Stack.Screen name="Contact" component ={Contact} options={horizontalAnimation}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={horizontalAnimation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
