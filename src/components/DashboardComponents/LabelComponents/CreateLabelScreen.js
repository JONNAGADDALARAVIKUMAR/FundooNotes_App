import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Appbar, Provider, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import CreateNewLabelStyles from '../../../styles/CreateNewLabelStyles';
import UserNoteServices from '../../../../services/UserNoteServices';
import { connect } from 'react-redux';
import {storeLabelContent, storeNoteKeys, storeDailogStatus, storeLabels} from '../../../redux/actions/CreateNewLabelAction';
import ShowLabels from './ShowLabels'
import { ScrollView } from 'react-native-gesture-handler';
import SQLiteStorageServices from '../../../../services/SQLiteStorageServices';
import SQLiteLabelServices from '../../../../services/SQLiteLabelServices';


class CreateLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            activeLabel: '',
            enteredLabel: '',
            labelContent: [],
            labelNoteKeys: [],
            labelExistErrorMessage: false,
        }
    }

    componentDidMount = async () => {
        await this.setState({
            labelContent: this.props.labelContent,
        })
    }

    selectActiveLabel = (labelKey) => {
        this.setState({
            activeLabel : labelKey,
            createNewLabelTextboxActive: false
        })
    }

    navigateToPreviousScreen = () => {
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    handleText = async (text) => {
        let labels = []
        this.props.labels.map(label => {
            labels.push(label.toLowerCase())
            console.log(labels);
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

    updateLabels = async () => {
        await UserNoteServices.getLabelsFromFirebase()
            .then(async (labelContent) => {
                let tempKeys = Object.keys(labelContent)
                let labels = []
                tempKeys.map(key => {
                    labels.push(labelContent[key].label.labelName)
                })
                await this.setState({
                    labelNoteKeys: tempKeys,
                    labelContent: labelContent,
                    enteredLabel: '',
                    labelExistErrorMessage: false
                })
                await this.props.storeLabelContent(this.state.labelContent)
                await this.props.storeNoteKeys(this.state.labelNoteKeys)
                await this.props.storeLabels(labels)
            })
            .catch(error => console.log(error))
    }

    createLabel = async () => {
        if(this.state.enteredLabel != '' && !this.state.labelExistErrorMessage) {
            await SQLiteLabelServices.storeLabelinSQliteStorage(this.props.userId, this.state.enteredLabel)
            .then(async (results) => {
                console.log('---',results);
                await UserNoteServices.addLabelToTheFirebase(this.props.userId, this.state.enteredLabel)})
            .catch(error => console.log(error))
        }
        this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive,
        }, () => this.updateLabels())
    }

    hideDialog() {
        this.props.storeDailogStatus(false)
    }

    handleDeleteButton = async () => {
        await UserNoteServices.deleteLabelInFirebase(this.props.userId, this.props.deleteLabelKey)
            .then(async () => {
                await UserNoteServices.getLabelsFromFirebase()
                    .then(async data => {
                        let labels = data ? data : {}
                        let tempKeys = Object.keys(labels)
                        this.props.storeNoteKeys(tempKeys)
                        this.props.storeDailogStatus(false)
                    }, () => {
                        this.props.storeLabelContent(labels)
                    }) 
            })
            .catch(error => console.log(error))
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
                            this.props.labelNoteKeys.length > 0 ?
                            this.props.labelNoteKeys.map((key, index) => (
                                <React.Fragment key = {key}>
                                    <ShowLabels 
                                        labelKey = {key} 
                                        index = {index}
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
        labelContent : state.createLabelReducer.labelContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        labels: state.createLabelReducer.labels,
        showDailog: state.createLabelReducer.showDailog,
        deleteLabelKey: state.createLabelReducer.deleteLabelKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelContent) => dispatch(storeLabelContent(labelContent)),
        storeNoteKeys: (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys)),
        storeDailogStatus : (showDailog) => dispatch(storeDailogStatus(showDailog)),
        storeLabels : (labels) => dispatch(storeLabels(labels))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabelScreen)