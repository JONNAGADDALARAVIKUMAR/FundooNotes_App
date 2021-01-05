import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Appbar } from 'react-native-paper';
import CreateNewLabelStyles from '../../../styles/CreateNewLabelStyles';
import UserNoteServices from '../../../../services/UserNoteServices';
import { connect } from 'react-redux';
import {storeLabels} from '../../redux/actions/CreateNewLabelAction';


class CreateLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            enteredLabel: '',
            labels: [],
            activeLabel: '',
            labelAutoFocus: false,
            renamedLabel: ''
        }
    }

    componentDidMount = async () => {
        this.updateLabels()
    }

    updateLabels = async () => {
        await UserNoteServices.getLabelsFromFirebase(this.props.userId)
        .then(async (labelContent) => {
            this.setState({
                labels: Object.keys(labelContent)
            })
            await this.props.storeLabels(this.state.labels)
        })
        .catch(error => console.log(error))
    }

    navigateToPreviousScreen = () => {
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    createLabel = async () => {
        await this.setState({
            createNewLabelTextboxActive: !this.state.createNewLabelTextboxActive
        })
        if(this.state.enteredLabel != '') {
            await UserNoteServices.addLabelToTheFirebase(this.props.userId, this.state.enteredLabel)
            this.setState({
                enteredLabel: ''
            })
            this.updateLabels()
        }
    }

    handleText = (text) => {
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
            activeLabel: ''
        })
    }

    editLabel = (label) => {
        this.setState({
            activeLabel: label,
            createNewLabelTextboxActive: false,
            labelAutoFocus: true
        })
    }

    handleLabelTexttoRename = async (renamedLabel) => {
        let tempArray = this.state.labels
        for(let i = 0; i < this.state.labels.length; i++) {
            if(this.state.labels[i] == this.state.activeLabel)
               tempArray[i] = renamedLabel
            this.setState({
                labels: tempArray
            })
        }
        // await this.setState({
        //     renamedLabel: renamedLabel,
        // })
        console.log(renamedLabel);
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
                    <TextInput
                        placeholder = {'Create new Label'}
                        style = {{width: '60%'}}
                        autoFocus = {this.state.createNewLabelTextboxActive}
                        onChangeText = {this.handleText}
                        />
                    : <TouchableOpacity 
                        onPress = {this.changeToCreateLabel} 
                        style = {{width: '60%'}}>
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
                {this.props.labels.map(label => (
                    <Appbar style = {(this.state.activeLabel == label) ? CreateNewLabelStyles.appbar_Style_Active : CreateNewLabelStyles.appbar_Style} key = {label}>
                        <Appbar.Action
                        icon = {(this.state.activeLabel == label) ? "delete-outline" : "label-outline"}/>
                        {(this.state.activeLabel == label) 
                        ? (<TextInput 
                            style = {{marginLeft: 30}}
                            value = {label}
                            autoFocus = {this.state.labelAutoFocus}
                            onChangeText = {this.handleLabelTexttoRename}/>) 
                        : (<TouchableOpacity 
                            onPress = {() => this.editLabel(label)} 
                            style = {{width: '60%', marginLeft: 20}}>
                                <Text 
                                    style = {{color: 'black'}}>
                                        {label}
                                </Text>
                    </TouchableOpacity>)}
                    </Appbar>
                ))}
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

const mapDispatchToProps = dispatch => {
    return {
        storeLabels : (labels) => dispatch(storeLabels(labels))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabelScreen)