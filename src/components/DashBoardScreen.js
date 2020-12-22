import React, { Component } from 'react'
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../languages/Languages';
import {Appbar, Searchbar} from 'react-native-paper';
import DashBoardScreenStyles from '../styles/DashBoardScreenStyles'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeLayout: false,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        }
    }
    
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
                <ImageBackground source = {require('../assets/backGround.jpg')}
                    style = {{height: this.state.height, width: this.state.width}}>
                    
                    <Appbar style = {DashBoardScreenStyles.App_Bar_Style}>
                        <Appbar.Action
                            icon="menu"
                            onPress={() => console.log('Pressed Menu')}
                        />
                        <Searchbar
                            style ={DashBoardScreenStyles.Search_Bar_Style}
                            placeholder = {strings.Search}
                            onChangeText = {data => console.log(data)}
                        />
                        <Appbar.Action icon = { (this.state.changeLayout ) ? "view-agenda-outline" : "view-grid-outline"} onPress  ={() => {
                            if(this.state.changeLayout) {
                                this.setState({
                                changeLayout: false
                            })} else {
                                this.setState({
                                    changeLayout: true
                                })
                            }
                            console.log('Layout Changed')}}
                        />
                        <TouchableOpacity onPress = {() => console.log('Pressed Profile')}>
                            <Image source = {require('../assets/profilePic.jpg')}
                            style = {{borderRadius: 50, height: 35, width: 35}}
                            />
                        </TouchableOpacity>
                    </Appbar>

                    <Text 
                        style = {DashBoardScreenStyles.Text_Style}>
                        {strings.ScreenUnderDevelopment}
                    </Text>

                    <TouchableOpacity
                        style = {DashBoardScreenStyles.LogOut_Button_Style}
                        onPress = {this.navigateToLogInScreen}>
                        <Text style = {{color: '#dbced2'}}>{strings.LogOut}</Text>
                    </TouchableOpacity>

                    <View style = {{flex: 1, justifyContent: 'flex-end',}}>
                        <Appbar style = {DashBoardScreenStyles.App_Bar_Style_Bottom}>
                            <Appbar.Action
                                icon="check-box-outline"
                                onPress = {() => console.log('Clicked Brush')}
                            />
                            <Appbar.Action
                                icon="brush"
                                onPress = {() => console.log('Clicked Micro phone')}
                            />
                            <Appbar.Action
                                icon="microphone-outline"
                                onPress = {() => console.log('Clicked Note to Save')}
                            />
                            <Appbar.Action
                                icon = "panorama"
                                onPress={() => console.log('panorama')}
                            />
                            <Appbar.Action
                                style = {DashBoardScreenStyles.Add_Notes_Icon_Style}
                                icon = "plus"
                                onPress={() => console.log('Clicked Plus')}
                            />
                        </Appbar>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}