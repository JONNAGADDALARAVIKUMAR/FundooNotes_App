import React, { Component } from 'react';
import {Appbar} from 'react-native-paper';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import {connect} from 'react-redux';
import {storeEditNotesDetails, storeNoteKeyToUpdateNotes, storeSelectedLabelKeys, storelabelScreen} from '../../redux/actions/CreateNewLabelAction';

class Bottombar extends Component {
    handlePlusButton = () => {
        const {onPress} = this.props
        const notes = {
            title: '',
            note: '',
            labels: [],
            isArchived: false,
            isDeleted: false,
            remainderTime: null
        }

        if(this.props.labelAndKey != undefined) 
            this.props.storeSelectedLabelKeys([this.props.labelAndKey.lebelKey])
        else
            this.props.storeSelectedLabelKeys([])

        this.props.storeEditNotesDetails(notes)
        this.props.storeNoteKeyToUpdateNotes(undefined)
        this.props.navigation.push('AddNewNotes')
        onPress();
    }
    
    render() {
        return(
            <Appbar style = {DashBoardScreenStyles.App_Bar_Style_Bottom}>
                <Appbar.Action
                    icon="check-box-outline"
                    style = {{margin: '5%'}}
                    //onPress = {() => console.log('Clicked Square checkBox')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon="brush"
                    //onPress = {() => console.log('Clicked Brush')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon="microphone-outline"
                    //onPress = {() => console.log('Clicked Micro phone')}
                />
                <Appbar.Action
                    style = {{margin: '5%'}}
                    icon = "panorama"
                />
                <Appbar.Content/>
                <Appbar.Action
                    style = {DashBoardScreenStyles.Add_Notes_Icon_Style}
                    icon = "plus"
                    onPress = {this.handlePlusButton}
                />
            </Appbar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeEditNotesDetails : (notes) => dispatch(storeEditNotesDetails(notes)),
        storeNoteKeyToUpdateNotes : (noteKeyToUpdateNotes) => dispatch(storeNoteKeyToUpdateNotes(noteKeyToUpdateNotes)),
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
        storelabelScreen : (labelScreen) => dispatch(storelabelScreen(labelScreen)),
    }
}

export default connect(null, mapDispatchToProps)(Bottombar)