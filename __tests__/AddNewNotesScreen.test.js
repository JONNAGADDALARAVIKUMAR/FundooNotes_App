import React from 'react';
import {shallow} from 'enzyme';
import AddNewNotesScreen from '../src/components/AddNewNotesScreen';
import {Appbar} from 'react-native-paper';
import AddNewNotes from '../src/components/AddNewNotesScreen';
import NoteDataController from '../services/NoteDataController';

describe('test AddNewNotesScreen Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<AddNewNotesScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('test appbar action component should have length 8', () => {
        const component = shallow(<AddNewNotesScreen />)
        expect(component.find(Appbar.Action)).toHaveLength(8)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('keyboard-backspace')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('pin-outline')
        expect(component.find(Appbar.Action).at(2).props().icon).toEqual('bell-plus-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('archive-arrow-down-outline')
        expect(component.find(Appbar.Action).at(4).props().icon).toEqual('plus-box-outline')
        expect(component.find(Appbar.Action).at(5).props().icon).toEqual('undo-variant')
        expect(component.find(Appbar.Action).at(6).props().icon).toEqual('redo-variant')
        expect(component.find(Appbar.Action).at(7).props().icon).toEqual('dots-vertical')
    })
    it('test the handleTitle method should update title state', async () => {
        const component = shallow(<AddNewNotesScreen/>)
        expect(component.instance().state.title).toBe('')
        component.instance().handleTitle('Ravi')
        expect(component.instance().state.title).toBe('Ravi')
    })
    it('test the handleNote method should update title state', async () => {
        const component = shallow(<AddNewNotesScreen/>)
        expect(component.instance().state.notes).toBe('')
        component.instance().handleNote('Ravi')
        expect(component.instance().state.notes).toBe('Ravi')
    })
    it('When Calling addNotesToFirebase method should Upload Title and Notes to the Database', async () => {
        const navigation = { navigate: jest.fn() }
        const onPressEvent = jest.fn()
        const component = shallow(<AddNewNotes onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance()
        await instance.addNotesToFirebase()
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('Notes')
    })
    it('When Calling addNotesDatabase method should Upload Title and Notes to the Database', async () => {
        const navigation = { navigation: jest.fn() }
        const onPressEvent = jest.fn()
        const component = shallow(<AddNewNotes onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance()
        instance.setState({
            title: 'Ravi',
            note: 'Ravi',
            noteKey: undefined
        })
        await instance.addNotesToDatabase()
        expect(onPressEvent).toHaveBeenCalled()
        await NoteDataController.addNote(instance.state.title, instance.state.note, false)
        .then(() => {
            expect(navigation.push).toBeCalledWith('Home', {screen: 'Notes'})
        })
    })
})