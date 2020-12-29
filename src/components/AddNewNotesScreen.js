import React, { Component } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import {Appbar, Menu, Snackbar} from 'react-native-paper';
import { strings } from '../Languages/strings';
import UserNoteServices from '../../services/UserNoteServices';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddNewNotes extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: this.props.route.params.title,
            note: this.props.route.params.note,
            noteKey: this.props.route.params.noteKey,
            isNoteNotAddedDeleted: false 
        }
    }

    handleTitle = async (enteredtitle) => {
       await this.setState({
           title: enteredtitle
       })
    }

    handleNote = async (enteredNotes) => {
        await this.setState({
            note: enteredNotes
        })
    }

    addNotesToFirebase = async () => {
        const {onPress} = this.props
        if(this.state.title != '' || this.state.note != '') {

            if(this.state.noteKey == undefined) {
                UserNoteServices.addNoteToFirebase(this.state.title, this.state.note, false)
                .then(() => {
                    this.props.navigation.push('Home', {screen: 'Notes'})
                })
                .catch(error => console.log(error))
            } 

            else if(this.state.noteKey != undefined) {
                UserNoteServices.updateNoteInFirebase(this.state.title, this.state.note, this.state.noteKey, false)
                .then(() => {
                    this.props.navigation.push('Home', {screen: 'Notes', })
                })
                .catch(error => console.log(error))
            }
            
        } else {
            this.props.navigation.push('Home', { screen: 'Notes',   params : {isEmptyNote : true}})
        }
        //onPress();
    }

    handleDotIconButton = async() => {
        const {onPress} = this.props
        this.RBSheet.open()
        //onPress()
    }

    handleDeleteButton = () => {
        this.RBSheet.close()
        if(this.state.title != '' || this.state.note != '') {
            UserNoteServices.updateNoteInFirebase(this.state.title, this.state.note, this.state.noteKey, true)
            .then(() => {
                this.props.navigation.push('Home', {screen: 'Notes',  params : {isNoteDeleted : true, title: this.state.title, note: this.state.note, noteKey: this.state.noteKey}})
            })
            .catch(error => console.log(error))
        } else {
            this.setState({
                isNoteNotAddedDeleted: true
            })
        }
    }

    emptyNotesDeleteHandler = async () => {
        await this.setState({ 
            isNoteNotAddedDeleted : false
        })
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
                        value = {this.state.title}
                        onChangeText = {this.handleTitle}
                    />
                    <TextInput 
                        placeholder = {strings.Notes}
                        style = {{fontSize: 17, paddingLeft: 30}}
                        multiline = {true}
                        value = {this.state.note}
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
                            onPress = {() => this.handleDotIconButton()}
                        />
                    </Appbar>
                </View>

                <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {250}
                    customStyles = {{
                        container : {
                            marginBottom : 50,
                            borderTopWidth : 1,
                            borderColor : "#d3d3d3",
                            
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                    <View>
                        <Menu.Item icon = "delete-outline" onPress = {this.handleDeleteButton} title = "Delete" />
                        <Menu.Item icon = "content-copy" title = "Make a copy" />
                        <Menu.Item icon = "share-variant" title = "Send" />
                        <Menu.Item 
                            icon = {({ size, color }) => (
                                <Icon name = "person-add-outline" size = {size} color = {color} />
                                )} 
                            title = "Collaborator"/>
                        <Menu.Item icon = "label-outline" title = "Labels" />    
                    </View>
                </RBSheet>

                <Snackbar
                    style = {{marginBottom : 100}}
                    visible = {this.state.isNoteNotAddedDeleted}
                    onDismiss = {this.emptyNotesDeleteHandler}
                    duration = {3000}>
                    Empty Notes can't be deleted
                </Snackbar>
            </View>
        )
    }
}