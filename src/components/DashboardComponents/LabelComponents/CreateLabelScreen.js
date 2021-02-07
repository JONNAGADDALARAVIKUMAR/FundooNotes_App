import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Appbar, Provider, Portal, Dialog, Paragraph, Button, Snackbar} from 'react-native-paper';
import CreateNewLabelStyles from '../../../styles/CreateNewLabelStyles';
import UserNoteServices from '../../../../services/UserNoteServices';
import { connect } from 'react-redux';
import {storeDailogStatus, storelabelsAndLabelKeys} from '../../../redux/actions/CreateNewLabelAction';
import ShowLabels from './ShowLabels'
import { ScrollView } from 'react-native-gesture-handler';
import SQLiteLabelServices from '../../../../services/SQLiteLabelServices';
import {strings} from '../../../Languages/strings'


class CreateLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            activeLabel: '',
            activeLabelIndex: null,
            enteredLabel: '',
            labelExistErrorMessage: false,
            labels: this.props.state.createLabelReducer.labelsAndLabelKeys,
            errorMessage: '',
            showErrorSnackbar: false
        }
    }

    componentDidMount = async () => {
        this.updateLabels()
    }

    updateLabels = () => {
        SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.state.createLabelReducer.userId)
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
            .catch((error) => {
                this.setState({
                    errorMessage: error.message,
                    showErrorSnackbar: true
                })
            })
    }

    selectActiveLabel = (labelKey, activeLabelIndex) => {
        this.setState({
            activeLabel : labelKey,
            createNewLabelTextboxActive: false,
            activeLabelIndex: activeLabelIndex
        })
    }

    navigateToPreviousScreen = () => {
        this.props.navigation.goBack()
    }

    handleText = async (text) => {
        let labels = []
        this.props.state.createLabelReducer.labelsAndLabelKeys.map(label => {
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
            let labelKey = this.generateRandomLabelKey()
            await SQLiteLabelServices.storeLabelinSQliteStorage(this.props.state.createLabelReducer.userId, this.state.enteredLabel, labelKey)
            .then(async (results) => {
                this.updateLabels()
                await UserNoteServices.addLabelToTheFirebase(this.props.state.createLabelReducer.userId, this.state.enteredLabel, labelKey)})
            .catch((error) => {
                this.setState({
                    errorMessage: error.message,
                    showErrorSnackbar: true
                })
            })
        }
        this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive,
            enteredLabel: ''
        })
    }

    hideDialog() {
        this.props.storeDailogStatus(false)
    }

    handleDeleteButton = async () => {
        await SQLiteLabelServices.deleteLabel(this.props.state.createLabelReducer.userId, this.props.state.createLabelReducer.deleteLabelKey)
        await UserNoteServices.deleteLabelInFirebase(this.props.state.createLabelReducer.userId, this.props.state.createLabelReducer.deleteLabelKey)
        this.props.storeDailogStatus(false)
        this.updateLabels()
    }

    generateRandomLabelKey = () => {
        var today = new Date()
        var labelNoteKey = ''
        labelNoteKey = today.getFullYear() 
                + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())
        
        return labelNoteKey
    }

    onDismissErrorSnackBar = () => {
        this.setState({
            showErrorSnackbar: false
        })
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
                        {strings.Editlabels}
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
                        placeholder = {strings.CreatenewLabel}
                        autoFocus = {this.state.createNewLabelTextboxActive}
                        onChangeText = {this.handleText}
                        onEndEditing = {this.createLabel}
                        />
                        {this.state.labelExistErrorMessage ?
                            (<Text style = {{ fontSize : 12, 
                                                color : 'red', 
                                                paddingLeft : 10}}>
                                {strings.LabelAlreadyexist}
                            </Text>)
                            : null}
                        </View>
                    : <TouchableOpacity 
                        onPress = {this.changeToCreateLabel} 
                        style = {{width: '65%'}}>
                            <Text 
                                style = {{color: 'gray'}}>
                                    {strings.CreatenewLabel}
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
                            this.state.labels.map((label, index) => ( 
                                <React.Fragment key = {label.lebelKey}>
                                    <ShowLabels 
                                        index = {index}
                                        label = {label} 
                                        labelKey = {label.lebelKey}
                                        labelName = {label.labelName}
                                        selectActiveLabel = {this.selectActiveLabel}
                                        activeLabel = {this.state.activeLabel}
                                        activeLabelIndex = {this.state.activeLabelIndex}/>
                                </React.Fragment>
                            ))
                        : null}
                    </View>
                    </ScrollView>
                    <Portal>
                    <Dialog style = {{height: 100}} visible = {this.props.state.createLabelReducer.showDailog}>
                        <Dialog.Content>
                            <Paragraph>
                                {strings.DeletethisLabelforever}
                            </Paragraph>
                            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Dialog.Actions>
                                    <Button onPress = {() => this.hideDialog()}>{strings.Cancel}</Button>
                                </Dialog.Actions>
                                <Dialog.Actions>
                                    <Button onPress = {this.handleDeleteButton}>{strings.Delete}</Button>
                                </Dialog.Actions>
                        </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                <Snackbar
                    visible = {this.state.showErrorSnackbar}
                    duration = {5000}
                    onDismiss = {this.onDismissErrorSnackBar}>
                    {this.state.errorMessage}
                </Snackbar>
            </View>
            </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        storeDailogStatus : (showDailog) => dispatch(storeDailogStatus(showDailog)),
        storelabelsAndLabelKeys : (labelsAndLabelKeys) => dispatch(storelabelsAndLabelKeys(labelsAndLabelKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabelScreen)