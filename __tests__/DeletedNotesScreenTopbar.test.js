import React from 'react';
import {shallow} from 'enzyme';
import DeletedNotesScreenTopbar from '../src/components/DashboardComponents/DeletedNotesScreenTopbar';

describe('test DeletedNotesScreenTopbar Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<DeletedNotesScreenTopbar/>)
        expect(component).toMatchSnapshot();
    })

    it('test onPress event of DeletedNotesScreen it should navigate to AddNewNotes Screen', async() => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<DeletedNotesScreenTopbar onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        await instance.openDrawer();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toBeCalled()
    })
})