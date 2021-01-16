import React, { Component } from 'react';
import ApplicationStack from './src/route/ApplicationStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import NotificationServices from './services/NotificationServices/NotificationServices';
import PushNotification from "react-native-push-notification";
import { AppState } from "react-native";

class App extends Component {
    state = {
        appState: AppState.currentState
    }

    componentDidMount = () => {
        AppState.addEventListener("change", this.handleAppStateChange);
        NotificationServices.checkPermission()
        //NotificationServices.checkRemaindersSendPushNotification()
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
              alert(notification.data.title + '\n' + notification.data.body)
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

        setInterval(() => {
            NotificationServices.checkRemaindersSendPushNotification()
        }, 60000)
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if(this.state.appState.match(/inactive|background/) &&
            nextAppState === "active") {
              console.log("App has come to the foreground!");
        }
        this.setState({ appState: nextAppState });
    };

    render() {
      return (
        <Provider store = {store}>
          <ApplicationStack/>
        </Provider>
    )};
}
export default App;
