import React from 'react';
import {shallow} from 'enzyme';
import DeletedNotesScreen from '../src/components/DashboardComponents/DeletedNotesScreen';

describe('test DeletedNotesScreen Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<DeletedNotesScreen/>)
        expect(component).toMatchSnapshot();
    })

    it('test onPress event of DeletedNotesScreen it should navigate to AddNewNotes Screen', async() => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<DeletedNotesScreen onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        await instance.openDrawer();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toBeCalled()
    })
})