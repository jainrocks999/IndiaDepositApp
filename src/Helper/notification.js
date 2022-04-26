import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
   
    getFcmTocken();
  }
}
const getFcmTocken = async () => {
  let cheackToken = await AsyncStorage.getItem('fcmTocken')
 
  if (!cheackToken) {
    try {
      const fcmTocken = await messaging().getToken()
      if (!!fcmTocken) {
      
        await AsyncStorage.setItem('fcmTocken', fcmTocken)
      }
    } catch (error) {
     
      alert(error?.message)

    }
  }

}