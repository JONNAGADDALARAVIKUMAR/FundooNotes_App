import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeletedNotesScreen from '../src/components/DashboardComponents/DeletedNotesScreen';

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

describe('test DeletedNotesScreen Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<DeletedNotesScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})