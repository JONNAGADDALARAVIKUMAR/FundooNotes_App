import React, {Component} from 'react';
import {TextInput, Text, TouchableWithoutFeedback, View, TouchableOpacity} from 'react-native';
import LabelAppBarStyle from '../../../styles/LabelAppbarStyle';
import {Appbar} from 'react-native-paper';
import {storeLabelContent, storeNoteKeys, storeDailogStatus, storeDeleteKey} from '../../../redux/actions/CreateNewLabelAction'
import { connect } from 'react-redux';
import UserNoteServices from '../../../../services/UserNoteServices';
import SQLiteLabelServices from '../../../../services/SQLiteLabelServices';

class showLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit : false,
            editLabel : '',
            editTextInput : this.props.label.labelName,
            emptyMsg : false,
            errorMsg : false,
            noteKeys: [],
            showDailog: false,
            labels: []
        }
    }

    handleCheckButton = async () => {
        if(!this.state.errorMsg && !this.state.emptyMsg) {
            this.props.selectActiveLabel('')
            if(!this.state.emptyMsg && !this.state.errorMsg)
            SQLiteLabelServices.updateLabelinSQliteStorage(this.props.userId, this.state.editTextInput, this.props.labelKey)
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

    handleEditButton = () => {
       this.props.selectActiveLabel(this.props.label.labelName)
    }

    handleEditTextInput = async (editText) => {
        SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.userId)
            .then(async results => {
                let labels = [];
                if(results.rows.length > 0) {
                    for(let i = 0; i < results.rows.length; i++ ) {
                        labels.push(results.rows.item(i))
                    }
                }
                await this.setState({
                    labels: labels
                })
            })
            .catch(error => console.log(error))
            
        
        let temp = []
        if(this.state.labels.length > 0) {
            this.state.labels.map(label => {
                temp.push(label.labelName.toLowerCase())
            })
        }
        this.props.selectActiveLabel(editText)
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
                this.state.editTextInput.toLowerCase() != this.props.labelName.toLowerCase()){
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
        this.props.selectActiveLabel('')
        this.props.storeDailogStatus(true)
        this.props.storeDeleteKey(this.props.labelKey)
    }

    hideDialog() {
        this.setState({
            showDailog: false
        })
    }

    render() {
        return(
                <View>
                    <Appbar style = {(this.props.activeLabel == this.state.editTextInput) ? LabelAppBarStyle.active_Appbar_Style : LabelAppBarStyle.appbar_Style}>
                    {
                    (this.props.activeLabel == this.state.editTextInput) ?
                    <Appbar.Action 
                        onPress = {this.handelDeleteIcon}
                        icon = 'delete-outline'
                        style = {{marginLeft : 10}}
                        />
                    :
                    
                    <Appbar.Action 
                        onPress = {this.handleEditButton}
                        icon = 'label-outline'
                        style = {{marginLeft : 10}}/> 
                    
                }
                {
                    (this.props.activeLabel == this.state.editTextInput)?
                    <View style = {{flexDirection :'column', 
                                    width : '65%'}}>
                        <TextInput
                            style = {(this.state.errorMsg || this.state.emptyMsg) ? LabelAppBarStyle.textinput_error_style : LabelAppBarStyle.textinput_style}
                            autoFocus = {true}
                            onChangeText = {this.handleEditTextInput}
                            onFocus = {this.handleEditButton}
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
                                {this.state.editTextInput}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <Appbar.Content/>
                {
                    ((this.props.activeLabel == this.state.editTextInput) ?
                        <Appbar.Action 
                        onPress = {this.handleCheckButton}
                        icon = 'check'
                        />
                    : <Appbar.Action 
                        onPress = {this.handleEditButton}
                        icon = 'pencil'
                        />
                    )}
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