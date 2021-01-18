import React, {Component} from 'react'
import {View, TextInput, ScrollView, Text} from 'react-native'
import StoreNotesInLabelScreenStyles from '../../../styles/StoreNotesInLabelScreenStyles'
import { connect } from 'react-redux'
import {Appbar} from 'react-native-paper';
import SelectLabelToNotesAppbar from './SelectLabelToNotesAppbar';

class SelectLabelToNotesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search : '',
            labelsAndLabelKeysAfterSearch : this.props.state.createLabelReducer.labelsAndLabelKeys,
            labelsAndLabelKeys: this.props.state.createLabelReducer.labelsAndLabelKeys
        }
    }

    componentDidMount = async () => {
        let tempLabelKeys = []
        await this.props.state.createLabelReducer.labelsAndLabelKeys.map(labelNameAndLabelKey => {
            tempLabelKeys.push(labelNameAndLabelKey.lebelKey)
        }, this.setState({
            noteKeysAfterSearch: tempLabelKeys
        }))
    }

    handleBackIconButton = () => {
        this.props.navigation.push('AddNewNotes');
    }

    handleSearchTextInput = async (searchText) => {
        await this.setState({
            search : searchText,
        })
        let tempLabelAndLabelKeys = []
        if(this.state.search != '') {
            this.state.labelsAndLabelKeys.map(labelNameAndKey => {
                if(labelNameAndKey.labelName.toLowerCase().includes(searchText.toLowerCase())) {
                    tempLabelAndLabelKeys.push(labelNameAndKey)
                }
            })
            this.setState({
                labelsAndLabelKeysAfterSearch: tempLabelAndLabelKeys,
            })
        } else {
            await this.setState({
                labelsAndLabelKeysAfterSearch : this.props.state.createLabelReducer.labelsAndLabelKeys,
            })
        }
    }

    render() {
        return (
            <View style = {StoreNotesInLabelScreenStyles.mainContainer}>
                <View style = {StoreNotesInLabelScreenStyles.appbar_container_style}>
                    <Appbar style = {StoreNotesInLabelScreenStyles.header_style}>
                        <Appbar.Action  
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <TextInput    
                            style = {StoreNotesInLabelScreenStyles.textinput_style}
                            placeholder = 'Enter Label Name'
                            onChangeText = {this.handleSearchTextInput}
                            autoFocus = {false}
                            value = {this.state.search}/>
                    </Appbar>
                </View>
                <ScrollView>
                    <View>
                        {
                            (this.state.labelsAndLabelKeysAfterSearch.length > 0) ?
                                this.state.labelsAndLabelKeysAfterSearch.map((labelNameAndKey => (
                                    <React.Fragment key = {labelNameAndKey.lebelKey}>
                                        <SelectLabelToNotesAppbar 
                                                labelKey = {labelNameAndKey.lebelKey} 
                                                labelName = {labelNameAndKey.labelName}/>
                                    </React.Fragment>
                                )))
                            : <Text style = {{alignSelf: 'center', marginTop: 30}}>
                                No Such Label
                            </Text>}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

export default connect(mapStateToProps)(SelectLabelToNotesScreen)