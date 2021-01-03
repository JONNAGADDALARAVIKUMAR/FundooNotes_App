import React, { Component } from 'react';
import {TextInput, View, ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchScreenStyles from '../../styles/SearchScreenStyles';
import { Card, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import SQLiteStorageServices from '../../../services/SQLiteStorageServices';
import Highlighter from 'react-native-highlight-words';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            SQLiteNotes: [],
            SQLiteNotesAfterSearch: [],
            text: ''
        }
    }

    componentDidMount = async () => {
        
        await SQLiteStorageServices.getDetailsFromSQLiteDatabase()
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
    }

    handleDetailsToUpdateSQLite = (noteKey, Title, Notes) => {
        this.props.navigation.push('AddNewNotes', { noteKey : noteKey, 
                                                    title : Title, 
                                                    note : Notes})
    }

    navigateToDashBoard = () => {
        this.props.navigation.push('Home', {screen: 'Notes'})
    }

    searchNotes = (text) => {
        let tempArray = []
        for(let i = 0; i < this.state.SQLiteNotes.length; i++) {
            if(this.state.SQLiteNotes[i].Title.toLowerCase().includes(text.toLowerCase()) && text != '' || this.state.SQLiteNotes[i].Notes.toLowerCase().includes(text.toLowerCase()) && text != '' ) {
                tempArray.push(this.state.SQLiteNotes[i])
            }
        }
        this.setState({
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
                                {val.isDeleted == false ? (
                                    <Card
                                        style = {NoteViewStyles.list_Container}
                                        onPress = {() => this.handleDetailsToUpdateSQLite(val.NoteKey, val.Title, val.Notes) 
                                        }>
                                        <Card.Content>
                                            <Title>
                                                <Highlighter
                                                    highlightStyle = {{backgroundColor: 'yellow'}}
                                                    searchWords = {[this.state.text]}
                                                    textToHighlight = {val.Title}/>
                                            </Title>
                                            <Paragraph>
                                                <Highlighter
                                                    highlightStyle = {{backgroundColor: 'yellow'}}
                                                    searchWords = {[this.state.text]}
                                                    textToHighlight = {val.Notes}/>
                                            </Paragraph>
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