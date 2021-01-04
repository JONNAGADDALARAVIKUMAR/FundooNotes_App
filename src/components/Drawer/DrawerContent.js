import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle';
import {strings} from '../../Languages/strings'

export default class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }

    navigateToHome = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Notes' })
        //onPress();
    }

    handleDeletedIconButton = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('Home', { screen: 'Deleted' })
        //onPress();
    }

    navigateToCreateNewLabel = () => {
        const {onPress} = this.props
        this.props.props.navigation.closeDrawer()
        this.props.props.navigation.push('CreateLabel')
        //onPress();
    }

    render() {
    return(
        <View style = {{flex: 1}}>
            <Text style = {DrawContentStyles.AppName_Style}>{strings.AppName}</Text>
            <DrawerContentScrollView>
                    <Drawer.Item icon = 'lightbulb-outline' label = {strings.Notes} onPress = {this.navigateToHome}/>
                    <Drawer.Item icon = 'bell-outline' label = {strings.Reminders}  style = {DrawContentStyles.drawer_Section_style}/>
                    <Drawer.Item icon = 'plus' label = {strings.Createnewlabel} onPress = {this.navigateToCreateNewLabel} style = {DrawContentStyles.drawer_Section_style}/>
                    <Drawer.Item icon = 'archive-arrow-down-outline' label = {strings.Archive}/>
                    <Drawer.Item icon = 'delete' label = {strings.Deleted} style = {DrawContentStyles.drawer_Section_style} onPress = {this.handleDeletedIconButton}/>
                    <Drawer.Item icon = 'cog-outline' label = {strings.Settings}/>
                    <Drawer.Item icon = 'help' label = {strings.HelpfeedBack}/>
            </DrawerContentScrollView>
        </View>
        )
    }
}