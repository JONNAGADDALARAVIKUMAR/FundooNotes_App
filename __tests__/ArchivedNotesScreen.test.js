import React from 'react';
import {shallow} from 'enzyme';
import ArchivedNotesScreen from '../src/components/DashboardComponents/ArchivedNotesScreen'
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
    selectedLabelKeys: [20210116160700],
    notesArchived: false,
    editNotesDetails: null,
    noteKeyToUpdateNotes: '',
    labelsAndLabelKeys: [],
    labelAndKey: {},
    labelScreen: null
}
const store = mockStore(initialState)

describe('test ArchivedNotesScreen Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<ArchivedNotesScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
    it('test openDrawer on press should open drawer', async () => {
        const onPressEvent = jest.fn();
        const navigation = {openDrawer: jest.fn() }
        const component = shallow(<ArchivedNotesScreen onPress = {onPressEvent} navigation = {navigation} store = {store}/>)

        await component.instance().openDrawer()
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

    it('test selectView on press should open drawer', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ArchivedNotesScreen onPress = {onPressEvent} store = {store}/>)
        const instance = component.instance();
        expect(instance.state.listView).toBe(false);

        instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.listView).toBe(true);

        instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.listView).toBe(false);
    })
})