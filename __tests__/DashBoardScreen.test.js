import React from 'react';
import {shallow} from 'enzyme';
import DashBoardScreen from '../src/components/DashboardComponents/DashBoardScreen';

describe('test DashBoard Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<DashBoardScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('test the selectView method should Should Update State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<DashBoardScreen onPress = {onPressEvent}/>)
        const instance = component.instance();

        instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.listView).toBe(true);

        instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.listView).toBe(false);
    })
    it('test onDismiss event of Snackbar for empty note delete it will set isNoteNotAddedDeleted to be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<DashBoardScreen onDismiss = {onDismissEvent} />)
        const instance = component.instance();
        await instance.emptyNoteSnackbarHandler();
        expect(onDismissEvent).toHaveBeenCalled();
        expect(instance.state.isNoteNotAddedDeleted).toBe(false)
    })

    it('test onDismiss event of Snackbar for deleted Note it will set showDeletedNoteSnackbar to be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<DashBoardScreen onDismiss = {onDismissEvent} />)
        const instance = component.instance();
        await instance.deletedNoteSnackbarHandler();
        expect(onDismissEvent).toHaveBeenCalled();
        expect(instance.state.showDeletedNoteSnackbar).toBe(false)
    })
    it('test the restoreNotes method should Should navigate to Home screen State', async () => {
        const onPressEvent = jest.fn();
        const navigation = { push : jest.fn() }
        const component = shallow(<DashBoardScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();

        instance.restoreNotes();
        expect(onPressEvent).toHaveBeenCalled();
        UserNoteServices.restoreNoteInFirebase(instance.props.route.params.title, instance.props.route.params.note, instance.props.route.params.noteKey)
        expect(navigation.push).toBeCalledWith('Home', {screen : 'Notes'});
    })
})