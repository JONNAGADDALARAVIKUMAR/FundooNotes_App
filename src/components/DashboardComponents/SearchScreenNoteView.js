import React, { Component } from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { Appbar, Card, Chip, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import SearchScreenStyles from '../../styles/SearchScreenStyles';
import moment from 'moment';
import {storeEditNotesDetails, 
    storeNoteKeyToUpdateNotes, 
    storeSelectedLabelKeys} from '../../redux/actions/CreateNewLabelAction';
import { connect } from 'react-redux';

class SearchScreenNoteView extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            SQLiteNotesAfterSearch: [],
            text: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            SQLiteNotesAfterSearch: this.props.SQLiteNotes
        })
    }

    searchNotes = async (text) => {
        let tempArray = []
        for(let i = 0; i < this.props.SQLiteNotes.length; i++) {
            if(this.props.SQLiteNotes[i].Title.toLowerCase().includes(text.toLowerCase()) 
                        && text != '' || this.props.SQLiteNotes[i].Notes.toLowerCase().includes(text.toLowerCase()) 
                        && text != '' ) {
                tempArray.push(this.props.SQLiteNotes[i])
            }
        }
        await this.setState({
            SQLiteNotesAfterSearch: tempArray,
            text: text
        })
    }

    handleDetailsToUpdateSQLite = (noteKey, Title, Notes, isDeleted, isArchived, Labels, remainderTime) => {
        const {onPress} = this.props
        const notes = {
            title: Title,
            note: Notes,
            labels: Labels,
            isArchived: isArchived,
            isDeleted: isDeleted,
            remainderTime: remainderTime
        }
        this.props.storeEditNotesDetails(notes)
        this.props.storeNoteKeyToUpdateNotes(noteKey)
        this.props.storeSelectedLabelKeys(JSON.parse(Labels))

        this.props.navigation.push('AddNewNotes')
        onPress()
    }

    navigateToDashBoard = () => {
        const {onPress} = this.props
        this.props.navigation.push('Home', {screen: 'Notes'})
        onPress()
    }


    render() {
        return(
            <View style = {SearchScreenStyles.backGround_Style}>
                <Appbar style = {SearchScreenStyles.Appbar_Styles}>
                    <Appbar.Action 
                        icon = 'keyboard-backspace'
                        onPress = {this.navigateToDashBoard}/>
                    <TextInput 
                        style = {SearchScreenStyles.searchBox_Style} 
                        autoFocus = {true}
                        placeholder = {'Search Your Notes'}
                        onChangeText = {this.searchNotes}
                    />
                </Appbar>
                <ScrollView>
                    <View style = {NoteViewStyles.list_Style}>
                        {this.state.SQLiteNotesAfterSearch.map(val => ( 
                            <React.Fragment key = {val.NoteKey}>
                                {(!val.isDeleted && !val.isArchived)? (
                                    <Card
                                        style = {NoteViewStyles.list_Container}
                                        onPress = {() => this.handleDetailsToUpdateSQLite(val.NoteKey, val.Title, val.Notes, val.isDeleted, val.isArchived, val.Labels, val.remainderTime) 
                                        }>
                                        <Card.Content>
                                            <Title>
                                                <Highlighter
                                                    highlightStyle = {{backgroundColor: '#f598d7'}}
                                                    searchWords = {[this.state.text]}
                                                    textToHighlight = {val.Title}/>
                                            </Title>
                                            <Paragraph>
                                                <Highlighter
                                                    highlightStyle = {{backgroundColor: '#f598d7'}}
                                                    searchWords = {[this.state.text]}
                                                    textToHighlight = {val.Notes}/>
                                            </Paragraph>
                                            <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                                            {
                                                    JSON.parse(val.remainderTime) != null ?
                                                    <Chip
                                                        style = {(new Date() < new Date(JSON.parse(val.remainderTime))) ? NoteViewStyles.remainder_Styles : NoteViewStyles.remainder_Faded_Styles}
                                                        textStyle = {{fontSize : 12}}
                                                        icon = 'alarm'>
                                                        {moment(JSON.parse(val.remainderTime)).format('D MMM, h.mm a')}
                                                    </Chip>
                                                    :null
                                                }
                                                {(val.Labels.length > 0) ?
                                                    this.props.labels.map(labels => (
                                                        val.Labels.includes(labels.lebelKey) ?
                                                            <React.Fragment key = {labels.lebelKey}>
                                                                <Chip style = {NoteViewStyles.Label_Button_Style}>
                                                                    {labels.labelName}
                                                                </Chip>
                                                            </React.Fragment>
                                                        :
                                                        null
                                                    ))
                                                :
                                                null}
                                            </View>
                                        </Card.Content>  
                                    </Card>)
                                : null}
                            </React.Fragment>
                        ))}
                    </View>  
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeEditNotesDetails : (notes) => dispatch(storeEditNotesDetails(notes)),
        storeNoteKeyToUpdateNotes : (noteKeyToUpdateNotes) => dispatch(storeNoteKeyToUpdateNotes(noteKeyToUpdateNotes)),
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
    }
}

export default connect(null, mapDispatchToProps)(SearchScreenNoteView)