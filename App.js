import React, { Component } from 'react';
import ApplicationStack from './src/route/ApplicationStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import NotificationServices from './services/NotificationServices/NotificationServices';
import PushNotification from "react-native-push-notification";
import { AppRegistry } from 'react-native';

const NotificationTask = async (data) => {
  console.log('Ravi');
}
AppRegistry.registerHeadlessTask('NotificationTask', () => NotificationTask);


class App extends Component {

componentDidMount = () => {
  NotificationServices.checkPermission()
  PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      alert(notification.data.title + '\n' + notification.data.body)
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
        console.error(err.message, err);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}

render(){
  return (
    <Provider store = {store}>
      <ApplicationStack/>
    </Provider>
  )};
}
export default App;
