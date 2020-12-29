import React from 'react';
import {shallow} from 'enzyme';
import ToolBar from '../src/components/DashboardComponents/ToolBar';

describe('test ToolBar Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<ToolBar/>)
        expect(component).toMatchSnapshot();
    })
    it('test the changeLayout method on Press Event should Update State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ToolBar onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.setState({
            changeLayout: false
        })
        instance.changeLayout();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.listView).toBe(true)

        instance.changeLayout();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.changeLayout).toBe(false)
        expect(instance.state.listView).toBe(true)
    })

    it('test the openDrawer method on Press Event should Open Drawer', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<ToolBar onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.openDrawer();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer()).toHaveBeenCalled();
    })
})