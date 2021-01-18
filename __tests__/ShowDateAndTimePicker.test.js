import React from 'react';
import {shallow} from 'enzyme';
import ShowDateAndTimePicker from '../src/components/ShowDateAndTimePicker';

describe('test ShowDateAndTimePicker Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<ShowDateAndTimePicker/>)
        expect(component).toMatchSnapshot();
    })
})