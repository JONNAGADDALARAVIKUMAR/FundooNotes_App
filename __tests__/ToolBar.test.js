import React from 'react';
import {shallow} from 'enzyme';
import ToolBar from '../src/components/DashboardComponents/ToolBar';
import {Appbar} from 'react-native-paper';

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
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('view-agenda-outline')
        expect(instance.state.changeLayout).toBe(true)

        instance.changeLayout();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('view-grid-outline')
        expect(instance.state.changeLayout).toBe(false)
    })
})