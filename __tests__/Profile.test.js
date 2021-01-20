import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../src/components/DashboardComponents/Profile';

describe('test Profile Class', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<Profile/>)
        expect(component).toMatchSnapshot();
    })

    it('test handleProfileOnPress method on press to open RBSheet', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<Profile onPress = {onPressEvent}/>)
        const instance = component.instance()
        
        expect(instance.state.isImagePressed).toBe(false)
        await instance.handleProfileOnPress()
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.isImagePressed).toBe(true)
        expect(instance.RBSheet.open()).toHaveBeenCalled()

        await instance.handleProfileOnPress()
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.isImagePressed).toBe(false)
        expect(instance.RBSheet.close()).toHaveBeenCalled()
    })

    it('test navigateToLogInScreen method on press should navigate to logIn screen', async () => {
        const onPressEvent = jest.fn();
        const navigation = { navigation : jest.fn() }
        const component = shallow(<Profile onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance()
        
        await instance.navigateToLogInScreen()
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith('LogIn')
    })
})