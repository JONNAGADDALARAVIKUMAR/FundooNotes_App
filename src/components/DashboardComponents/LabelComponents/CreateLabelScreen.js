import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Appbar, Provider, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import CreateNewLabelStyles from '../../../styles/CreateNewLabelStyles';
import UserNoteServices from '../../../../services/UserNoteServices';
import { connect } from 'react-redux';
import {storeDailogStatus, storelabelsAndLabelKeys} from '../../../redux/actions/CreateNewLabelAction';
import ShowLabels from './ShowLabels'
import { ScrollView } from 'react-native-gesture-handler';
import SQLiteLabelServices from '../../../../services/SQLiteLabelServices';


class CreateLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            activeLabel: '',
            enteredLabel: '',
            labelExistErrorMessage: false,
            labels: this.props.labelsAndLabelKeys
        }
    }

    componentDidMount = async () => {
        this.updateLabels()
    }

    updateLabels = () => {
        SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.userId)
            .then(async results => {
                let labels = [];
                if(results.rows.length > 0) {
                    for(let i = 0; i<results.rows.length; i++ ) {
                        labels.push(results.rows.item(i))
                    }
                    this.setState({
                        labels: labels
                    })
                } else {
                    this.setState({
                        labels: []
                    })
                }
                this.props.storelabelsAndLabelKeys(labels)
            })
            .catch(error => console.log(error))
    }

    selectActiveLabel = (labelKey) => {
        this.setState({
            activeLabel : labelKey,
            createNewLabelTextboxActive: false
        })
    }

    navigateToPreviousScreen = () => {
        this.props.navigation.goBack()//push('Home', {screen: 'Notes'})
    }

    handleText = async (text) => {
        let labels = []
        this.props.labelsAndLabelKeys.map(label => {
            labels.push(label.labelName.toLowerCase())
        })
        if(labels.includes(text.toLowerCase())) {
            this.setState({
                labelExistErrorMessage: true
            })
        } else {
            this.setState({
                labelExistErrorMessage: false
            })
        }
        await this.setState({
            enteredLabel: text
        })
    }

    cancelLabel = () => {
        this.setState({
            enteredLabel: '',
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive
        })
        console.log('canceled');
    }

    changeToCreateLabel = () => {
        this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive,
        })
    }

    createLabel = async () => {
        if(this.state.enteredLabel != '' && !this.state.labelExistErrorMessage) {
            await SQLiteLabelServices.storeLabelinSQliteStorage(this.props.userId, this.state.enteredLabel)
            .then(async (results) => {
                this.updateLabels()
                await UserNoteServices.addLabelToTheFirebase(this.props.userId, this.state.enteredLabel)})
            .catch(error => console.log(error))
        }
        this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive,
        })
    }

    hideDialog() {
        this.props.storeDailogStatus(false)
    }

    handleDeleteButton = async () => {
        await SQLiteLabelServices.deleteLabel(this.props.userId, this.props.deleteLabelKey)
        await UserNoteServices.deleteLabelInFirebase(this.props.userId, this.props.deleteLabelKey)
        this.props.storeDailogStatus(false)
        this.updateLabels()
    }

    render() {
        return(
            <Provider>
            <View style = {CreateNewLabelStyles.backGround_Style}>
                <Appbar style = {CreateNewLabelStyles.appbar_Style}>
                    <Appbar.Action
                        icon = "keyboard-backspace"
                        onPress= {this.navigateToPreviousScreen}
                    />
                    <Text style = {CreateNewLabelStyles.edit_LabelStyle}>
                        Edit labels
                    </Text>
                </Appbar>
                <Appbar style = {(this.state.createNewLabelTextboxActive) ? CreateNewLabelStyles.appbar_Style_Active : CreateNewLabelStyles.appbar_Style}>
                    <Appbar.Action
                        icon = {(this.state.createNewLabelTextboxActive) ? "close" : "plus"}
                        onPress= {(this.state.createNewLabelTextboxActive) ? this.cancelLabel : this.changeToCreateLabel}
                        style = {{marginRight: '10%'}}
                    />
                    {this.state.createNewLabelTextboxActive ? 
                    <View style = {{flexDirection :'column', width : '65%'}}>
                    <TextInput
                        style = {{ backgroundColor : 'transparent', paddingBottom : 0,}}
                        placeholder = {'Create new Label'}
                        autoFocus = {this.state.createNewLabelTextboxActive}
                        onChangeText = {this.handleText}
                        onEndEditing = {this.createLabel}
                        />
                        {this.state.labelExistErrorMessage ?
                            (<Text style = {{ fontSize : 12, 
                                                color : 'red', 
                                                paddingLeft : 10}}>
                                Label Already exist
                            </Text>)
                            : null}
                        </View>
                    : <TouchableOpacity 
                        onPress = {this.changeToCreateLabel} 
                        style = {{width: '65%'}}>
                            <Text 
                                style = {{color: 'gray'}}>
                                    Create new Label
                            </Text>
                    </TouchableOpacity>}
                    <Appbar.Action
                        icon = {(this.state.createNewLabelTextboxActive) ? "check" : undefined}
                        onPress= {(this.state.createNewLabelTextboxActive) ? this.createLabel : null}
                    />
                </Appbar>
                    <ScrollView>
                    <View>
                        {
                            this.state.labels.length > 0 ?
                            this.state.labels.map((label) => ( 
                                <React.Fragment key = {label.lebelKey}>
                                    <ShowLabels 
                                        label = {label} 
                                        labelKey = {label.lebelKey}
                                        labelName = {label.labelName}
                                        selectActiveLabel = {this.selectActiveLabel}
                                        activeLabel = {this.state.activeLabel}/>
                                </React.Fragment>
                            ))
                        : null}
                    </View>
                    </ScrollView>
                    <Portal>
                    <Dialog style = {{height: 100}} visible = {this.props.showDailog}>
                        <Dialog.Content>
                            <Paragraph>
                                Delete this Label forever ?
                            </Paragraph>
                            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Dialog.Actions>
                                    <Button onPress = {() => this.hideDialog()}>Cancel</Button>
                                </Dialog.Actions>
                                <Dialog.Actions>
                                    <Button onPress = {this.handleDeleteButton}>Delete</Button>
                                </Dialog.Actions>
                        </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
            </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        showDailog: state.createLabelReducer.showDailog,
        deleteLabelKey: state.createLabelReducer.deleteLabelKey,
        labelsAndLabelKeys: state.createLabelReducer.labelsAndLabelKeys
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeDailogStatus : (showDailog) => dispatch(storeDailogStatus(showDailog)),
        storelabelsAndLabelKeys : (labelsAndLabelKeys) => dispatch(storelabelsAndLabelKeys(labelsAndLabelKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabelScreen)