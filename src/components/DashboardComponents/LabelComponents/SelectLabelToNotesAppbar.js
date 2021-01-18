import React, {Component} from 'react'
import {View} from 'react-native'
import {Appbar, Checkbox, TouchableRipple} from 'react-native-paper';
import { connect } from 'react-redux';
import {storeSelectedLabelKeys} from '../../../redux/actions/CreateNewLabelAction'

class SelectLabelAppbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLabelKeys: this.props.state.createLabelReducer.selectedLabelKeys
        }
    }

    handleCheckbox = async (noteKey) => {
        let selectedLabels = this.props.state.createLabelReducer.selectedLabelKeys
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
    return {state}
}
const mapDispatchToProps = dispatch => {
    return {
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLabelAppbar)