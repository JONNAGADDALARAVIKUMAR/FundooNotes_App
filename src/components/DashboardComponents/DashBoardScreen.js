import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import ToolBar from './ToolBar';
import BottomBar from './BottomBar';

export default class extends Component {
    constructor() {
        super();

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };
    
        this.state = {
            changeLayout: false,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };
    
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    navigateToLogInScreen = async () => {
        const {onPress} = this.props
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        } catch (e) {
            console.log(e);
        }
        this.props.navigation.navigate('LogIn')
        //onPress()
    }

    render() {
        return (
            <View style = {{backgroundColor: '#f2d5e5', height: '100%'}}>
                <ToolBar navigation = {this.props.navigation}/>
                <ScrollView style = {{marginTop: 1}}>  
                    <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                        style = {(this.state.orientation == 'portrait') 
                                ? {height: 510, width: 350, alignSelf: 'center'} 
                                : {height: 750, width: 530, alignSelf: 'center'}}>

                        <TouchableOpacity
                            style = {DashBoardScreenStyles.LogOut_Button_Style}
                            onPress = {this.navigateToLogInScreen}>
                            <Text style = {{color: '#dbced2'}}>{strings.LogOut}</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
            </View>
        )
    }
}