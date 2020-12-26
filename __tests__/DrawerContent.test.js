import React from 'react';
import shallow from 'enzyme';
import DrawerContent from '../src/components/Drawer/DrawerContent';

it('test when render should match to snapshot', async () => {
    const component = shallow(<DrawerContent/>)
    expect(component).toMatchSnapshot();
})