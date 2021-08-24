import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../../component/DrawerPage';
import Dashboard from '../../screen/Main/Dashboard';
import Trending from '../../screen/Main/Trending'
import BankHoliday from '../../screen/Main/BankHoliday';
import KnowledgeCenter from '../../screen/Main/KnowledgeCenter';
const Drawer = createDrawerNavigator();
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
        <Drawer.Screen name="Trending" component={Trending} />
        <Drawer.Screen name="BankHoliday" component={BankHoliday}/>
        <Drawer.Screen name="KnowledgeCenter" component ={KnowledgeCenter}/>
    </Drawer.Navigator>
  );

}
export default MyDrawer;