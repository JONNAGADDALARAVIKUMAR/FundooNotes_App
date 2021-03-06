import React from 'react';
import {shallow} from 'enzyme';
import BottomBar from '../src/components/DashboardComponents/BottomBar';
import {Appbar} from 'react-native-paper';
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

describe('test BottomBar Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<BottomBar store = {store}/>).dive()
        expect(component).toMatchSnapshot();
    })
    it('test appbar action in bottom bar component should have length 5', () => {
        const component = shallow(<BottomBar store = {store}/>).dive()
        expect(component.find(Appbar.Action)).toHaveLength(5)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('check-box-outline')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('brush')
        expect(component.find(Appbar.Action).at(2).props().icon).toEqual('microphone-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('panorama')
        expect(component.find(Appbar.Action).at(4).props().icon).toEqual('plus')
    })
    it('test onPress event of handlePlusButton it should navigate to AddNewNotes Screen', async() => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<BottomBar store = {store} onPress = {onPressEvent} navigation = {navigation} />).dive()
        const instance = component.instance();
        await instance.handlePlusButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith('AddNewNotes')
    })
})