import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {strings} from '../../Languages/strings';
import {Appbar} from 'react-native-paper';
import DeletedNotesScreenStyles from '../../styles/DeletedNotesScreenStyles';

export default class DeletedNotesScreenTopbar extends Component {
    constructor(props) {
        super(props);
    }

    openDrawer = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer()
        onPress();
    }

    render() {
        return(
            <View>
                <Appbar style = {DeletedNotesScreenStyles.App_Bar_Style}>
                    <Appbar.Action
                        icon="menu"
                        onPress = {this.openDrawer}
                    />
                    <Text style = {DeletedNotesScreenStyles.Deleted_Text_Style}>{strings.Deleted}</Text>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = "dots-vertical"
                    />
                </Appbar>
            </View>
        )
    }
}