import React, { Component } from 'react';
import {View} from 'react-native';
import DeletedNotesScreenTopbar from './DeletedNotesScreenTopbar';
import DeletedNotesScreenStyles from '../../styles/DeletedNotesScreenStyles';
import NotesView from './NotesView';

export default class DeletedNotesSreen extends Component {
    constructor(props) {
        super(props)
    }

    openDrawer = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer()
        onPress();
    }

    render() {
        return(
            <View style = {DeletedNotesScreenStyles.Screen_Style}>
                <DeletedNotesScreenTopbar 
                    navigation = {this.props.navigation} 
                    onPress = {this.openDrawer}
                />
                <NotesView  
                    navigation = {this.props.navigation}  
                    deletedStatus = {true}
                    archivedStatus = {false}
                />
            </View>
        )
    }
} 