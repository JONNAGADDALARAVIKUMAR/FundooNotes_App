import React, {Component} from 'react';
import {TextInput, Text, TouchableWithoutFeedback, View, TouchableOpacity} from 'react-native';
import LabelAppBarStyle from '../../../styles/LabelAppbarStyle';
import {Appbar} from 'react-native-paper';
import {storeLabelContent, storeNoteKeys, storeDailogStatus, storeDeleteKey} from '../../../redux/actions/CreateNewLabelAction'
import { connect } from 'react-redux';
import UserNoteServices from '../../../../services/UserNoteServices'

class showLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit : false,
            editLabel : '',
            editTextInput : this.props.labelContent[this.props.labelKey].labelName,
            emptyMsg : false,
            errorMsg : false,
            noteKeys: [],
            showDailog: false
        }
    }

    handleCheckButton = async () => {
        if(!this.state.errorMsg && !this.state.emptyMsg) {
            this.setState({
                editLabel: ''
            })
            UserNoteServices.updateLabelInFirebase(this.props.userId, this.props.labelKey, this.state.editTextInput)
                .then(() => {
                    UserNoteServices.getLabelsFromFirebase()
                    .then(async data => {
                        let labels = data ? data : {}
                        let tempKeys = []
                        tempKeys = Object.keys(labels)
                        await this.props.storeLabelContent(labels)
                        await this.setState({
                            edit : false,
                            noteKeys : tempKeys,
                        })
                        await this.props.storeNoteKeys(this.state.noteKeys)
                    }) 
                })
                .catch(error => console.log(error))
        }
    }

    handleEditButton = (key) => {
        this.setState({
            editLabel : this.props.labelContent[key].labelName,
            edit: true
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
            if(temp.includes(this.state.editTextInput.toLowerCase()) && 
                this.state.editTextInput.toLowerCase() != this.props.labelContent[labelKey].labelName.toLowerCase()){
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

    handelDeleteIcon = () => {
       this.props.storeDailogStatus(true)
       this.props.storeDeleteKey(this.props.labelKey)
       this.setState({
        edit : false,
       })
    }

    hideDialog() {
        this.setState({
            showDailog: false
        })
    }

    handleDeleteButton = async () => {
        await UserNoteServices.deleteLabelInFirebase(this.props.userId, this.props.labelKey)
            .then(async () => {
                await UserNoteServices.getLabelsFromFirebase()
                    .then(async data => {
                        let labels = data ? data : {}
                        let tempKeys = []
                        tempKeys = Object.keys(labels)
                        await this.setState({
                            edit : false,
                            noteKeys: tempKeys,
                            showDailog: false
                        }, () => {
                            this.props.storeNoteKeys(this.state.noteKeys)
                            this.props.storeLabelContent(labels)
                        })
                    }) 
            })
            .catch(error => console.log(error))
    }

    render() {
        return(
                <View>
            <Appbar style = {(this.state.editLabel == this.state.editTextInput) ? LabelAppBarStyle.active_Appbar_Style : LabelAppBarStyle.appbar_Style}>
                {
                    (this.state.editLabel == this.state.editTextInput) ?
                    <TouchableOpacity onPress = {this.handelDeleteIcon}>
                    <Appbar.Action 
                        icon = 'delete-outline'
                        style = {{marginLeft : 10}}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {() => this.handleEditButton(this.props.labelKey)}>
                    <Appbar.Action 
                        icon = 'label-outline'
                        style = {{marginLeft : 10}}/> 
                    </TouchableOpacity>
                }
                {
                    (this.state.editLabel == this.state.editTextInput)?
                    <View style = {{flexDirection :'column', 
                                    width : '65%'}}>
                        <TextInput
                            style = {(this.state.errorMsg || this.state.emptyMsg) ? LabelAppBarStyle.textinput_error_style : LabelAppBarStyle.textinput_style}
                            autoFocus = {true}
                            onChangeText = {(text) => this.handleEditTextInput(text, this.props.labelKey)}
                            //onEndEditing = {this.handleCheckButton}
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
                    <TouchableWithoutFeedback onPress = {() => this.handleEditButton(this.props.labelKey)}>
                        <View style = {{width : '65%'}}>
                            <Text
                                style = {LabelAppBarStyle.text_style}>
                                {this.state.editTextInput}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <Appbar.Content/>
                {
                    (this.state.edit) ?
                    <TouchableOpacity onPress = {this.handleCheckButton}>
                        <Appbar.Action 
                        icon = 'check'
                        />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress = {() => this.handleEditButton(this.props.labelKey)}>
                        <Appbar.Action 
                        icon = 'pencil'
                        />
                    </TouchableOpacity>
                }
            </Appbar>
            
        </View>
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
        storeNoteKeys : (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys)),
        storeDailogStatus : (showDailog) => dispatch(storeDailogStatus(showDailog)),
        storeDeleteKey : (deleteLabelKey) => dispatch(storeDeleteKey(deleteLabelKey))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(showLabel)