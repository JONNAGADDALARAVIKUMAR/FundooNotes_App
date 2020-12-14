import React from 'react';
import {shallow} from 'enzyme';
import LogInScreen from '../src/components/LogInScreen';

describe('test Login Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('test the email handler method should update email state', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component.instance().state.email).toBe('')
        expect(component.instance().state.emailField).toBe(false)
        component.instance().emailHandler('ravi@gmail.com')
        expect(component.instance().state.email).toBe('ravi@gmail.com')
    })
    it('test the navigateToSignUpScreen method should Navigate to SignUp Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.navigateToSignUpScreen();

        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("SignUp");
    })
    it('test the navigateToForgotPasswordScreen method should Navigate to ForgotPassword Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.navigateToForgotPasswordScreen();

        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("ForgotPassword");
    })

    it('test the handleLogInButton method should Navigate to DashBoard', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            email: 'ravi@gmail.com',
            password: 'Ravi@2211',
            validateEmail: true,
            validatePassword: true
        })
        instance.handleLogInButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("DashBoard");
    })

    it('test the handleLogInButton method should Update validateEmail and validatePassword when email and password are empty', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            email: '',
            password: '',
            validateEmail: true,
            validatePassword: true
        })
        instance.handleLogInButton();
        expect(component.instance().state.emailField).toBe(true)
        expect(component.instance().state.passwordField).toBe(true)
    })
    it('test the password handler method should update password state', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Ravi@765')
        expect(component.instance().state.password).toBe('Ravi@765')
    })
    it('test onPress event of eye icon of password textinput called it will change the passwordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.passwordSecurity).toBe(true);

        instance.passwordSecurityHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.passwordSecurity).toBe(false);

        instance.passwordSecurityHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.passwordSecurity).toBe(true);
    })
 })