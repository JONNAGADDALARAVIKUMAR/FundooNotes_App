import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../src/components/DashboardComponents/Profile';

describe('test Profile Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<Profile/>)
        expect(component).toMatchSnapshot();
    })
})