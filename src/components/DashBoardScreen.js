import React, { Component } from 'react'
import {View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../languages/Languages'

export default class extends Component {
    
    navigateToLogInScreen = async () => {
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        } catch (e) {
            console.log(e);
        }
        this.props.navigation.navigate('LogIn')
    }
    render() {
        return (
            <View>
                <ScrollView>
                <ImageBackground source = {require('../assets/backGround.jpg')}
                style = {{height: 670, width: 360}}>
                <Text 
                    style = {{textAlignVertical: 'center', 
                                textAlign: 'center', 
                                marginTop: '80%', 
                                color: '#912c4c', 
                                fontSize: 30
                            }}>
                    {strings.ScreenUnderDevelopment}
                </Text>
                <TouchableOpacity
                    style = {{marginRight: '20%',
                                marginLeft: '20%',
                                marginTop: '20%',
                                backgroundColor: '#912c4c',
                                alignItems: 'center',
                                height: 50,
                                borderRadius: 10,
                                justifyContent: 'space-around'
                    }}
                        onPress = {this.navigateToLogInScreen}>
                        <Text style = {{color: '#dbced2'}}>{strings.LogOut}</Text>
                </TouchableOpacity>
                </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}