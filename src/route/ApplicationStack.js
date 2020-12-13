import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LogInScreen';
import SignUpScreen from '../components/SignUpScreen';
import ScreenAfterLogIn from '../components/ScreenAfterLogIn'

const Stack = createStackNavigator();

const ApplicationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "LogIn" LoginScreen = {{headerShown : false}}>
                <Stack.Screen name = "LogIn" component = {LoginScreen}/>
                <Stack.Screen name = "SignUp" component = {SignUpScreen}/>
                <Stack.Screen name = 'AfterLoggingIn' component = {ScreenAfterLogIn}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;