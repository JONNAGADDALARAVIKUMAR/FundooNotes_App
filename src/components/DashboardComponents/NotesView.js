import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../../Languages/strings';
import DashBoardScreenStyles from '../../styles/DashBoardScreenStyles';
import { Card, Paragraph, Title } from 'react-native-paper';
import NoteViewStyles from '../../styles/NoteViewStyles';
import UserNoteServices from '../../../services/UserNoteServices';

export default class extends Component {
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
            notes: '',
            isEmpty: true
        };
    
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    componentDidMount = async () => {
        UserNoteServices.getDetailsFromFirebase()
        .then(async data => {
            let notes = data ? data : {}
            this.setState({
                notes : notes
            })
            let NoteKey = Object.keys(this.state.notes);
            NoteKey.reverse().map(key => ( 
                (NoteKey.length > 0 && this.state.notes[key].notes.isDeleted == this.props.status) 
                ? this.setState({
                    isEmpty: false
                }) : null
            ))
        })
        .catch((error) => console.log(error))
    }

    handleDetailsToUpdate = (noteKey) => {
        this.props.navigation.push('AddNewNotes', { noteKey : noteKey, 
                                                    title : this.state.notes[noteKey].notes.title, 
                                                    note : this.state.notes[noteKey].notes.note})
    }

    render() {
        let NoteKey = Object.keys(this.state.notes);
        
        return (
            <ImageBackground source = {require('../../assets/backgroundIcon.png')}
                style = {(this.state.orientation == 'portrait') 
                    ? {height: 510, width: 350, alignSelf: 'center'} 
                    : {height: 750, width: 530, alignSelf: 'center'}}>

                <ScrollView>
                    <View style = {NoteViewStyles.list_Style}>
                        {NoteKey.reverse().map(key => ( 
                            NoteKey.length > 0 && this.state.notes[key].notes.isDeleted == this.props.status                    
                            ? <Card
                                key = {key}
                                style = {this.props.changeLayout ? NoteViewStyles.list_grid_Container: NoteViewStyles.list_Container}
                                onPress={() => this.handleDetailsToUpdate(key)}>
                                <Card.Content>
                                    <Title>
                                        {this.state.notes[key].notes.title}
                                    </Title>
                                    <Paragraph>
                                        {this.state.notes[key].notes.note}
                                    </Paragraph>
                                </Card.Content>
                            </Card>
                            : null))}
                        </View>

                        {(this.state.isEmpty) ? (<View>
                            <Image style = {DashBoardScreenStyles.bulb_Style} source = {require('../../assets/bulb.png')}/>
                            <Text style = {DashBoardScreenStyles.Appear_Text_Style}>{strings.YourNoteswillApperHere}</Text>
                    </View>) : null }
                </ScrollView>
            </ImageBackground>
        )
    }
}