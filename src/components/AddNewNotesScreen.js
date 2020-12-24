import React, { Component } from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import KeyChain from 'react-native-keychain';
import Firebase from '../../config/Firebase';

export default class AddNewNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            notes: ''
        }
    }

    handleTitle = async (enteredtitle) => {
       this.setState({
           title: enteredtitle
       })
       console.log(this.state.title);
    }


    handleNote = async (enteredNotes) => {
        this.setState({
            notes: enteredNotes
        })
        console.log(this.state.notes);
    }

    addNotesToFirebase = async () => {
        if(this.state.title != '' || this.state.notes != '') {
            const user = await KeyChain.getGenericPassword()
            const userDetails = JSON.parse(user.password)
            Firebase.database().ref('notes/' + userDetails.user.uid).push({
                Title: this.state.title,
                Notes: this.state.notes
            })
            console.log(userDetails);
        }
        this.props.navigation.navigate('Notes')
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
                        placeholder = {'Title'}
                        multiline = {true}
                        onChangeText = {this.handleTitle}
                    />
                    <TextInput 
                        placeholder = {'Note'}
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