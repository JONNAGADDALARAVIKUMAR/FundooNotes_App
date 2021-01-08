import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import ToolBar from './ToolBar';
import BottomBar from './BottomBar';
import ViewNotes from './NotesView';
import {Snackbar, Provider, Portal, Modal} from 'react-native-paper';
import UserNoteServices from '../../../services/UserNoteServices';
import Profile from './Profile';
import UserServices from '../../../services/UserServices';

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            listView: false,
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showProfile: false,
            photoURL: ''
        }
    }

    componentDidMount = async () => {
        this.getProfileImage();
        if(this.props.route.params != undefined) {
            if(this.props.route.params.isEmptyNote != undefined) {
                await this.setState({
                    showEmptyNoteSnackbar : true
                })
            }
            if(this.props.route.params.isNoteDeleted != undefined) {
                await this.setState({
                    showDeletedNoteSnackbar : true
                })
            }
        }
    }

    getProfileImage = async () => {
        await UserServices.getDetails()
        .then(async details => {
            if(details.imageURL != undefined) {
                await this.setState({
                    photoURL : details.imageURL
                })
            } else {
                await this.setState({
                    photoURL : ''
                })
            }
        })
        .catch(async error => {
            if(error.code == 'storage/object-not-found') {
                await this.setState({
                    photoURL : ''
                })
            }
            console.log(error);
        })
    }

    selectView = () => {
        const {onPress} = this.props
        this.setState({
            listView: !this.state.listView
        })
        //onPress();
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : false})
        //onDismiss()
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : false})
        //onDismiss()
    }

    restoreNotes = () => {
        const {onPress} = this.props
        UserNoteServices.restoreNoteInFirebase(this.props.route.params.title, this.props.route.params.note, this.props.route.params.noteKey, this.props.route.params.archivedStatus, this.props.route.params.labelNoteKeys)
            .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
            .catch(error => console.log(error))
        //onPress()
    }

    handleProfile = async () => {
        await this.setState({
            showProfile: !this.state.showProfile
        })
        this.getProfileImage();
    }

    render() {
        return (
            <Provider>
            <View style = {{backgroundColor: '#f2d5e5', height: '100%'}}>
                <ToolBar 
                    navigation = {this.props.navigation} 
                    onPress = {this.selectView} 
                    listView = {this.state.listView}
                    handleProfile = {this.handleProfile}
                    photoURL = {this.state.photoURL}/>

                <ScrollView>   
                    <ViewNotes 
                        navigation = {this.props.navigation} 
                        changeLayout = {this.state.listView} 
                        deletedStatus = {false}
                        archivedStatus = {false}/>
                </ScrollView>

                <BottomBar 
                    navigation = {this.props.navigation}/>

                <Snackbar
                    style = {{marginBottom : 80}}
                    visible={this.state.showEmptyNoteSnackbar}
                    onDismiss={this.emptyNoteSnackbarHandler}
                    duration = {3000}>
                    Empty Note Discarded
                </Snackbar>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible = {this.state.showDeletedNoteSnackbar}
                    onDismiss = {this.deletedNoteSnackbarHandler}
                    duration = {5000}
                    action = {{
                        label : 'Undo',
                        onPress : this.restoreNotes
                    }}>
                    Note Moved to Bin
                </Snackbar>
                    <Portal>
                        <Modal
                            visible = {this.state.showProfile}>
                            <Profile 
                                handleProfile = {this.handleProfile} 
                                navigation = {this.props.navigation}
                                photoURL = {this.state.photoURL}/>
                        </Modal>
                    </Portal>
            </View>
            </Provider>
        )
    }
}