import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import LogInScreenStyles from '../styles/LogInPageStyles';
import UserServices from '../../services/UserServices';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            passwordSecurity: true,
            emailError: '',
            passwordError: '',
            emailField: false,
            passwordField: false,
        }
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            emailField: false,
            emailError: ''
        })
    }

    passwordHandler = async (enteredPassword) => {
        await this.setState({
            password: enteredPassword,
            passwordField: false,
            passwordError: ''
        })
    }

    passwordSecurityHandler = async () => {
        const {onPress} = this.props
        var passwordSecurity = this.state.passwordSecurity
        if(passwordSecurity == true) {
            this.setState({
                passwordSecurity: false
            })
        }
        else {
            this.setState({
                passwordSecurity: true
            })
        }
        (this.props == undefined ) ? null : onPress();
    }

    handleLogInButton = async () => {
        const {onPress} = this.props
        if(this.state.email != '' && this.state.password != '') {
            await UserServices.logIn(this.state.email, this.state.password)
            .then((user) => this.props.navigation.navigate('DashBoard'))
            .catch(error => {
                if(error === 'User not Found') {
                    this.setState({
                        emailError: 'User not Found'
                    })
                } else if(error === 'Invalid Email') {
                    this.setState({
                        emailError: 'Invalid Email'
                    })
                }   
                else if(error === 'Invalid Password') {
                    this.setState({
                        passwordError: 'Invalid Password'
                    })
                }
            })
        } else {
            if(this.state.email == '') {
                this.setState({
                    emailField: true
                })
            }
            if(this.state.password == '') {
                this.setState({
                    passwordField: true
                })
            }
        }
        onPress();
    }

    navigateToSignUpScreen = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('SignUp')
        onPress();
    }
    navigateToForgotPasswordScreen = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('ForgotPassword')
        onPress();
    }

    render() {
        return (
            <View style = {LogInScreenStyles.background_Styles}>
                <ScrollView>
                    <Image style = {LogInScreenStyles.Logo_Style}
                        source = {require('../assets/FundoIcon.png')}
                    />
                    <Text style = {LogInScreenStyles.Fundo_Style}>Fundo Notes</Text>
                    <TextInput
                        style = {LogInScreenStyles.Input_TextBox_Style}
                        placeholder = "Email"
                        placeholderTextColor = "#b0686d"
                        onChangeText = {this.emailHandler}
                    />
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {[LogInScreenStyles.pop_up_Message, LogInScreenStyles.Fields_Missing]}>
                            {(this.state.emailField) ? 'Email Required' : null}
                        </Text>
                        <Text style = {[LogInScreenStyles.pop_up_Message, LogInScreenStyles.pop_up_Message_Flex]}>
                            {(this.state.emailError == '' || this.state.email == '') ? null : this.state.emailError}
                        </Text>
                    </View>
 
                    <View style = {[LogInScreenStyles.Input_TextBox_Style, LogInScreenStyles.set_icon]}>
                        <TextInput style = {{width: '88%'}}
                            placeholder =   "Password"
                            maxLength = {25}
                            placeholderTextColor = "#b0686d"
                            secureTextEntry = {this.state.passwordSecurity}
                            onChangeText = {this.passwordHandler}
                        />
                        {(this.state.passwordSecurity) 
                            ? <TouchableOpacity 
                                style= {{alignSelf: 'center'}}
                                onPress = {this.passwordSecurityHandler}>
                                    <Image style = {LogInScreenStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                            </TouchableOpacity> 
                            : <TouchableOpacity 
                                style = {{alignSelf: 'center'}}
                                onPress = {this.passwordSecurityHandler}>
                                    <Image style = {LogInScreenStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                            </TouchableOpacity>  
                        }
                    </View>  

                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {[LogInScreenStyles.pop_up_Message, LogInScreenStyles.Fields_Missing]}>
                            {(this.state.passwordField) ? 'Password Required' : null}
                        </Text>
                        <Text style = {[LogInScreenStyles.pop_up_Message, LogInScreenStyles.pop_up_Message_Flex]}>
                            {(this.state.passwordError == '' || this.state.password == '') ? null : this.state.passwordError}
                        </Text>
                    </View>
                    
                    <TouchableOpacity onPress = {this.navigateToForgotPasswordScreen}>
                        <Text style = {LogInScreenStyles.forgot_Password_Style}>Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style = {{flexDirection: 'row'}}>
                        <TouchableOpacity style = {[LogInScreenStyles.LogIn_Button_Styles, LogInScreenStyles.Button_Styles]}
                            onPress = {this.handleLogInButton}>
                            <Text style = {{color: '#dbced2'}}>LOG IN</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style = {[LogInScreenStyles.SignUp_Button_Styles, LogInScreenStyles.Button_Styles]}
                            onPress = {this.navigateToSignUpScreen}>
                            <Text style = {{color: '#dbced2'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}