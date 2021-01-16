import React, { Component } from 'react';
import {View, Text, ImageBackground, Dimensions, FlatList, Image, ActivityIndicator} from 'react-native';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import SQLiteStorageServices from '../../../services/SQLiteStorageServices';
import { storeUserID, 
        storeEditNotesDetails, 
        storeNoteKeyToUpdateNotes, 
        storeSelectedLabelKeys,
        storelabelsAndLabelKeys } from '../../redux/actions/CreateNewLabelAction';
import { connect } from 'react-redux';
import KeyChain from 'react-native-keychain';
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';
import moment from 'moment';

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
            index: 0,
            endReached: false,
            SQLiteResults: []
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

        if(this.props.remainderStatus) {
            await SQLiteStorageServices.getDetailsFromSQLiteDatabase()
            .then(async (results) => {
                let temp = [] 
                if(results.rows.length > 0) {
                    for(let i = 0; i < results.rows.length; i++) {
                        if(JSON.parse(results.rows.item(i).remainderTime) != null) {
                            temp.push(results.rows.item(i))
                        }
                    }
                    this.setState({
                        SQLiteResults: temp
                    })
                }
            })
        } else {
            await SQLiteStorageServices.getDetailsFromSQLiteDatabase(this.props.deletedStatus, this.props.archivedStatus)
            .then(async (results) => {
                let temp = [] 
                if(results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; ++i) {
                        if(this.props.labelAndKey != undefined) {
                            if(JSON.parse(results.rows.item(i).Labels).includes(this.props.labelAndKey.lebelKey)) {
                                temp.push(results.rows.item(i));
                            }
                        } else {
                            temp.push(results.rows.item(i));
                        }
                    }
                    this.setState({
                        SQLiteResults: temp
                    })
                }
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
                    this.props.storelabelsAndLabelKeys(this.state.labels)
                }
            })
            .catch(error => console.log(error))

        var temp = []
        if(this.state.SQLiteResults.length != 0) {
            for (let index = this.state.SQLiteResults.length -1 ; index >= 0; --index) {
                temp.push(this.state.SQLiteResults[index]);
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
    }

    componentWillUnmount() {
        this.setState = (state,callback) => {
            return;
        };
    }

    loadData = async (addIndex) => {
        for(let i = 0; i < addIndex; i++) {
            if(this.state.index == this.state.results.length) {
                await this.setState({
                    index: 0,
                })
            }
            let loadingIndex = this.state.index
            this.state.notes.push(this.state.results[loadingIndex])
            loadingIndex ++
            this.state.index ++
        }
    }

    handleDetailsToUpdateSQLite = (noteKey, Title, Notes, isDeleted, isArchived, Labels, remainderTime) => {
        const notes = {
            title: Title,
            note: Notes,
            labels: Labels,
            isArchived: isArchived,
            isDeleted: isDeleted,
            remainderTime: JSON.parse(remainderTime)
        }
        this.props.storeEditNotesDetails(notes)
        this.props.storeNoteKeyToUpdateNotes(noteKey)
        this.props.storeSelectedLabelKeys(JSON.parse(Labels))

        this.props.navigation.push('AddNewNotes')
    }

    handleDeletedNotesToUpdate = (noteKey, Title, Notes, isDeleted, isArchived, Labels, remainderTime) => {
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
                        onEndReachedThreshold = {0.1}
                        ListFooterComponent = {() => 
                            (this.state.endReached) ? 
                                <ActivityIndicator size="large" color="grey" /> : 
                                null}
                        onEndReached = {() => {
                            this.setState({
                                endReached: true
                            })
                        }}
                        onScroll = {() => {
                            if (this.state.endReached) {
                                this.loadData(5)
                                this.setState({
                                    endReached: false
                                })
                            }
                        }}

                        renderItem = {({ item }) => (  
                            <React.Fragment key = {this.key}>
                                {
                                    <Card
                                        style = {this.props.changeLayout ? NoteViewStyles.list_grid_Container: NoteViewStyles.list_Container}
                                        onPress = {() => {
                                            (item.isDeleted) 
                                            ? this.handleDeletedNotesToUpdate(item.NoteKey, item.Title, item.Notes, item.isDeleted, item.isArchived, item.Labels, item.remainderTime) 
                                            : this.handleDetailsToUpdateSQLite(item.NoteKey, item.Title, item.Notes, item.isDeleted, item.isArchived, item.Labels, item.remainderTime)}
                                        }>
                                        <Card.Content>
                                            <Title>
                                                {item.Title}
                                            </Title>
                                            <Paragraph>
                                                {item.Notes}
                                            </Paragraph>
                                            <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
                                                {
                                                    JSON.parse(item.remainderTime) != null ?
                                                    <Chip
                                                        style = {(new Date() < new Date(JSON.parse(item.remainderTime))) ? NoteViewStyles.remainder_Styles : NoteViewStyles.remainder_Faded_Styles}
                                                        textStyle = {{fontSize : 12}}
                                                        icon = 'alarm'>
                                                        {moment(JSON.parse(item.remainderTime)).format('D MMM, h.mm a')}
                                                    </Chip>
                                                    :null
                                                }
                                                {(item.Labels != null && item.Labels.length > 0) ?
                                                    this.state.labels.map(labels => (
                                                        item.Labels.includes(labels.lebelKey) ?
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