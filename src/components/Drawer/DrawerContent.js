import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle';
import {strings} from '../../Languages/strings'
import { connect } from 'react-redux';
import {storelabelAndKey} from '../../redux/actions/CreateNewLabelAction';

class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        let templabelsAndLabelKeys = this.props.state.createLabelReducer.labelsAndLabelKeys
        let labelNoteKeys = []
        for(let i = 0; i < templabelsAndLabelKeys.length; i++) {
            labelNoteKeys.push(templabelsAndLabelKeys[i].lebelKey)
        }
    }

    navigateToHome = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Notes' })
        onPress();
    }

    handleDeletedIconButton = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Deleted' })
        onPress();
    }

    navigateToCreateNewLabel = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('CreateLabel')
        onPress();
    }

    navigateToArchiveScreen = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Archived'})
        onPress();
    } 

    navigateLabelScreen = (labelAndKey) => {
        const {onPress} = this.props
        this.props.storelabelAndKey(labelAndKey)
        this.props.props.navigation.push('Home', { screen: 'Label'})
        onPress();
    }

    navigateToRemainderScreen = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Remainder'})
        onPress();
    }

    render() {
        return(
            <View style = {{flex: 1}}>
                <Text style = {DrawContentStyles.AppName_Style}>{strings.AppName}</Text>
                <DrawerContentScrollView>
                    <Drawer.Item 
                        icon = 'lightbulb-outline' 
                        label = {strings.Notes} 
                        onPress = {this.navigateToHome}/>
                    
                    <Drawer.Item 
                        icon = 'bell-outline' 
                        label = {strings.Reminders} 
                        style = {DrawContentStyles.drawer_Section_style} 
                        onPress = {this.navigateToRemainderScreen}/>
                        {this.props.state.createLabelReducer.labelsAndLabelKeys.map((labelAndKey) => (
                            <Drawer.Item 
                                key = {labelAndKey.lebelKey} 
                                icon = 'label-outline' 
                                label = {labelAndKey.labelName} 
                                onPress = {() => this.navigateLabelScreen(labelAndKey)}/>
                            ))
                        }
                    <Drawer.Item 
                        icon = 'plus' 
                        label = {strings.Createnewlabel} 
                        onPress = {this.navigateToCreateNewLabel} 
                        style = {DrawContentStyles.drawer_Section_style}/>
                    <Drawer.Item 
                        icon = 'archive-arrow-down-outline' 
                        label = {strings.Archive} 
                        onPress = {this.navigateToArchiveScreen}/>
                    <Drawer.Item 
                        icon = 'delete' 
                        label = {strings.Deleted} 
                        style = {DrawContentStyles.drawer_Section_style} 
                        onPress = {this.handleDeletedIconButton}/>
                    <Drawer.Item 
                        icon = 'cog-outline' 
                        label = {strings.Settings}/>
                    <Drawer.Item 
                        icon = 'help' 
                        label = {strings.HelpfeedBack}/>
                </DrawerContentScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        storelabelAndKey : (labelAndKey) => dispatch(storelabelAndKey(labelAndKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)