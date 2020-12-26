import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import ToolBar from './ToolBar';
import BottomBar from './BottomBar';
import Firebase from '../../../config/Firebase';
import Keychain from 'react-native-keychain';
import { Card, Paragraph, Title } from 'react-native-paper';

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
            orientation: isPortrait() ? 'portrait' : 'landscape',
            notes: '',
        };
    
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    componentDidMount = async () => {
        const user = await Keychain.getGenericPassword();
        const userDetails = JSON.parse(user.password);
        Firebase.database().ref('notes/' + userDetails.user.uid).once('value').then(async snapShot => { 
          let data = snapShot.val() ? snapShot.val() : {};
            await this.setState({
                notes: data
            })
          console.log(this.state.notes);
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
        let NoteKey = Object.keys(this.state.notes);
        return (
            <View style = {{backgroundColor: '#f2d5e5', height: '100%'}}>
                <ToolBar navigation = {this.props.navigation}/>
                <ScrollView>
                    <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                        style = {(this.state.orientation == 'portrait') 
                                ? {height: 510, width: 350, alignSelf: 'center'} 
                                : {height: 750, width: 530, alignSelf: 'center'}}>
                        <ScrollView>
                            <View>
                            {NoteKey.length > 0 ? NoteKey.map(key => (
                                <Card
                                key = {key}
                                style = {{margin: 5, backgroundColor: 'transparent',}}>
                                    <Card.Content>
                                        <Title>
                                            {this.state.notes[key].Title}
                                        </Title>
                                        <Paragraph>
                                            {this.state.notes[key].Notes}
                                        </Paragraph>
                                    </Card.Content>
                                </Card>
                            )) : (<Card
                                style = {{margin: 5, backgroundColor: 'transparent',}}>
                                    <Card.Content>
                                        <Text>Add Notes</Text>
                                    </Card.Content>
                                </Card>) }
                        </View>

                        <TouchableOpacity
                            style = {DashBoardScreenStyles.LogOut_Button_Style}
                            onPress = {this.navigateToLogInScreen}>
                            <Text style = {{color: '#dbced2'}}>{strings.LogOut}</Text>
                        </TouchableOpacity>
                        </ScrollView>
                    </ImageBackground>
                    </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
            </View>
        )
    }
}