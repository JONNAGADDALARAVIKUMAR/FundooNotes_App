import React, { Component } from 'react';
import {View} from 'react-native';
import SQLiteStorageServices from '../../../services/SQLiteStorageServices';
import {storelabelsAndLabelKeys} from '../../redux/actions/CreateNewLabelAction';
import { connect } from 'react-redux';
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';
import SearchScreenNoteView from './SearchScreenNoteView';

class SearchScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            SQLiteNotes: [],
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

    render() {
        return(
            <View>
                <SearchScreenNoteView
                    SQLiteNotes = {this.state.SQLiteNotes}
                    labels = {this.state.labels}
                    navigation = {this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        storelabelsAndLabelKeys : (labelsAndLabelKeys) => dispatch(storelabelsAndLabelKeys(labelsAndLabelKeys)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchScreen)