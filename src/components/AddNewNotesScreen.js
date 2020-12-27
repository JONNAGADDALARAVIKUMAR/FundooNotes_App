import React, { Component } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import {Appbar} from 'react-native-paper';
import KeyChain from 'react-native-keychain';
import Firebase from '../../config/Firebase';
import { strings } from '../Languages/strings';
import UserNoteServices from '../../services/UserNoteServices'

export default class AddNewNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: ''
        }
    }

    handleTitle = async (enteredtitle) => {
       await this.setState({
           title: enteredtitle
       })
       //console.log(this.state.title);
    }


    handleNote = async (enteredNotes) => {
        await this.setState({
            note: enteredNotes
        })
        //console.log(this.state.note);
    }

    addNotesToFirebase = async () => {
        const {onPress} = this.props
        if(this.state.title != '' || this.state.note != '') {
            // const user = await KeyChain.getGenericPassword()
            // const userDetails = JSON.parse(user.password)
            // Firebase.database().ref('notes/' + userDetails.user.uid).push({
            //     Title: this.state.title,
            //     Notes: this.state.note
            // })
            //console.log(userDetails);
            UserNoteServices.addNoteToFirebase(this.state.title, this.state.note)
            .then(() => this.props.navigation.push('Home', {screen: 'Notes'}))
        }
        //this.props.navigation.push('Home', { screen: 'Notes' })
        //onPress();
    }

    render() {
        return(
            <View style = {{backgroundColor: '#f5dcef', height: '100%'}}>
                <View>
                <Appbar style = {{backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = "keyboard-backspace"
                        onPress = {this.addNotesToFirebase}
                    />
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = "pin-outline"
                    />
                    <Appbar.Action 
                        icon = "bell-plus-outline"
                    />
                    <Appbar.Action 
                        icon = "archive-arrow-down-outline"
                    />
                </Appbar>
                </View>
                <ScrollView>
                    <TextInput 
                        style = {{fontSize: 20, paddingLeft: 30}}
                        placeholder = {strings.Title}
                        multiline = {true}
                        onChangeText = {this.handleTitle}
                    />
                    <TextInput 
                        placeholder = {strings.Notes}
                        style = {{fontSize: 17, paddingLeft: 30}}
                        multiline = {true}
                        onChangeText = {this.handleNote}
                    />
                </ScrollView>
                <View>
                <Appbar style = {{justifyContent: 'space-around', backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = "plus-box-outline"
                    />
                    <Appbar.Action 
                        icon = "undo-variant"
                    />
                    <Appbar.Action 
                        icon = "redo-variant"
                    />               
                    <Appbar.Action 
                        icon = "dots-vertical"
                    />
                </Appbar>
                </View>
            </View>
        )
    }
}