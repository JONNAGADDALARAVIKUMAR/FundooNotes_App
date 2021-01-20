import React from 'react';
import {shallow} from 'enzyme';
import NotesView from '../src/components/DashboardComponents/NotesView';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Card} from 'react-native-paper'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initialState = {
    userId : '',
    labelContent: [],
    labelNoteKeys: [],
    labels: [],
    showDailog: false,
    deleteLabelKey: null,
    selectedLabelKeys: [],
    notesArchived: false,
    editNotesDetails: null,
    noteKeyToUpdateNotes: '',
    labelsAndLabelKeys: [],
    labelAndKey: {},
    labelScreen: null
}
const store = mockStore(initialState)

describe('test NotesView Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<NotesView store = {store}/>)
        expect(component).toMatchSnapshot();
    })
    it('test handleDetailsToUpdateSQLite method on press notes should navigate to AddNewNotes screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<NotesView onPress = {onPressEvent} navigation = {navigation} store = {store}/>)
        const instance = component.instance();
        
        instance.handleDetailsToUpdateSQLite('123', 'Ravi', 'Ravi', false, false, '2021-01-18T12:30:00.657Z')
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('AddNewNotes')
    })
    it('test handleDeletedNotesToUpdate method on press notes should navigate to DeletedNoteView screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<NotesView store = {store} onPress = {onPressEvent} navigation = {navigation}/>).dive()
        const instance = component.instance()
        //component.find('#firstTest').simulate('press')
        instance.handleDeletedNotesToUpdate('123', 'Ravi', 'Ravi', true, false, '2021-01-18T12:30:00.657Z')
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('DeletedNoteView')
    })
})