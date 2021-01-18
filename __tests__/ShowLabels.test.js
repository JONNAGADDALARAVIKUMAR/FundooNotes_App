import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShowLabels from '../src/components/DashboardComponents/LabelComponents/ShowLabels';

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

describe('test ShowLabels Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<ShowLabels store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})