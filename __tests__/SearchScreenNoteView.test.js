import React from 'react';
import {shallow} from 'enzyme';
import SearchScreenNoteView from '../src/components/DashboardComponents/SearchScreenNoteView';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initialState = {
    userId : '',
    labelContent: [],
    labelNoteKeys: [],
    labels: [],
    showDailog: false,
    deleteLabelKey: null,
    selectedLabelKeys: [20210116160700],
    notesArchived: false,
    editNotesDetails: null,
    noteKeyToUpdateNotes: '',
    labelsAndLabelKeys: [],
    labelAndKey: {},
    labelScreen: null
}
const store = mockStore(initialState)

describe('test SearchScreenNoteView Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<SearchScreenNoteView store = {store}/>)
        expect(component).toMatchSnapshot();
    })
    it('test handleDetailsToUpdateSQLite method should navigate to AddNewNotes screen', () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<SearchScreenNoteView onPress = {onPressEvent} navigation = {navigation} store = {store}/>).dive()
        const instance = component.instance();
        
        instance.handleDetailsToUpdateSQLite('123', 'Ravi', 'Ravi', false, false, '20210116160700', '2021-01-18T12:30:00.657Z')
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('AddNewNotes')
    })

    it('test navigateToDashBoard method on press notes should navigate to AddNewNotes screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<SearchScreenNoteView onPress = {onPressEvent} navigation = {navigation} store = {store}/>).dive()
        const instance = component.instance();
        
        instance.navigateToDashBoard()
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalledWith('Home', {screen: 'Notes'})
    })
})