import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import ToolBar from './ToolBar';
import BottomBar from './BottomBar';
import ViewNotes from './NotesView';
import {Snackbar} from 'react-native-paper';

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            listView: false,
            showEmptyNoteSnackbar : true,
        }
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
        ///console.log(this.state.listView);
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : false})
        //onDismiss()
    }

    render() {
        return (
            <View style = {{backgroundColor: '#f2d5e5', height: '100%'}}>
                <ToolBar navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView}/>
                <ScrollView>   
                    <ViewNotes navigation = {this.props.navigation} changeLayout = {this.state.listView} />
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible = {this.state.showEmptyNoteSnackbar}
                    onDismiss = {this.emptyNoteSnackbarHandler}
                    duration = {5000}>
                    Empty Note Discarded
                </Snackbar>
            </View>
        )
    }
}