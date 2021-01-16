import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import SQLiteStorageServices from '../SQLiteStorageServices';
import PushNotification from "react-native-push-notification";
import moment from 'moment';

class NotificationServices {
    async checkPermission() {
        const enabled = await messaging().hasPermission();
        console.log('permission enabled', enabled);
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            let fcmToken = await messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
      
    async requestPermission() {
        try {
            await messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }

    checkRemaindersSendPushNotification = () => {
      SQLiteStorageServices.getDetailsFromSQLiteDatabase()
      .then(results => {
        for(let i = 0; i < results.rows.length; i++) {
          let remainderTime = results.rows.item(i).remainderTime
          if(moment(JSON.parse(results.rows.item(i).remainderTime)).format('D MMM, h.mm a') == moment(new Date()).format('D MMM, h.mm a')) {
            //this.sendLoaclNotification(results.rows.item(i).Title, results.rows.item(i).Notes)
            this.sendPushNotification(results.rows.item(i).Title, results.rows.item(i).Notes)
          }
        }
      })
    }

    sendPushNotification = async (title, notes) => {
        const token = await AsyncStorage.getItem('fcmToken');
        const FIREBASE_API_KEY = "AAAAWTpyaUw:APA91bGtbgi79YUSorlJxEHGqfLX61SjB-jkqajDGejBJ4r6YAOmECOgEZEK1Ueux5uHnDVZY_vN16rpmQQMfz9kF3MyeBly6D_DNVuE0lYIgwPiy-xave9cSO2kyZNVCOTPrvFFHXt-"
        const message = {
          registration_ids: [
             token
            ],
          notification: {
            title: 'Title: ' + title,
            body: 'Notes: ' + notes,
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
          },
          data: {
            title: 'Title: ' + title,
            body: 'Notes: ' + notes,
          },
        }
    
        let response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + FIREBASE_API_KEY,
          },
          body: JSON.stringify(message),
        })
        //response = await response.json()
      }

      sendLoaclNotification = (title, notes) => {
        PushNotification.localNotification({
          title : title,
          message : notes
        });
      }
}

export default new NotificationServices