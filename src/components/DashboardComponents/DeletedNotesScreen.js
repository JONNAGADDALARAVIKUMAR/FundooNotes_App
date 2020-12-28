import React, { Component } from 'react';
import {Text, View} from 'react-native';
import DeletedNotesScreenTopbar from './DeletedNotesScreenTopbar';
import DeletedNotesScreenStyles from '../../styles/DeletedNotesScreenStyles';
import NotesView from './NotesView';

export default class DeletedNotesSreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <View style = {DeletedNotesScreenStyles.Screen_Style}>
                <DeletedNotesScreenTopbar navigation = {this.props.navigation} onPress = {() => this.props.navigation.openDrawer()}/>
                <NotesView  navigation = {this.props.navigation} changeLayout = {this.state.listView} status = {true}/>
            </View>
        )
    }
} 