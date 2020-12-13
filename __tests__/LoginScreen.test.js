import React from 'react';
import {shallow} from 'enzyme';

import LogInScreen from '../src/components/LogInScreen'

describe('test Login', () => {
    it('test when render should match to snapshot', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component).toMatchSnapshot();
    })
    it('test the email handler method should update email state', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().state.email).toBe('')
        component.instance().emailHandler('ravi@gmail.com')
        expect(component.instance().state.email).toBe('ravi@gmail.com')
    })
    it('test the password handler method should update password state', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().state.password).toBe('')
        component.instance().passwordHandler('Ravi@765')
        expect(component.instance().state.password).toBe('Ravi@765')
    })
    it('test the email handler method should update emailValidation state true', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().setState({email: 'ravi@gmail.com'}))
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(true)//Happy Test case 
    })
    it('test the email handler method should update emailValidation state false', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().setState({email: 'ravigmail.com'}))
        component.instance().checkEmail()
        expect(component.instance().state.emailValidation).toBe(false)//Sad test case
    })
    it('test the Password handler method should update passwordValidation state true', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().setState({password: 'Ravi@433'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(true)//Happy Test case 
    })
    it('test the Password handler method should update passwordValidation state false', async () => {
        const component = shallow(<LogInScreen AppName = "Fundo Notes"/>)
        expect(component.instance().setState({password: 'Ravi@kumar'}))
        component.instance().checkPassword()
        expect(component.instance().state.passwordValidation).toBe(false)//Sad test case
    })
    it('test onPress event of eye icon of password textinput called it will change the passwordSecurity State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<LogInScreen AppName = "Fundo Notes" onPress = {onPressEvent}/>)
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