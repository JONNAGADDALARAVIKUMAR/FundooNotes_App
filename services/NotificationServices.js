import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

class NotificationServices {
    async checkPermission() {
        //const enabled = await Firebase.messaging().hasPermission();
        const enabled = await messaging().hasPermission();
        console.log('permission enabled', enabled);
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
      
        //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log(fcmToken);
        if (!fcmToken) {
            let fcmToken = await messaging().getToken();
            console.log('Token', fcmToken);
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
      
        //2
    async requestPermission() {
        try {
            await messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
}

export default new NotificationServices