import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {strings} from '../../Languages/strings';
import {Appbar} from 'react-native-paper';
import DeletedNotesScreenStyles from '../../styles/DeletedNotesScreenStyles';

export default class DeletedNotesScreenTopbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true
        }
    }

    changeLayout = async () => {
        const {onPress} = this.props
        if(this.state.changeLayout) {
            await this.setState({
                listView: false
            })
        } else {
            await this.setState({
                listView: true
            })
        }
        //onPress()
    }

    render() {
        return(
            <View>
                <Appbar style = {DeletedNotesScreenStyles.App_Bar_Style}>
                    <Appbar.Action
                        icon="menu"
                        onPress = {() => this.props.navigation.openDrawer()}
                    />
                    <Text style = {DeletedNotesScreenStyles.Deleted_Text_Style}>{strings.Deleted}</Text>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = "dots-vertical"
                        onPress = {() => console.log('pressed Three dots')}
                    />
                </Appbar>
            </View>
        )
    }
}