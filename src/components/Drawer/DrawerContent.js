import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawContentStyles from '../../styles/DrawContentStyle';
import {strings} from '../../Languages/strings'
import { connect } from 'react-redux';
import UserNoteServices from '../../../services/UserNoteServices';
import {storeLabelContent, storeNoteKeys, storeLabels} from '../../redux/actions/CreateNewLabelAction'

class DrawerContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelsContent: [],
            labelNoteKeys: [],
            labels: []
        }
    }

    componentDidMount = async () => {
        await UserNoteServices.getLabelsFromFirebase()
        .then(async (labelContent) => {
             let tempKeys = await Object.keys(labelContent)
             let labels = []
             tempKeys.map(key => {
                 labels.push(labelContent[key].label.labelName)
             })
            await this.setState({
                labelNoteKeys: tempKeys,
                labelsContent: labelContent,
                labels: labels
            })
            await this.props.storeLabelContent(this.state.labelsContent)
            await this.props.storeNoteKeys(this.state.labelNoteKeys)
            await this.props.storeLabels(this.state.labels)
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
                    {this.state.labelNoteKeys.map(key => (
                        <Drawer.Item key = {key} icon = 'label-outline' label = {this.state.labelsContent[key].label.labelName} onPress = {this.navigateToCreateNewLabel}/>
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
        labelsContent : state.createLabelReducer.labelsContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        labels : state.createLabelReducer.labels 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelsContent) => dispatch(storeLabelContent(labelsContent)),
        storeNoteKeys : (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys)),
        storeLabels : (labels) => dispatch(storeLabels(labels))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)