import React, {Component} from 'react'
import {View} from 'react-native'
import {Appbar, Checkbox, TouchableRipple} from 'react-native-paper';
import { connect } from 'react-redux';
import {storeSelectedLabelKeys} from '../../../redux/actions/CreateNewLabelAction'

class SelectLabelAppbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLabelKeys: this.props.selectedLabelKeys
        }
        console.log(this.props.labelKey);
    }

    handleCheckbox = async (noteKey) => {
        let selectedLabels = this.props.selectedLabelKeys
        if(selectedLabels.includes(noteKey)) {
            let index = selectedLabels.indexOf(noteKey)
            selectedLabels.splice(index, 1)
            this.setState({
                selectedLabelKeys: selectedLabels
            }, () => this.props.storeSelectedLabelKeys(selectedLabels))
        }
        else {
            await selectedLabels.push(noteKey)
            this.setState({
                selectedLabelKeys: selectedLabels
            }, () => this.props.storeSelectedLabelKeys(selectedLabels))
        }
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
                            title = {this.props.labelName}
                            titleStyle = {{fontSize : 18}} />
                        <View
                            style = {{marginRight : 10}}>
                            <Checkbox 
                                status = {this.state.selectedLabelKeys.includes(this.props.labelKey) ? 'checked' : 'unchecked'}
                                onPress = {() => this.handleCheckbox(this.props.labelKey)}
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
        selectedLabelKeys : state.createLabelReducer.selectedLabelKeys,
        labelsAndLabelKeys: state.createLabelReducer.labelsAndLabelKeys
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLabelAppbar)