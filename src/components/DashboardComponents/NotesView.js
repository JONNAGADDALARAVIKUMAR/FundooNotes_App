import React, { Component } from 'react';
import {View, Text, ImageBackground, Dimensions, ScrollView, Image} from 'react-native';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import SQLiteStorageServices from '../../../services/SQLiteStorageServices';
import {storeUserID, 
        storeEditNotesDetails, 
        storeNoteKeyToUpdateNotes, 
        storeSelectedLabelKeys,
        storelabelsAndLabelKeys} from '../../redux/actions/CreateNewLabelAction';
import { connect } from 'react-redux';
import KeyChain from 'react-native-keychain';
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';

class NotesView extends Component {
    constructor() {
        super();

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };
    
        this.state = {
            changeLayout: false,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            orientation: isPortrait() ? 'portrait' : 'landscape',
            notes: [],
            isEmpty: true,
            labels: []
        };
    
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    componentDidMount = async () => {

        const credential = await KeyChain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await this.props.storeUserId(UserCredential.user.uid)

        await SQLiteStorageServices.getDetailsFromSQLiteDatabase()
        .then(async (results) => {
            var temp = []
            if(results.rows.length != 0) {
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                await this.setState({
                    notes : temp
                })
                temp.map(async (notes) => {
                    (notes.isDeleted == this.props.status)
                    ? this.setState({
                        isEmpty: false
                    })
                    : null
                })
            }
            SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.userId)
            .then(results => {
                if(results.rows.length > 0) {
                    let labels = [];
                    for(let i = 0; i<results.rows.length; i++ ) {
                        labels.push(results.rows.item(i))
                    }
                    this.setState({
                        labels: labels
                    })
                    this.props.storelabelsAndLabelKeys(labels)
                }
            })
            .catch(error => console.log(error))
        })
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

    handleDeletedNotesToUpdate = (noteKey, Title, Notes, isDeleted, isArchived, Labels) => {
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
        
        this.props.navigation.push('DeletedNoteView')
    }

    render() {
        return (
            <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                style = {(this.state.orientation == 'portrait') 
                    ? {height: 510, width: 350, alignSelf: 'center'} 
                    : {height: 750, width: 530, alignSelf: 'center'}}>

                <ScrollView>
                    <View style = {NoteViewStyles.list_Style}>
                        {this.state.notes.length > 0 ?
                        this.state.notes.map(val => (
                            <React.Fragment key = {val.NoteKey}>
                                {val.isDeleted == this.props.status ? (
                                    <Card
                                        style = {this.props.changeLayout ? NoteViewStyles.list_grid_Container: NoteViewStyles.list_Container}
                                        onPress = {() => {
                                            (val.isDeleted) 
                                            ? this.handleDeletedNotesToUpdate(val.NoteKey, val.Title, val.Notes, val.isDeleted, val.isArchived, val.Labels) 
                                            : this.handleDetailsToUpdateSQLite(val.NoteKey, val.Title, val.Notes, val.isDeleted, val.isArchived, val.Labels)}
                                        }>
                                        <Card.Content>
                                            <Title>
                                                {val.Title}
                                            </Title>
                                            <Paragraph>
                                                {val.Notes}
                                            </Paragraph>
                                                <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                                                {(val.Labels.length > 0) ?
                                                    this.state.labels.map(labels => (
                                                        val.Labels.includes(labels.lebelKey) ?
                                                            <React.Fragment key = {labels.lebelKey}>
                                                                <View style = {{}}>
                                                                    <Text>{labels.labelName}</Text>
                                                                </View>
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
                        ))
                        : null}
                    </View>  

                    {(this.state.isEmpty) ? (
                    <View>
                        <Image style = {DashBoardScreenStyles.bulb_Style} source = {require('../../assets/bulb.png')}/>
                        <Text style = {DashBoardScreenStyles.Appear_Text_Style}>{strings.YourNoteswillApperHere}</Text>
                    </View>) : null }
                </ScrollView>
            </ImageBackground>
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
        storeUserId : (userId) => dispatch(storeUserID(userId)),
        storeEditNotesDetails : (notes) => dispatch(storeEditNotesDetails(notes)),
        storeNoteKeyToUpdateNotes : (noteKeyToUpdateNotes) => dispatch(storeNoteKeyToUpdateNotes(noteKeyToUpdateNotes)),
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
        storelabelsAndLabelKeys : (labelsAndLabelKeys) => dispatch(storelabelsAndLabelKeys(labelsAndLabelKeys)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesView)