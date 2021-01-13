import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { Appbar } from 'react-native-paper';
import ArchivedNotesScreenStyles from '../../styles/ArchivedNotesScreenStyles';
import NotesView from '../DashboardComponents/NotesView';
import BottomBar from './BottomBar'

export default class RemainderScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: false
        }
    }

    openDrawer = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer()
        //onPress();
    }

    selectView = () => {
        const {onPress} = this.props
        this.setState({
            listView: !this.state.listView
        })
        //onPress();
    }

    render() {
        return(
            <View style = {ArchivedNotesScreenStyles.backGround_Style}>
                <Appbar style = {ArchivedNotesScreenStyles.App_Bar_Style_Bottom}>
                    <Appbar.Action
                        icon = "menu"
                        onPress = {this.openDrawer}
                    />
                    <Text style = {ArchivedNotesScreenStyles.title_Style}>
                        Remainder
                    </Text>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = {'magnify'}
                        onPress = { () => console.log('search')}
                    />
                    <Appbar.Action 
                        icon = {(this.state.listView) ? 'view-agenda-outline' : 'view-grid-outline'}
                        onPress={this.selectView}
                    />
                </Appbar>
                <NotesView
                    navigation = {this.props.navigation} 
                    changeLayout = {this.state.listView} 
                    deletedStatus = {false}
                    remainderStatus = {true}/>

                <BottomBar 
                    navigation = {this.props.navigation}/>
            </View>
        )
    }
}