import React from 'react';
import {shallow} from 'enzyme';
import ForgotPasswordScreen from '../src/components/ForgotPasswordScreen';

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
    it('test the password handler method should update password state', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Ravi@765')
        expect(component.instance().state.password).toBe('Ravi@765')
    })
    it('test the checkPassword method should update passwordValidation state', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        component.setState({password: 'Ravi@322'})
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(true)//Happy test case
    })
    it('test the checkPassword method should update passwordValidation state', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        component.setState({password: 'ravi@322'})
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(false)//Sad test case
    })
    it('test the confirmPasswordHandler method should update confirmPassword state', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        component.instance().confirmPasswordHandler('Ravi@765')
        expect(component.instance().state.confirmPassword).toBe('Ravi@765')
    })
    it('test onPress event of eye icon of password textinput called it will change the passwordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent}/>)
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
    it('test onPress event of eye icon of password textinput called it will change the confirmPasswordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.confirmPasswordSecurity).toBe(true);

        instance.confirmPasswordSecurityHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.confirmPasswordSecurity).toBe(false);

        instance.confirmPasswordSecurityHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.confirmPasswordSecurity).toBe(true);
    })
    it('test the handleSignUpButton method should Navigate to LogIn Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            emailValidation: true,
            passwordValidation: true,
            email: 'ravi@gmail.com',
            password: 'Ravi@456',
            confirmPassword: 'Ravi@456',
        })
        instance.handleChangePasswordButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("LogIn");
    })
    it('test the handleSignUpButton method should Should Update Fields State when email password or confirmpassword are Empty', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            emailValidation: true,
            passwordValidation: true,
            email: '',
            password: '',
            confirmPassword: '',
        })
        instance.handleChangePasswordButton();
        expect(component.instance().state.emailField).toBe(true)
        expect(component.instance().state.passwordField).toBe(true)
        expect(component.instance().state.confirmPasswordField).toBe(true)
    })
    it('test the handleCreateAccountButton method should Navigate to SignUp Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPasswordScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleCreateAccountButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("SignUp");
    })
})