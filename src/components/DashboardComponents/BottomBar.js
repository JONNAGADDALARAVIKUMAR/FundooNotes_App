import React, { Component } from 'react';
import {Appbar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';

export default class ToolBar extends Component {
    render() {
        return(
            <Appbar style = {DashBoardScreenStyles.App_Bar_Style_Bottom}>
                <Appbar.Action
                    icon="check-box-outline"
                    style = {{margin: '5%'}}
                    onPress = {() => console.log('Clicked Square checkBox')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon="brush"
                    onPress = {() => console.log('Clicked Brush')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon="microphone-outline"
                    onPress = {() => console.log('Clicked Micro phone')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon = "panorama"
                    onPress={() => console.log('Clicked panorama')}
                />
                <Appbar.Content/>
                <Appbar.Action
                    style = {DashBoardScreenStyles.Add_Notes_Icon_Style}
                    icon = "plus"
                    onPress={() => this.props.navigation.navigate('AddNewNotes')}
                />
            </Appbar>
        )
    }
}