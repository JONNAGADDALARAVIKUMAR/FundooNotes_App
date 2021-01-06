import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Appbar } from 'react-native-paper';
import CreateNewLabelStyles from '../../../styles/CreateNewLabelStyles';
import UserNoteServices from '../../../../services/UserNoteServices';
import { connect } from 'react-redux';
import {storeLabelContent, storeNoteKeys} from '../../../redux/actions/CreateNewLabelAction';
import ShowLabels from './ShowLabels'
import { ScrollView } from 'react-native-gesture-handler';


class CreateLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            enteredLabel: '',
            labelContent: [],
            labelNoteKeys: [],
            labelExistErrorMessage: false
        }
    }

    componentDidMount = async () => {
        await this.setState({
            labelContent: this.props.labelContent,
        })
    }

    navigateToPreviousScreen = () => {
        this.props.navigation.goBack()
    }

    handleText = (text) => {
        let labels = []
        this.props.labels.map(label => {
            labels.push(label.toLowerCase())
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
        this.setState({
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
                    labels.push(labelContent[key].labelName)
                })
                await this.setState({
                    labelNoteKeys: tempKeys,
                    labelContent: labelContent,
                    enteredLabel: '',
                    labelExistErrorMessage: false
                })
                await this.props.storeLabelContent(this.state.labelContent)
                await this.props.storeNoteKeys(this.state.labelNoteKeys)
            })
            .catch(error => console.log(error))
    }

    createLabel = async () => {
        if(this.state.enteredLabel != '' && !this.state.labelExistErrorMessage) {
            await UserNoteServices.addLabelToTheFirebase(this.props.userId, this.state.enteredLabel)
        }
        this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive,
        })
        this.updateLabels()
    }

    render() {
        return(
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
                        style = {{ backgroundColor : 'transparent', 
                                    paddingBottom : 0,
                        }}
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
                                        index = {index}/>
                                </React.Fragment>
                            ))
                        : null}
                    </View>
                    </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        labels: state.createLabelReducer.labels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelContent) => dispatch(storeLabelContent(labelContent)),
        storeNoteKeys: (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabelScreen)