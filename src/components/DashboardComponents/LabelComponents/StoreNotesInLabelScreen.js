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
            noteKeysAfterSearch : this.props.labelNoteKeys
        }
    }

    handleBackIconButton = () => {
        this.props.navigation.goBack();
    }

    handleSearchTextInput = async (searchText) => {
        await this.setState({
            search : searchText,
        })
        let tempNoteKeys = []
        if(this.state.search != '') {
            this.props.labelNoteKeys.map(noteKey => {
                if(this.props.labelContent[noteKey].label.labelName.toLowerCase().includes(searchText.toLowerCase())) {
                    tempNoteKeys.push(noteKey)
                }
            })
            this.setState({
                noteKeysAfterSearch: tempNoteKeys,
            })
        }
        else {
            await this.setState({
                noteKeysAfterSearch : this.props.labelNoteKeys
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
                            (this.state.noteKeysAfterSearch.length > 0) ?
                                this.state.noteKeysAfterSearch.map((noteKey => (
                                    <React.Fragment key = {noteKey}>
                                        <SelectLabelToNotesAppbar noteKey = {noteKey}/>
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
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
    }
}

export default connect(mapStateToProps)(SelectLabelToNotesScreen)