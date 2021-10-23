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
import BlogCategory from '../screen/Main/BlogCategory';
import StoryCategory from '../screen/Main/StoryCategory';
import ForgotOtp from '../screen/Auth/ForgotOtp';
import CreatePin from '../screen/Auth/CreatePin';
import UpdateProfile from '../screen/Main/UpdateProfile';
import {navigationRef } from './rootNavigation';
import BankDetail from '../screen/Main/BankSection/BankDetail';
import AddBank from '../screen/Main/BankSection/AddBank';
import EditUserBank from '../screen/Main/BankSection/EditUserBank';
import NomineeList from '../screen/Main/BankSection/NomineeList';
import AddNominee from '../screen/Main/BankSection/AddNominee';
import EditNominee from '../screen/Main/BankSection/EditNominee';
import FDFilter from '../screen/Main/FDFilter';
import SBFilter from '../screen/Main/SBFilter';
import UserSelection from '../screen/Main/NBFCPage/UserSelection';
import AddFamily from '../screen/Main/BankSection/AddFamily';
import EditFamily from '../screen/Main/BankSection/EditFamily';
import FDView from '../screen/Main/FDView';
import BankCalu from "../screen/Main/NBFCFDdetails";

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
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen name="BlogCategory" component ={BlogCategory} options={horizontalAnimation}/>
        <Stack.Screen name="StoryCategory" component={StoryCategory} options={horizontalAnimation}/>
        <Stack.Screen name="ForgotOtp" component={ForgotOtp}/>
        <Stack.Screen name="CreatePin" component={CreatePin}/>
        <Stack.Screen name="UpdateProfile"component={UpdateProfile} options={horizontalAnimation}/>
        <Stack.Screen name="BankDetail" component={BankDetail}/>
        <Stack.Screen name="AddBank" component={AddBank}/>
        <Stack.Screen name="EditUserBank" component={EditUserBank}/>
        <Stack.Screen name="NomineeList" component={NomineeList}/>
        <Stack.Screen name="AddNominee" component={AddNominee}/>
        <Stack.Screen name="EditNominee" component={EditNominee}/>
        <Stack.Screen name="FDFilter" component={FDFilter} options={horizontalAnimation}/>
        <Stack.Screen name="SBFilter" component={SBFilter} options={horizontalAnimation}/>
        <Stack.Screen name="UserSelection" component={UserSelection}/>
        <Stack.Screen name="AddFamily" component={AddFamily}/>
        <Stack.Screen name="EditFamily" component={EditFamily}/>
        <Stack.Screen name="FDView" component={FDView}/>
        <Stack.Screen name="BankCalu" component={BankCalu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
