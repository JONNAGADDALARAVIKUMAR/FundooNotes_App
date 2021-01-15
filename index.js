/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotificationServices from './services/NotificationServices/NotificationServices'

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('NotificationServices.checkRemaindersSendPushNotification', () => NotificationServices.checkRemaindersSendPushNotification());
