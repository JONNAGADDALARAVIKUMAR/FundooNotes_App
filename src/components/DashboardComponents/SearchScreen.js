import React, { Component } from 'react';
import {TextInput, Text, View, ScrollView} from 'react-native';
import { Appbar, Chip } from 'react-native-paper';
import SearchScreenStyles from '../../styles/SearchScreenStyles';
import { Card, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import SQLiteStorageServices from '../../../services/SQLiteStorageServices';
import Highlighter from 'react-native-highlight-words';
import {storeEditNotesDetails, 
    storeNoteKeyToUpdateNotes, 
    storeSelectedLabelKeys,
    storelabelsAndLabelKeys} from '../../redux/actions/CreateNewLabelAction';
import { connect } from 'react-redux';
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';
import moment from 'moment';

class SearchScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            SQLiteNotes: [],
            SQLiteNotesAfterSearch: [],
            text: '',
            labels: []
        }
    }

    componentDidMount = async () => {
        
        await SQLiteStorageServices.getDetailsFromSQLiteDatabase(false, false)
        .then(async (results) => {
            var temp = []
            if(results.rows.length != 0) {
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                await this.setState({
                    SQLiteNotes : temp
                })
            } 
        })

        SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.state.createLabelReducer.userId)
            .then(async results => {
                if(results.rows.length > 0) {
                    let labels = [];
                    for(let i = 0; i<results.rows.length; i++ ) {
                        labels.push(results.rows.item(i))
                    }
                    await this.setState({
                        labels: labels
                    })
                    this.props.storelabelsAndLabelKeys(labels)
                }
            })
            .catch(error => console.log(error))
    }

    handleDetailsToUpdateSQLite = (noteKey, Title, Notes, isDeleted, isArchived, Labels) => {
        const notes = {
            title: Title,
            note: Notes,
            labels: Labels,
            isArchived: isArchived,
            isDeleted: isDeleted
        }
        this.props.storeEditNotesDetails(notes)
        this.props.storeNoteKeyToUpdateNotes(noteKey)
        this.props.storeSelectedLabelKeys(JSON.parse(Labels))

        this.props.navigation.push('AddNewNotes')
    }

    navigateToDashBoard = () => {
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    searchNotes = async (text) => {
        let tempArray = []
        for(let i = 0; i < this.state.SQLiteNotes.length; i++) {
            if(this.state.SQLiteNotes[i].Title.toLowerCase().includes(text.toLowerCase()) 
                        && text != '' || this.state.SQLiteNotes[i].Notes.toLowerCase().includes(text.toLowerCase()) 
                        && text != '' ) {
                tempArray.push(this.state.SQLiteNotes[i])
            }
        }
        await this.setState({
            SQLiteNotesAfterSearch: tempArray,
            text: text
        })
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
                                        onPress = {() => this.handleDetailsToUpdateSQLite(val.NoteKey, val.Title, val.Notes, val.isDeleted, val.isArchived, val.Labels) 
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
                                                    this.state.labels.map(labels => (
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

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        storeEditNotesDetails : (notes) => dispatch(storeEditNotesDetails(notes)),
        storeNoteKeyToUpdateNotes : (noteKeyToUpdateNotes) => dispatch(storeNoteKeyToUpdateNotes(noteKeyToUpdateNotes)),
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
        storelabelsAndLabelKeys : (labelsAndLabelKeys) => dispatch(storelabelsAndLabelKeys(labelsAndLabelKeys)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchScreen)