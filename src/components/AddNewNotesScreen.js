import React, { Component } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import {Appbar, Menu, Snackbar, Provider, Portal, Modal, Chip } from 'react-native-paper';
import { strings } from '../Languages/strings';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteDataController from '../../services/NoteDataController';
import {connect} from 'react-redux';
import {storeNotesArchivedStatus, storelabelScreen} from '../redux/actions/CreateNewLabelAction';
import AddNewNotesStyles from '../styles/AddNewNotesStyles';
import ShowDateAndTimePicker from './ShowDateAndTimePicker';
import moment from 'moment'

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
            labels: this.props.editNotesDetails.labels,
            noteLabels: [],
            showRemainderModel: false,
            remainderTime: this.props.editNotesDetails.remainderTime
        }
    }

    componentDidMount = async () => {
        let noteLabels = []
        if(this.state.labels.length > 0 || this.props.selectedLabelKeys.length > 0) {
            let labelKeys = []
            if(this.state.labels > 0) {
                console.log(this.state.labels);
                labelKeys = JSON.parse(this.state.labels)
            }
            this.props.selectedLabelKeys.map(label => {
                if(!labelKeys.includes(label)) {
                    labelKeys.push(label)
                }
            })
            await this.props.labelsAndLabelKeys.map(labelAndKey => {
                if(labelKeys.includes(labelAndKey.lebelKey)) {
                    noteLabels.push(labelAndKey.labelName)
                }
            })
            this.setState({
                noteLabels: noteLabels
            })
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
            isDeleted: false,
            remainderTime: JSON.stringify(this.state.remainderTime)
        }
        
        if(this.state.title != '' || this.state.note != '') {
            if(this.state.noteKey == undefined) {
                let noteKey = this.generateRandomKey()
                NoteDataController.addNote(noteKey, notes)
                .then(() => { 
                    this.navigateToSelectedScreen()
                })
                .catch((error) => console.log(error))

            } else if(this.state.noteKey != undefined) {
                NoteDataController.updateNote(this.state.noteKey, notes)
                .then(() => {this.navigateToSelectedScreen()})
                .catch(error => console.log(error))
            }
        } else {
            this.props.navigation.push('Home', { screen: 'Notes',   params : {isEmptyNote : true}})
        }
        onPress();
    }

    handleBackIcon = () => {
        if(this.props.labelScreen == 1000)
            this.props.storelabelScreen(null)
        this.addNotesToDatabase()
    }

    navigateToSelectedScreen = () => {
        if(this.props.labelScreen == 1000) {
            if(this.state.archived) 
                this.props.navigation.push('Home', { screen: 'Archived'})
        }
         else if(this.props.labelScreen != null) {
            this.props.navigation.push('Home', { screen: 'Label'})
        }
        else {
            this.props.navigation.push('Home', {screen: 'Notes'})
        }
    }

    handleDotIconButton = () => {
        const {onPress} = this.props
        this.RBSheet.open()
        onPress()
    }

    handleArchiveIcon = async () => {
        await this.setState({
            archived: !this.state.archived
        })
        this.addNotesToDatabase()
    }

    handleDeleteButton = () => {
        this.RBSheet.close()
        if(this.state.title != '' || this.state.note != '') {
            const notes = {
                title: this.state.title,
                note: this.state.note,
                labels: this.props.selectedLabelKeys,
                isArchived: this.props.notesArchived,
                isDeleted: true,
                remainderTime: JSON.stringify(this.state.remainderTime)
            }
            NoteDataController.updateNote(this.state.noteKey, notes)
            .then(() => {
                this.props.navigation.push('Home', {screen: 'Notes', params: {isNoteDeleted: true, note: notes, noteKey: this.state.noteKey}})
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

    handleRemainder = () => {
        this.setState({
            showRemainderModel: !this.state.showRemainderModel
        })
    }

    handleLabelsIcon = () => {
        this.RBSheet.close()
        this.props.navigation.push('ChooseLabel')
    }

    setTime = (selectedRemainderTime) => {
        if(selectedRemainderTime != null)
            selectedRemainderTime.setSeconds(0)
        
        this.setState({
            remainderTime: selectedRemainderTime,
            showRemainderModel: false
        })
    }
 
    render() {
        return(
            <Provider>
            <View style = {{backgroundColor: '#f5dcef', height: '100%'}}>
                <View>
                <Appbar style = {{backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = "keyboard-backspace"
                        onPress = {this.handleBackIcon}
                    />
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = "pin-outline"
                    />
                    <Appbar.Action 
                        icon = "bell-plus-outline"
                        onPress = {this.handleRemainder}
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
                    <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                        {
                            (this.state.remainderTime != null) ?
                            (<TouchableOpacity onPress = {this.handleRemainder}>
                                <Chip
                                    style = {(new Date() < new Date(this.state.remainderTime)) ? AddNewNotesStyles.Remainder_Button_Style : AddNewNotesStyles.Remainder_Faded_Button_Style }
                                    textStyle = {{fontSize : 12}}
                                    icon = 'alarm'>
                                        {moment(this.state.remainderTime).format('D MMM, h.mm a')}
                                </Chip>
                            </TouchableOpacity>)
                            :null
                        }
                        {(this.state.noteLabels.length > 0 ? 
                        this.state.noteLabels.map((label, index) => (
                            <React.Fragment key = {index}>
                                <Text style = {AddNewNotesStyles.Label_Button_Style} onPress = {this.handleLabelsIcon}>
                                    {label}
                                </Text>
                            </React.Fragment>)
                        )
                        : null)}
                    </View>
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
                
                <Portal>
                    <Modal 
                        visible={this.state.showRemainderModel} 
                        onDismiss = {this.handleRemainder} 
                        contentContainerStyle = {AddNewNotesStyles.modal_container_style}>
                            <ShowDateAndTimePicker
                                dismissModal = {this.handleRemainder}
                                setTime = {this.setTime}
                                remainderTime = {this.state.remainderTime}
                            />
                        </Modal>
                    </Portal>
            </View>
            </Provider>
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
        noteKeyToUpdateNotes : state.createLabelReducer.noteKeyToUpdateNotes,
        labelsAndLabelKeys: state.createLabelReducer.labelsAndLabelKeys,
        labelScreen : state.createLabelReducer.labelScreen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNotesArchivedStatus : (notesArchived) => dispatch(storeNotesArchivedStatus(notesArchived)),
        storelabelScreen : (labelScreen) => dispatch(storelabelScreen(labelScreen))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewNotes)