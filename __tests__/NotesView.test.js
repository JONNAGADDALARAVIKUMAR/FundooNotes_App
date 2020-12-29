import React from 'react';
import {shallow} from 'enzyme';
import NotesView from '../src/components/DashboardComponents/NotesView';
import UserNoteServices from '../services/UserNoteServices';

describe('test NotesView Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<NotesView/>)
        expect(component).toMatchSnapshot();
    })
    it('test component did mount method should get user details and Update State', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<NotesView/>)
        const instance = component.instance();
        UserNoteServices.getDetailsFromFirebase()
        .then((user) => {
            let notes = user ? user : {}
            expect(instance.state.notes).toBe(notes)
            expect(instance.state.isEmpty).toBe(false)
        })
    })
    it('test handleDetailsToUpdate method on press notes should navigate to AddNewNotes screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { push : jest.fn() }
        const component = shallow(<NotesView onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        UserNoteServices.getDetailsFromFirebase()
        .then(async data => {
            let notes = data ? data : {}
            instance.setState({
                notes: notes
            })
        })
        instance.handleDetailsToUpdate('-MPeP98ZrMON8GQ_Bv9t');
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalled('AddNewNotes')
    })
})