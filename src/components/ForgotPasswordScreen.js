import React, { Component } from 'react';
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity} from 'react-native';
import ForgotPasswordScreenStyles from '../styles/ForgotPasswordScreenStyles';
import UserServices from '../../services/UserServices'

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            isEmailFieldEmpty: false,
            emailError: '',
            emailSentNotification: false
        }
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            emailError: '',
            emailSentNotification: false,
            isEmailFieldEmpty: false
        })
    }

    resetPassword = async () => {
        const {onPress} = this.props
        if(!this.state.isEmailFieldEmpty && this.state.email != '') {
            await UserServices.resetPassword(this.state.email)
            .then(async (result) => {
                await this.setState({
                    emailSentNotification: true
                })
                //await setTimeout(() => {
                    this.props.navigation.navigate('LogIn')
                //},3500)
            })
            .catch(error => {
                if(error === 'invalid email') {
                    this.setState({
                        emailError: 'invalid email'
                    })
                } else if(error === 'User not found') {
                    this.setState({
                        emailError: 'User not found'
                    })
                }
            })
        } else {
            this.setState({
                isEmailFieldEmpty: true
            })
        }
        (this.props == undefined ) ? null : onPress();
    }

    render() {
        return(
            <View style = {ForgotPasswordScreenStyles.background_Style}>
                <Text style = {ForgotPasswordScreenStyles.App_Name}>Fundo Notes</Text>
                <ScrollView>
                    <Image style = {ForgotPasswordScreenStyles.Logo_Style}
                        source = {require('../assets/FundoIcon.png')}
                    />
                    <Text style = {ForgotPasswordScreenStyles.Reset_Password_Style}>Reset Password</Text>
                    
                    <View>
                        <TextInput
                            style = {ForgotPasswordScreenStyles.TextInput_Style}
                            placeholder = "Enter Email"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {this.emailHandler}
                        />
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.Fields_Missing]}>
                                {(this.state.isEmailFieldEmpty) ? 'Email Required' : null}
                            </Text>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.pop_up_Message_Flex]}>
                                {(this.state.emailError != '') ? this.state.emailError : null }
                            </Text>
                        </View>
                        <View>
                            <Text style = {[ForgotPasswordScreenStyles.Email_Sent_Notification]}>
                                {(this.state.emailSentNotification) ? 'Password Reset Link has been sent to your Registred Email' : null}
                            </Text>
                            <TouchableOpacity style = {[ForgotPasswordScreenStyles.SignUp_Button_Styles, ForgotPasswordScreenStyles.Button_Styles]}
                                onPress = {this.resetPassword}>
                                <Text style = {{color: '#dbced2'}}>Send Link to Mail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}