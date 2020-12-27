import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import ToolBar from './ToolBar';
import BottomBar from './BottomBar';
import ViewNotes from './NotesView'

export default class Dashboard extends Component {

    render() {
        return (
            <View style = {{backgroundColor: '#f2d5e5', height: '100%'}}>
                <ToolBar navigation = {this.props.navigation}/>
                <ScrollView>   
                    <ViewNotes navigation = {this.props.navigation}/>
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
            </View>
        )
    }
}