import React from 'react';
import {shallow} from 'enzyme';
import DashBoardScreen from '../src/components/DashboardComponents/DashBoardScreen';

describe('test DashBoard Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<DashBoardScreen/>)
        expect(component).toMatchSnapshot();
    })

    it('On pressing Logout Button navigateToLogInScreen method should Navigate to LogIn Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<DashBoardScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        
        await instance.navigateToLogInScreen();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("LogIn");
    })
})