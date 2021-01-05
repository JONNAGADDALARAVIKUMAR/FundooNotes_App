import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle';
import {strings} from '../../Languages/strings'
import { connect } from 'react-redux';
import UserNoteServices from '../../../services/UserNoteServices';

class DrawerContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labels: []
        }
    }

    componentDidMount = async () => {
        await UserNoteServices.getLabelsFromFirebase(this.props.userId)
        .then(async (labelContent) => {
            this.setState({
                labels: Object.keys(labelContent)
            })
        })
        .catch(error => console.log(error))
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
                    {this.state.labels.map(label => (
                        <Drawer.Item key = {label} icon = 'label-outline' label = {label} onPress = {this.navigateToCreateNewLabel} style = {DrawContentStyles.drawer_Section_style}/>
                    ))}
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

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labels : state.createLabelReducer.labels
    }
}

export default connect(mapStateToProps)(DrawerContent)