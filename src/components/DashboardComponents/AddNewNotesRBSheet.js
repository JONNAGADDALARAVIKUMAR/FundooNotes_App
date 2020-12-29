import React, { Component } from 'react';
import {View} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddNewNotesRBSheet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <Menu.Item icon = "delete-outline" onPress = {this.props.HandleDelete} title = "Delete" />
                <Menu.Item icon = "content-copy" title = "Make a copy" />
                <Menu.Item icon = "share-variant" title = "Send" />
                <Menu.Item 
                    icon = {({ size, color }) => (
                        <Icon name = "person-add-outline" size = {size} color = {color} />
                        )} 
                    title = "Collaborator"/>
                <Menu.Item icon = "label-outline" title = "Labels" />    
            </View>
        )
    }
}