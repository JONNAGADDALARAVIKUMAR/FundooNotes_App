import React, { Component } from 'react';
import {View, ScrollView, TextInput, Text, TouchableWithoutFeedback} from 'react-native';
import { Appbar, Menu, Snackbar, Portal, Dialog, Provider, Paragraph, Button } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import NoteDataController from '../../../../services/NoteDataController';
import {connect} from 'react-redux';

class DeletedNoteViewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.state.createLabelReducer.editNotesDetails.title,
            note: this.props.state.createLabelReducer.editNotesDetails.note,
            noteKey: this.props.state.createLabelReducer.noteKeyToUpdateNotes,
            isDeleted: this.props.state.createLabelReducer.editNotesDetails.isDeleted,
            archived: this.props.state.createLabelReducer.editNotesDetails.isArchived,
            labels: this.props.state.createLabelReducer.editNotesDetails.labels,
            remainderTime: this.props.state.createLabelReducer.editNotesDetails.remainderTime,
            showCantEditSnackbar: false,
            showDailog: false,
            editNotesDetails: this.props.state.createLabelReducer.editNotesDetails,
        }
    }

    restoreNotes = () => {
        this.RBSheet.close()
        const notes = {
            title: this.state.title,
            note: this.state.note,
            labels: JSON.parse(this.state.labels),
            isArchived: this.state.archived,
            isDeleted: false,
            remainderTime: this.state.remainderTime
        }
        NoteDataController.updateNote(this.state.noteKey, notes)
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    deletePermanently = () => {
        NoteDataController.deletePermanently(this.state.noteKey)
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    emptyNotesCantBeEditable = () => {
        this.setState({
            showCantEditSnackbar: false
        })
    }

    showSnackBar = () => {
        this.setState({
            showCantEditSnackbar: true
        })
    }

    showDailog = () => {
        this.RBSheet.close()
        this.setState({
            showDailog: true
        })
    }

    hideDialog = () => {
        this.setState({
            showDailog: false
        })   
    }

    navigateTODeletedNotesScreen = () => {
        this.props.navigation.push('Home', {screen: 'Deleted'})
    }

    render() {
        return(
            <Provider>
            <View style = {{backgroundColor: '#f5dcef', height: '100%'}}>
                <Appbar style = {{backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = 'keyboard-backspace'
                        onPress = {this.navigateTODeletedNotesScreen}
                    />
                </Appbar>
                <ScrollView>
                    <TouchableWithoutFeedback onPress = {() => this.showSnackBar()}>
                        <View>
                    <TextInput 
                        style = {{fontSize: 20, paddingLeft: 30, color: 'black'}}
                        multiline = {true}
                        value = {this.state.title}
                        editable = {false}
                        
                    />
                    <TextInput 
                        style = {{fontSize: 17, paddingLeft: 30, color: 'black'}}
                        multiline = {true}
                        value = {this.state.note}
                        editable = {false}
                    />
                    </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <Appbar style = {{backgroundColor: 'transparent', justifyContent: 'space-around'}}>
                    <Appbar.Action
                        icon = 'plus-box-outline'
                        onPress = {() => console.log('pressed')}
                    />
                    <Text>Deleted Notes</Text>
                    <Appbar.Action 
                        icon = "dots-vertical"
                        onPress = {() => this.RBSheet.open()}
                    />
                </Appbar>
                <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {100}
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
                        <Menu.Item icon = "backup-restore" onPress = {() => this.restoreNotes()} title = "Restore" />
                        <Menu.Item icon = "delete-outline" onPress = {() => this.showDailog()} title = "Delete forever" /> 
                    </View>
                </RBSheet>

                <Snackbar
                    style = {{marginBottom : 100}}
                    visible = {this.state.showCantEditSnackbar}
                    onDismiss = {() => this.emptyNotesCantBeEditable()}
                    duration = {3000}>
                    Deleted Notes cant be Updated
                </Snackbar>
                <Portal>
                    <Dialog visible = {this.state.showDailog}>
                        <Dialog.Content>
                            <Paragraph>
                                Delete this Note forever ?
                            </Paragraph>
                            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Dialog.Actions>
                                    <Button onPress = {() => this.hideDialog()}>Cancel</Button>
                                </Dialog.Actions>
                                <Dialog.Actions>
                                    <Button onPress = {() => this.deletePermanently()}>Delete</Button>
                                </Dialog.Actions>
                            </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
            </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

export default connect(mapStateToProps)(DeletedNoteViewScreen)