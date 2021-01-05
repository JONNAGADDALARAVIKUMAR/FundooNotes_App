import React, {Component} from 'react';
import {TextInput, Text, TouchableWithoutFeedback, View} from 'react-native';
import LabelAppBarStyle from '../../../styles/LabelAppbarStyle';
import {Appbar} from 'react-native-paper';
import {storeLabelContent} from '../../redux/actions/CreateNewLabelAction'
import { connect } from 'react-redux';
import UserNoteServices from '../../../../services/UserNoteServices'

class showLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit : false,
            editTextInput : this.props.labelContent[this.props.labelKey].labelName,
            emptyMsg : false,
            errorMsg : false,
        }
    }

    handleCheckButton = async () => {
        if(!this.state.errorMsg && !this.state.emptyMsg) {
            UserNoteServices.updateLabelInFirebase(this.props.userId, this.props.labelKey, this.state.editTextInput)
                .then(() => {
                    UserNoteServices.getLabelsFromFirebase()
                    .then(async data => {
                        let labels = data ? data : {}
                        this.props.storeLabelContent(labels)
                        this.setState({
                            edit : false
                        })
                    }) 
                })
                .catch(error => console.log(error))
        }
    }

    handleEditButton = () => {
        this.setState({
            edit : true
        })
    }

    handleEditTextInput = async (editText, labelKey) => {
        let labelId = Object.keys(this.props.labelContent);
        let temp = []
        if(labelId.length > 0) {
            labelId.map(key => {
                temp.push(this.props.labelContent[key].labelName.toLowerCase())
            })
        }
        await this.setState({
            editTextInput : editText
        })
        if(this.state.editTextInput == '') {
            await this.setState({
                emptyMsg : true,
            })
        }
        else {
            await this.setState({
                emptyMsg : false
            })
            if(temp.includes(this.state.editTextInput.toLowerCase()) && this.state.editTextInput.toLowerCase() != this.props.labelContent[labelKey].labelName.toLowerCase()){
                await this.setState({
                    errorMsg : true,
                })
            }
            else {
                await this.setState({
                    errorMsg : false,
                })
            }
        }
    }

    handleDeleteButton = async () => {
        await UserNoteServices.deleteLabelInFirebase(this.props.userId, this.props.labelKey)
            .then(async () => {
                this.props.updateLabels
                await UserNoteServices.getLabelsFromFirebase()
                    .then(async data => {
                        let labels = data ? data : {}
                        await this.props.storeLabelContent(labels)
                        this.setState({
                            edit : false
                        })
                    }) 
            })
            .catch(error => console.log(error))

    }

    render() {
        return(
            <Appbar style = {{backgroundColor : 'transparent'}}>
                {
                    (this.state.edit) ?
                    <Appbar.Action 
                        icon = 'delete-outline'
                        style = {{marginLeft : 10}}
                        onPress = {this.handleDeleteButton}/>
                    :
                    <Appbar.Action 
                        icon = 'label-outline'
                        style = {{marginLeft : 10}}/> 
                }
                {
                    (this.state.edit)?
                    <View style = {{flexDirection :'column', width : '65%'}}>
                        <TextInput
                            style = {(this.state.errorMsg || this.state.emptyMsg) ? LabelAppBarStyle.textinput_error_style : LabelAppBarStyle.textinput_style}
                            autoFocus = {true}
                            onChangeText = {(text) => this.handleEditTextInput(text, this.props.labelKey)}
                            value = {this.state.editTextInput}
                        />
                        {
                            (this.state.emptyMsg) ?
                                <Text style = {LabelAppBarStyle.text_error_style}>
                                    Enter a Label Name
                                </Text>
                                :
                                (this.state.errorMsg) ?
                                    <Text style = {LabelAppBarStyle.text_error_style}>
                                        Label Already Exist
                                    </Text>
                                    :
                                    null
                        }
                    </View>
                    :
                    <TouchableWithoutFeedback onPress = {this.handleEditButton}>
                        <View style = {{width : '65%'}}>
                            <Text
                                style = {LabelAppBarStyle.text_style}>
                                {this.props.labelContent[this.props.labelKey].labelName}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <Appbar.Content/>
                {
                    (this.state.edit) ?
                    <Appbar.Action 
                        icon = 'check'
                        onPress = {this.handleCheckButton}/>
                    :
                    <Appbar.Action 
                        icon = 'pencil'
                        onPress = {this.handleEditButton}/>
                }
            </Appbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelContent) => dispatch(storeLabelContent(labelContent)),
        storeNoteKeys : (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(showLabel)