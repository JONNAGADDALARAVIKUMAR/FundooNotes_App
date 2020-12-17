import React from 'react';
import {shallow} from 'enzyme';
import LogInScreen from '../src/components/LogInScreen';

describe('test Login Screen', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('While passing email to the emailhandler method should update email state', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component.instance().state.email).toBe('')
        expect(component.instance().state.emailField).toBe(false)
        expect(component.instance().state.emailError).toBe('')
        component.instance().emailHandler('ravi@gmail.com')
        expect(component.instance().state.email).toBe('ravi@gmail.com')
    })
    it('While passing password to the  passwordhandler method should update password state', async () => {
        const component = shallow(<LogInScreen/>)
        expect(component.instance().state.password).toBe('')
        expect(component.instance().state.passwordField).toBe(false)
        expect(component.instance().state.passwordError).toBe('')
        component.instance().passwordHandler('Ravi@322')
        expect(component.instance().state.password).toBe('Ravi@322')
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
    // it('test the navigateToSignUpScreen method should Navigate to SignUp Screen', async () => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<LogInScreen onPress = {onPressEvent} navigation = {navigation}/>)
    //     const instance = component.instance();
    //     instance.setState({
    //         email: 'ravikumarj4444@gmail.com',
    //         password: 'Ravi@322',
    //     })
    //     await instance.logIn()
    //     expect(onPressEvent).toHaveBeenCalled();
    //     expect(navigation.navigate).toBeCalledWith("DashBoard");
    // })
    it('While passing email and password to the handleLogInButton method should call LogIn method', async () => {
        renderer.render(<LogInScreen/>);
        const instance = component.instance();
        instance.setState({
            email: 'ravi@gmail.com',
            password: 'Ravi@322',
        })
        const logIn = jest.fn();
        //instance.handleLogInButton();
        expect(handleLogInButton).toBeCalled();
    })
    it('While passing email and password empty to the handleLogInButton method should update states emailField and password Field to true', async () => {
        const component = shallow(<LogInScreen/>)
        const instance = component.instance();
        instance.setState({
            email: '',
            password: '',
        })
        instance.handleLogInButton();
        expect(component.instance().state.emailField).toBe(true)
        expect(component.instance().state.passwordField).toBe(true)
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