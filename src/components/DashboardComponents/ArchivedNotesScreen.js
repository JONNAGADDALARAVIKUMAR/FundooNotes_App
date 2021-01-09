import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import ArchivedNotesScreenStyles from '../../styles/ArchivedNotesScreenStyles';
import NotesView from '../DashboardComponents/NotesView';
import { connect } from 'react-redux'
import {storelabelScreen} from '../../redux/actions/CreateNewLabelAction';

class ArchivedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: false
        }
    }

    componentDidMount = () => {
        this.props.storelabelScreen(1000)
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
                        Archive
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
                <ScrollView>
                    <NotesView
                        navigation = {this.props.navigation} 
                        changeLayout = {this.state.listView} 
                        deletedStatus = {false}
                        archivedStatus = {true}/>
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storelabelScreen : (labelScreen) => dispatch(storelabelScreen(labelScreen)),
    }
}

export default connect(null, mapDispatchToProps)(ArchivedScreen)