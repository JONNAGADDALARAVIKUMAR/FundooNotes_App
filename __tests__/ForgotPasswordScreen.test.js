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
    
    it('test the resetPassword method should Should Update Fields State when email is Empty', async () => {
        const component = shallow(<ForgotPasswordScreen/>)
        const instance = component.instance();
        instance.setState({
            email: '',
        })
        instance.resetPassword();
        expect(component.instance().state.isEmailFieldEmpty).toBe(true)
    })
})