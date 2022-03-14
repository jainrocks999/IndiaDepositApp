import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmTocken();
  }
}
const getFcmTocken = async () => {
  let cheackToken = await AsyncStorage.getItem('fcmTocken')
  console.log("old Token here", cheackToken);
  if (!cheackToken) {
    try {
      const fcmTocken = await messaging().getToken()
      if (!!fcmTocken) {
        console.log("Fcm tocken generated", fcmTocken);
        await AsyncStorage.setItem('fcmTocken', fcmTocken)
      }
    } catch (error) {
      console.log("Eorror is Fcm Tocken", error);
      alert(error?.message)

    }
  }

}