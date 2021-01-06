import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Appbar, Checkbox, TouchableRipple} from 'react-native-paper';
import { connect } from 'react-redux';
import {storeSelectedLabelKey} from '../../../redux/actions/CreateNewLabelAction'

class SelectLabelAppbar extends Component {
    constructor(props) {
        super(props)
    }

    handleCheckbox = async (noteKey) => {
        if(this.props.selectedLabelKey == noteKey) {
            await this.props.storeSelectedLabelKey(null)
        }
        else 
        await this.props.storeSelectedLabelKey(noteKey)
    }

    render() {
        return (
            <View>
                <TouchableRipple onPress = {() => console.log('press')}>
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'label-outline' />
                        <Appbar.Content
                            title = {this.props.labelContent[this.props.noteKey].labelName}
                            titleStyle = {{fontSize : 18}} />
                        <View
                            style = {{marginRight : 10}}>
                            <Checkbox 
                                status = {this.props.selectedLabelKey == this.props.noteKey ? 'checked' : 'unchecked'}
                                onPress = {() => this.handleCheckbox(this.props.noteKey)}
                                uncheckedColor = 'black'
                                color = '#912c4c'/>
                        </View>
                    </Appbar>
                </TouchableRipple>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        selectedLabelKey : state.createLabelReducer.selectedLabelKey,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeSelectedLabelKey : (selectedLabelKey) => dispatch(storeSelectedLabelKey(selectedLabelKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLabelAppbar)