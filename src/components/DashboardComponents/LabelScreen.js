import React, { Component } from 'react';
import {View, ScrollView, Text} from 'react-native';
import { Appbar } from 'react-native-paper';
import {connect} from 'react-redux';
import LabelScreenStyles from '../../styles/LabelScreenStyles';
import BottomBar from './BottomBar';
import NotesView from './NotesView';
import {storelabelScreen} from '../../redux/actions/CreateNewLabelAction';

class LabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: false,
        }
    }

    componentDidMount = () => {
        this.props.storelabelScreen(this.props.labelAndKey.lebelKey)
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
            <View style = {LabelScreenStyles.backGround_Style}>
                <View style = {LabelScreenStyles.Appbar_Styles}>
                <Appbar style = {{backgroundColor: 'transparent'}}>
                    <Appbar.Action
                        icon = "menu"
                        onPress = {this.openDrawer}
                    />
                    <Text style = {LabelScreenStyles.label_Name_Style}>
                        {this.props.labelAndKey.labelName}
                    </Text>
                    <Appbar.Action
                        icon = "magnify"
                        //onPress = {this.openDrawer}
                    />
                    <Appbar.Action 
                        icon = {(this.state.listView) ? 'view-agenda-outline' : 'view-grid-outline'}
                        onPress={this.selectView}
                    />
                    <Appbar.Action
                        icon = "dots-vertical"
                        //onPress = {this.openDrawer}
                    />
                </Appbar>
                </View>

                <ScrollView>
                    <NotesView
                        navigation = {this.props.navigation} 
                        changeLayout = {this.state.listView} 
                        deletedStatus = {false}
                        archivedStatus = {false}
                        labelAndKey = {this.props.labelAndKey}/>
                </ScrollView>
                <BottomBar 
                    navigation = {this.props.navigation}
                    labelAndKey = {this.props.labelAndKey}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        labelAndKey: state.createLabelReducer.labelAndKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storelabelScreen : (labelScreen) => dispatch(storelabelScreen(labelScreen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen)