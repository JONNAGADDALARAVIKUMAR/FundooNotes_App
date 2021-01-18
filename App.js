import React, { Component } from 'react';
import ApplicationStack from './src/route/ApplicationStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import NotificationServices from './services/NotificationServices/NotificationServices';
import PushNotification from "react-native-push-notification";
import { AppState } from "react-native";
import BackgroundTimer from 'react-native-background-timer';

class App extends Component {
    state = {
        appState: AppState.currentState
    }

    componentDidMount = async () => {
        await AppState.addEventListener("change", this.handleAppStateChange);
        NotificationServices.checkPermission()
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
              alert(notification.title + '\n' + notification.message)
              //alert(notification.message)
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

        BackgroundTimer.setInterval(() => {
            NotificationServices.checkRemaindersSendPushNotification()
        }, 60000)
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
        startService(new Intent(this, NotificationService.class));
    }

    handleAppStateChange = async nextAppState => {
        if(this.state.appState.match(/inactive|background/) &&
            nextAppState === "active") {
              console.log("App has come to the foreground!");
        }
        await this.setState({ appState: nextAppState });
        console.log(this.state.appState);
    };

    render() {
      return (
        <Provider store = {store}>
          <ApplicationStack/>
        </Provider>
    )};
}
export default App;
