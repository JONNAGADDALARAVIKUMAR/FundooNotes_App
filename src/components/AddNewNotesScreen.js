import React, { Component } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import {Appbar, Menu, Snackbar} from 'react-native-paper';
import { strings } from '../Languages/strings';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteDataController from '../../services/NoteDataController';
import {connect} from 'react-redux';
import {storeNotesArchivedStatus} from '../redux/actions/CreateNewLabelAction';

class AddNewNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.editNotesDetails.title,
            note: this.props.editNotesDetails.note,
            noteKey: this.props.noteKeyToUpdateNotes,
            isNoteNotAddedDeleted: false,
            isDeleted: this.props.editNotesDetails.isDeleted,
            archived: this.props.editNotesDetails.isArchived,
            editNotesDetails: this.props.editNotesDetails,
            labels: this.props.editNotesDetails.labels
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

    addNotesToDatabase = async () => {
        const {onPress} = this.props
        const notes = {
            title: this.state.title,
            note: this.state.note,
            labels: this.props.selectedLabelKeys,
            isArchived: this.state.archived,
            isDeleted: false
        }
        
        if(this.state.title != '' || this.state.note != '') {
            if(this.state.noteKey == undefined) {
                noteKey = this.generateRandomKey()
                NoteDataController.addNote(noteKey, notes)
                .then(() => { 
                    this.props.navigation.push('Home', {screen: 'Notes'})})
                .catch((error) => console.log(error))

            } else if(this.state.noteKey != undefined) {
                NoteDataController.updateNote(this.state.noteKey, notes)
                .then(() => {this.props.navigation.push('Home', {screen: 'Notes'})})
                .catch(error => console.log(error))
            }
            
        } else {
            this.props.navigation.push('Home', { screen: 'Notes',   params : {isEmptyNote : true}})
        }
        //onPress();
    }

    handleDotIconButton = () => {
        const {onPress} = this.props
        this.RBSheet.open()
        //onPress()
    }

    handleArchiveIcon = () => {
        this.setState({
            archived: !this.state.archived
        })
    }

    handleDeleteButton = () => {
        this.RBSheet.close()
        if(this.state.title != '' || this.state.note != '') {
            const notes = {
                title: this.state.title,
                note: this.state.note,
                labels: this.props.selectedLabelKeys,
                isArchived: this.props.notesArchived,
                isDeleted: true
            }
            NoteDataController.updateNote(this.state.noteKey, notes)
            .then(() => {
                this.props.navigation.push('Home', {screen: 'Notes'})
            })
            .catch(error => console.log(error))
        } else {
            this.setState({
                isNoteNotAddedDeleted: true
            })
        }
    }

    generateRandomKey = () => {
        const alphaNemuricChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        var today = new Date()
        var noteKey = ''
        noteKey = today.getFullYear() 
                    + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                    + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                    + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                    + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                    + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())

        for(let i = 0; i < 6; i++) {
            noteKey += alphaNemuricChars.charAt(Math.floor(Math.random() * alphaNemuricChars.length))
        }
        return noteKey
    }

    emptyNotesDeleteHandler = async () => {
        await this.setState({ 
            isNoteNotAddedDeleted : false
        })
    }

    handleLabelsIcon = () => {
        this.RBSheet.close()
        this.props.navigation.push('ChooseLabel')
    }

    render() {
        return(
            <View style = {{backgroundColor: '#f5dcef', height: '100%'}}>
                <View>
                <Appbar style = {{backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = "keyboard-backspace"
                        onPress = {this.addNotesToDatabase}
                    />
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = "pin-outline"
                    />
                    <Appbar.Action 
                        icon = "bell-plus-outline"
                    />
                    <Appbar.Action 
                        onPress = {this.handleArchiveIcon}
                        icon = {(this.state.archived) ? "archive-arrow-up-outline" : "archive-arrow-down-outline"}
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
                    {/* {(this.props.selectedLabelKeys.length > 0 ? 
                        this.props.selectedLabelKeys.map(labelKey => (
                            <React.Fragment key = {labelKey}>
                                <Text style = {AddNewNotesStyles.Label_Button_Style}>
                                    {this.props.labelContent[labelKey].label.labelName}
                                </Text>
                            </React.Fragment>)
                        )
                        : null)} */}
                    
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
                        <Menu.Item icon = "label-outline" title = "Labels" onPress = {this.handleLabelsIcon}/>    
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

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        selectedLabelKeys : state.createLabelReducer.selectedLabelKeys,
        notesArchived : state.createLabelReducer.notesArchived,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        editNotesDetails : state.createLabelReducer.editNotesDetails,
        noteKeyToUpdateNotes : state.createLabelReducer.noteKeyToUpdateNotes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNotesArchivedStatus : (notesArchived) => dispatch(storeNotesArchivedStatus(notesArchived)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewNotes)