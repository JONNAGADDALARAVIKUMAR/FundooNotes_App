import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native';

export default class extends Component {
    navigateToLogInScreen = () => {
        this.props.navigation.navigate('LogIn')
    }
    render() {
        return (
            <View style = {{backgroundColor: '#dbb6c3', height: '100%'}}>
                <Text style = {{textAlignVertical: 'center', textAlign: 'center', marginTop: '50%'}}>
                    Page Under Development
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
                        <Text style = {{color: '#dbced2'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}