import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LogInScreen';
import SignUpScreen from '../components/SignUpScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import { View } from 'react-native';
import DrawerStack from '../components/Drawer/DrawerStack'; 
import AddNewNotes from '../components/AddNewNotesScreen';


const Stack = createStackNavigator()

const ApplicationStack = () => {
    return (
        <View style = {{height: '100%'}}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "LogIn" screenOptions = {{headerShown : false}}>
                <Stack.Screen name = "LogIn" component = {LoginScreen} Action = {'Reset'}/>
                <Stack.Screen name = "SignUp" component = {SignUpScreen}/>
                <Stack.Screen name = 'ForgotPassword' component = {ForgotPasswordScreen}/>
                <Stack.Screen name = 'Home' component = {DrawerStack}/>
                <Stack.Screen name = 'AddNewNotes' component = {AddNewNotes}/>
            </Stack.Navigator>
        </NavigationContainer>
        </View>
    )
}

export default ApplicationStack;