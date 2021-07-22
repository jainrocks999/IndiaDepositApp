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
    <Drawer.Navigator
  
    drawerStyle={{width:'100%'}}
    drawerContent={() => <DrawerContent/>}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {/* <Drawer.Screen name="AboutUs" component={AboutUs} options={horizontalAnimation}/> */}
        <Drawer.Screen name="ContactUs" component={ContactUs} options={horizontalAnimation}/>
        {/* <Drawer.Screen name="Feedback" component={Feedback} options={horizontalAnimation}/> */}
        <Drawer.Screen name="Change" component={ChangePassword} options={horizontalAnimation}/>
        <Drawer.Screen name="Settings" component={Settings} options={horizontalAnimation}/>
        <Drawer.Screen name="UpdateProfile" component={UpdateProfile} options={horizontalAnimation}/>
    </Drawer.Navigator>
  );

}
export default MyDrawer;