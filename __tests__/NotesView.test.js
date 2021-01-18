import React from 'react';
import {shallow} from 'enzyme';
import NotesView from '../src/components/DashboardComponents/NotesView';
import UserNoteServices from '../services/UserNoteServices';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
    it('test component did mount method should get user details and Update State', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<NotesView store = {store}/>)
        const instance = component.instance();
        UserNoteServices.getDetailsFromFirebase()
        .then((user) => {
            let notes = user ? user : {}
            expect(instance.state.notes).toBe(notes)
            expect(instance.state.isEmpty).toBe(false)
        })
    })
    it('test handleDetailsToUpdateSQLite method on press notes should navigate to AddNewNotes screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<NotesView onPress = {onPressEvent} navigation = {navigation} store = {store}/>)
        const instance = component.instance();
        instance.handleDetailsToUpdateSQLite('123', 'Ravi', false)
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('AddNewNotes')
    })
    it('test handleDeletedNotesToUpdate method on press notes should navigate to DeletedNoteView screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<NotesView store = {store} onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleDeletedNotesToUpdate('123', 'Ravi', false)
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('DeletedNoteView')
    })
})