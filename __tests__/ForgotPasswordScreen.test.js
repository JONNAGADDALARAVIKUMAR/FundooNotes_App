import React from 'react';
import {shallow} from 'enzyme';
import ForgotPasswordScreen from '../src/components/ForgotPasswordScreen';
import UserServices from '../services/UserServices'

describe('test Forgot Password Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('test the email handler method should update email state', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('ravi@gmail.com')
        expect(component.instance().state.email).toBe('ravi@gmail.com')
    })
    
    it('test onPress event of Send Link to Mail button when email is invalid it will Update emailError state as invalid email', async() => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.emailHandler('ravikumarj4444gmail.com')
        await instance.resetPassword();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.resetPassword(instance.state.email).catch((error) => {
            expect(instance.state.emailError).toBe('invalid email')
        })
    }, 10000)
    it('test onPress event of Send Link to Mail button when email is not Registerd it will Update emailError state as User not Found', async() => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.emailHandler('ravikumarj@gmail.com')
        await instance.resetPassword();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.resetPassword(instance.state.email).catch((error) => {
            expect(instance.state.emailError).toBe('User not found')
        })
    }, 10000)

    it('test onPress event of Send Link to Mail button when email is valid it will navigate to LogIn Screen and emailSentNotification state will be Updated to true', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.emailHandler('ravikumarj4444@gmail.com')
        await instance.resetPassword();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.resetPassword(instance.state.email).then(async (result) => {
            expect(result).toBe(true)
            expect(instance.state.emailSentNotification).toBe(true)
            expect(navigation.navigate).toBeCalledWith('LogIn')
        })
    }, 10000)

    it('test the resetPassword method should Should Update Fields State when email is Empty', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.emailHandler('')
        instance.resetPassword();
        expect(onPressEvent).toHaveBeenCalled();
        expect(component.instance().state.isEmailFieldEmpty).toBe(true)
    })
})