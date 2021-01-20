import React from 'react';
import {shallow} from 'enzyme';
import RemainderScreen from '../src/components/DashboardComponents/RemainderScreen';

describe('test RemainderScreen Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<RemainderScreen/>)
        expect(component).toMatchSnapshot();
    })

    it('test openDrawer on press should open drawer', async () => {
        const onPressEvent = jest.fn();
        const navigation = {openDrawer: jest.fn() }
        const component = shallow(<RemainderScreen onPress = {onPressEvent} navigation = {navigation}/>)

        await component.instance().openDrawer()
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

    it('test selectView on press should open drawer', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<RemainderScreen onPress = {onPressEvent}/>)
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