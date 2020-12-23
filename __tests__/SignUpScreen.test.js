import React from 'react';
import {shallow} from 'enzyme';
import SignUpScreen from '../src/components/SignUpScreen';
import UserServices from '../services/UserServices';

describe('test SignUp Screen', () => {
     it('test when render should match to snapshot', async () => {
         const component = shallow(<SignUpScreen/>)
         expect(component).toMatchSnapshot();
     })
    it('test the firstName handler method should update firstName state', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.firstName).toBe('')
        component.instance().firstNameHandler('Ravi')
        expect(component.instance().state.firstName).toBe('RAVI')
        expect(component.instance().state.isFirstNameFieldEmpty).toBe(false)
    })
    it('test the lastName handler method should update lastName state', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.lastName).toBe('')
        component.instance().lastNameHandler('Kumar')
        expect(component.instance().state.lastName).toBe('KUMAR')
        expect(component.instance().state.isLastNameFieldEmpty).toBe(false)
    })
    it('test the email handler method should update email state', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('kumar@gmail.com')
        expect(component.instance().state.email).toBe('kumar@gmail.com')
    })
    it('test the checkEmail method should update emailValidation state Happy Test Case', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.emailValidation).toBe(true)
        component.instance().setState({email: 'ravi@gmail.com'})
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(true)
    })
    it('test the checkEmail method should update emailValidation state Sad Test Case', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.emailValidation).toBe(true)
        component.instance().setState({email: 'ravi@gmail'})
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(false)
    })
    it('test the password handler method should update password state', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Ravi@765')
        expect(component.instance().state.password).toBe('Ravi@765')
    })
    it('test the Confirm password handler method should update confirmPassword state', async () => {
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().state.confirmPassword).toBe('')
        component.instance().confirmPasswordHandler('Ravi@765')
        expect(component.instance().state.confirmPassword).toBe('Ravi@765')
    })
    it('test the Password handler method should update passwordValidation state true', async () => {//Update Correct
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().setState({password: 'Ravi@433'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(true)//Happy Test case 
    })
    it('test the Password handler method should update passwordValidation state False', async () => {//Update Incorrect
        const component = shallow(<SignUpScreen/>)
        expect(component.instance().setState({password: 'ravi@433'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(false)//Sad Test case 
    })
    it('test the navigateToLogScreenHandler method should Navigate to LogIn Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.navigateToLogScreenHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("LogIn");
    })
    
    it('test onPress event of eye icon of password textinput called it will change the passwordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen onPress = {onPressEvent}/>)
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
        const component = shallow(<SignUpScreen onPress = {onPressEvent}/>)
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
    it('test onPress event of SignUp button when email and password is valid it will Create Account', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.setState({
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            firstName: 'Ravi',
            lastName: 'Kumar',
            email: 'ravikumarjit583@gmail.com',
            password: 'Ravi@322',
            confirmPassword: 'Ravi@322',
        })
        await instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        UserServices.createAccount(instance.state.email, instance.state.password).then((message) => {
            expect(message).toBe('User account created & signed in!')
            //expect(navigation.navigate).toBeCalledWith('DashBoard')
        })
        instance.setState({
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            firstName: 'Ravi',
            lastName: 'Kumar',
            email: 'ravikumarjit583@gmail.com',
            password: 'Ravi@322',
            confirmPassword: 'Ravi@322',
        })
        await instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.createAccount(instance.state.email, instance.state.password).catch((message) => {
            expect(message).toBe('email in use!')
            expect(instance.state.emailError).toBe('Email in Use');
        })
    }, 10000)
    it('test onPress event of SignUp button when Invalid email and password passed it will return Invalid Email error', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.setState({
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            firstName: 'Ravi',
            lastName: 'Kumar',
            email: 'ravikumarjit583gmail.com',
            password: 'Ravi@322',
            confirmPassword: 'Ravi@322',
        })
        await instance.handleSignUpButton();
        expect(onPressEvent).toHaveBeenCalled();
        UserServices.createAccount(instance.state.email, instance.state.password).catch((message) => {
            expect(instance.state.emailError).toBe('invalid email!');
        })
    }, 10000)
    it('test the handleSignUpButton method Should Update the Fields when Required  are Empty', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.setState({
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        await instance.handleSignUpButton();
        expect(component.instance().state.isFirstNameFieldEmpty).toBe(true)
        expect(component.instance().state.isLastNameFieldEmpty).toBe(true)
        expect(component.instance().state.isEmailFieldEmpty).toBe(true)
        expect(component.instance().state.isPasswordFieldEmpty).toBe(true)
        expect(component.instance().state.isConfirmPasswordFieldEmpty).toBe(true)
    })
})