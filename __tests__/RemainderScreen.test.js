import React from 'react';
import {shallow} from 'enzyme';
import RemainderScreen from '../src/components/DashboardComponents/RemainderScreen';

describe('test RemainderScreen Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<RemainderScreen/>)
        expect(component).toMatchSnapshot();
    })
})