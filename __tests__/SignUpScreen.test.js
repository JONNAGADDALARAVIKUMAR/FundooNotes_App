import React from 'react';
import {shallow} from 'enzyme';

import SignUpScreen from '../src/components/SignUpScreen'

describe('test SignUp', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component).toMatchSnapshot();
    })
    it('test the firstName handler method should update firstName state', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().state.firstName).toBe('')
        component.instance().firstNameHandler('Ravi')
        expect(component.instance().state.firstName).toBe('RAVI')
    })
    it('test the lastName handler method should update lastName state', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().state.lastName).toBe('')
        component.instance().lastNameHandler('Kumar')
        expect(component.instance().state.lastName).toBe('KUMAR')
    })
    it('test the email handler method should update email state', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('kumar@gmail.com')
        expect(component.instance().state.email).toBe('kumar@gmail.com')
    })
    it('test the password handler method should update password state', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Ravi@765')
        expect(component.instance().state.password).toBe('Ravi@765')
    })
    it('test the Confirm password handler method should update password state', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().state.confirmPassword).toBe('')
        component.instance().confirmPasswordHandler('Ravi@765')
        expect(component.instance().state.confirmPassword).toBe('Ravi@765')
    })
    it('test the email handler method should update emailValidation state true', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().setState({email: 'ravi@gmail.com'}))
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(true)//Happy Test case 
    })
    it('test the email handler method should update emailValidation state False', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().setState({email: 'ravi@gmail'}))
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(false)//Sad Test case 
    })
    it('test the Password handler method should update passwordValidation state true', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().setState({password: 'Ravi@433'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(true)//Happy Test case 
    })
    it('test the Password handler method should update passwordValidation state False', async () => {
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'}/>)
        expect(component.instance().setState({password: 'ravi@433'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(false)//Sad Test case 
    })
    
    it('test onPress event of eye icon of password textinput called it will change the passwordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'} onPress = {onPressEvent}/>)
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
        const component = shallow(<SignUpScreen AppName = "Fundo Notes" ScreenType = {'Create Account'} onPress = {onPressEvent}/>)
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
})