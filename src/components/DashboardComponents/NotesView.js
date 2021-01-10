import React, { Component } from 'react';
import {View, Text, ImageBackground, Dimensions, FlatList, Image} from 'react-native';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import { Card, Paragraph, Title } from 'react-native-paper';
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
            results: [],
            labels: [],
            endReached: false,
            index: 0
        };
        let key = -1
    
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

        await SQLiteStorageServices.getDetailsFromSQLiteDatabase(this.props.deletedStatus, this.props.archivedStatus)
        .then(async (results) => {
            var temp = []
            if(results.rows.length != 0) {
                for (let index = 0; index < results.rows.length; ++index) {
                    temp.push(results.rows.item(index));
                }
                await this.setState({
                    results : temp
                })
                let tempNotes = []
                let loadingIndex
                for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.results.length ; loadingIndex++) {
                    tempNotes.push(this.state.results[loadingIndex])
                }
                await this.setState({
                    notes: tempNotes,
                    index: loadingIndex
                })
            }

            SQLiteLabelServices.getLabelsFromSQliteStorage(this.props.userId)
            .then(async results => {
                if(results.rows.length > 0) {
                    let labels = [];
                    for(let i = 0; i < results.rows.length; i++ ) {
                        labels.push(results.rows.item(i))
                    }
                    await this.setState({
                        labels: labels
                    })
                    this.props.storelabelsAndLabelKeys(labels)
                }
            })
            .catch(error => console.log(error))
        })
    }

    loadData = async (addIndex) => {
        for(let i = 0; i < addIndex; i++) {
            let loadingIndex = this.state.index
            this.state.notes.push(this.state.results[loadingIndex])
            loadingIndex ++
            this.state.index ++
            if(this.state.index == this.state.results.length) {
                await this.setState({
                    index: 0,
                    endReached: false
                })
            }
        }
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
        this.key ++
        return (
            <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                style = {(this.state.orientation == 'portrait') 
                    ? {height: 510, width: 350, alignSelf: 'center'} 
                    : {height: 750, width: 530, alignSelf: 'center'}}>

                {this.state.results.length > 0 ? 
                    <FlatList
                        numColumns = {this.props.changeLayout ? 2 : 1}
                        keyExtractor = {(item, index) => JSON.stringify(index)}
                        key = {this.props.changeLayout ? 2 : 1}
                        data = {this.state.notes}
                        onEndReached = {() => {
                            if (!this.state.endReached && this.state.results.length > 5) {
                                this.loadData(5)
                            }
                        }}

                        renderItem = {({ item }) => (  
                            <React.Fragment key = {this.key}>
                                {
                                    <Card
                                        style = {this.props.changeLayout ? NoteViewStyles.list_grid_Container: NoteViewStyles.list_Container}
                                        onPress = {() => {
                                            (item.isDeleted) 
                                            ? this.handleDeletedNotesToUpdate(item.NoteKey, item.Title, item.Notes, item.isDeleted, item.isArchived, item.Labels) 
                                            : this.handleDetailsToUpdateSQLite(item.NoteKey, item.Title, item.Notes, item.isDeleted, item.isArchived, item.Labels)}
                                        }>
                                        <Card.Content>
                                            <Title>
                                                {item.Title}
                                            </Title>
                                            <Paragraph>
                                                {item.Notes}
                                            </Paragraph>
                                            <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                                                {(item.Labels.length > 0) ?
                                                    this.state.labels.map(labels => (
                                                        item.Labels.includes(labels.lebelKey) ?
                                                            <React.Fragment key = {labels.lebelKey}>
                                                                <View style = {NoteViewStyles.Label_Button_Style}>
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
                                    </Card>
                                }
                            </React.Fragment> 
                        )}>
                    </FlatList>
                : ( <View>
                        <Image style = {DashBoardScreenStyles.bulb_Style} source = {require('../../assets/bulb.png')}/>
                        <Text style = {DashBoardScreenStyles.Appear_Text_Style}>{strings.YourNoteswillApperHere}</Text>
                </View>) }                
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