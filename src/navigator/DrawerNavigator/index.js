import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import DrawerContent from '../../component/DrawerPage';
import AboutUs from '../../screen/Main/AboutUs';
import ContactUs from '../../screen/Main/ContactUs';
import Feedback from '../../screen/Main/Feedback';
import Settings from '../../screen/Main/Settings';
import UpdateProfile from '../../screen/Main/UpdateProfile';
import Dashboard from '../../screen/Main/Dashboard';
import ChangePassword from '../../screen/Auth/ChangePassword';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent/>}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
        <Drawer.Screen name="Feedback" component={Feedback} />
        <Drawer.Screen name="Change" component={ChangePassword}/>
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
    </Drawer.Navigator>
  );

}
export default MyDrawer;