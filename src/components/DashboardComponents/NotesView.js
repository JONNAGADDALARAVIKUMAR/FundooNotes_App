import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import Firebase from '../../../config/Firebase';
import Keychain from 'react-native-keychain';
import { Card, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import UserNoteServices from '../../../services/UserNoteServices';

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
        UserNoteServices.getDetailsFromFirebase()
            .then(async data => {
                let notes = data ? data : {}
                await this.setState({
                    notes : notes
                })
          //console.log(this.state.notes);
        })
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
            <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                style = {(this.state.orientation == 'portrait') 
                    ? {height: 510, width: 350, alignSelf: 'center'} 
                    : {height: 750, width: 530, alignSelf: 'center'}}>
                <ScrollView>
                    <View style = {NoteViewStyles.list_Style}>
                    {NoteKey.length > 0 ? NoteKey.reverse().map(key => ( 
                        (this.props.changeLayout) ?
                    <Card
                        key = {key}
                        style = {NoteViewStyles.list_grid_Container}>
                            <Card.Content>
                                <Title>
                                    {this.state.notes[key].notes.title}
                                </Title>
                                <Paragraph>
                                    {this.state.notes[key].notes.note}
                                </Paragraph>
                            </Card.Content>
                        </Card> : <Card
                            key = {key}
                            style = {NoteViewStyles.list_Container}>
                            <Card.Content>
                                <Title>
                                    {this.state.notes[key].notes.title}
                                </Title>
                                <Paragraph>
                                    {this.state.notes[key].notes.note}
                                </Paragraph>
                            </Card.Content>
                        </Card>))  
                    : (<View>
                        <Image style = {DashBoardScreenStyles.bulb_Style} source = {require('../../assets/bulb.png')}/>
                        <Text style = {DashBoardScreenStyles.Appear_Text_Style}>{strings.YourNoteswillApperHere}</Text>
                    </View>) }
                </View>

                <TouchableOpacity
                    style = {DashBoardScreenStyles.LogOut_Button_Style}
                    onPress = {this.navigateToLogInScreen}>
                    <Text style = {{color: '#dbced2'}}>{strings.LogOut}</Text>
                </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        )
    }
}