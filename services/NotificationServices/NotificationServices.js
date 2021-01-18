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
      .then(async results => {
        for(let i = 0; i < results.rows.length; i++) {
          if(moment(JSON.parse(results.rows.item(i).remainderTime)).format('D MMM, h.mm a') == moment(new Date()).format('D MMM, h.mm a')) {
              this.sendLoaclNotification(results.rows.item(i).Title, results.rows.item(i).Notes)
          }
        }
      })
    }

    sendLoaclNotification = (title, notes) => {
      let data = {
        title : 'Title: ' + title,
        message : 'Note: ' + notes
      }
      PushNotification.localNotification(data);
    }
}

export default new NotificationServices