import React from 'react';
import {  View} from 'react-native';
import MyDrawer from "../../navigator/DrawerNavigator/index";

const DrawerContent=()=>{
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
           
       <MyDrawer/>
      </View>
    )
}
export default DrawerContent;