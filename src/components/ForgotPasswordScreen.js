import React, { Component } from 'react';
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity} from 'react-native';
import ForgotPasswordScreenStyles from '../styles/ForgotPasswordScreenStyles';
import KeyChain from 'react-native-keychain';

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            emailValidation: true,
            passwordValidation: true,
            passwordSecurity: true,
            confirmPasswordSecurity: true,
            emailField: false,
            passwordField: false,
            confirmPasswordField: false,
        }
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            emailField: false
        })
        this.checkEmail()
    }
    checkEmail = async () => {
        try {
            const credential = await KeyChain.getGenericPassword();
            if(credential.username == this.state.email) {
                this.setState({
                    validateEmail: true
                })
            } else {
                this.setState({
                    validateEmail: false
                })
            }
        } catch(error) {
            //console.log(error);
        }
    }

    passwordHandler = async (enteredPassword) => {
        await this.setState({
            password: enteredPassword,
            passwordField: false
        })
        this.checkPassword()
    }

    checkPassword = async () => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(strongRegex.test(this.state.password)) {
            this.setState({
                passwordValidation: true
            })
        }
        else {
            this.setState({
                passwordValidation: false
            })
        }
    }

    confirmPasswordHandler = async (enteredPassword) => {
        await this.setState({
            confirmPassword: enteredPassword
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
        onPress();
    }

    confirmPasswordSecurityHandler = async () => {
        const {onPress} = this.props
        var passwordSecurity = this.state.confirmPasswordSecurity
        if(passwordSecurity == true) {
            this.setState({
                confirmPasswordSecurity: false
            })
        }
        else {
            this.setState({
                confirmPasswordSecurity: true
            })
        }
        onPress();
    }

    confirmPasswordHandler = async (enteredPassword) => {
        await this.setState({
            confirmPassword: enteredPassword,
            confirmPasswordField: false
        })
    }

    handleChangePasswordButton = async () => {
        const {onPress} = this.props
        if(this.state.emailValidation &&
            this.state.passwordValidation &&
            this.state.email != '' &&
            this.state.password != '' &&
            this.state.confirmPassword != '') {

                this.props.navigation.navigate("LogIn");
                this.setKeyChain();
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
            if(this.state.confirmPassword == '') {
                this.setState({
                    confirmPasswordField: true
                })
            } 
        }
        onPress();
    }

    setKeyChain = async () => {
        var username = this.state.email
        var password = this.state.password;
        await KeyChain.setGenericPassword(username, password)
    }

    handleCreateAccountButton = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('SignUp')
        onPress();
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
                                {(this.state.emailField) ? 'Email Required' : null}
                            </Text>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.pop_up_Message_Flex]}>
                                {(this.state.validateEmail || this.state.email == '') ? null : 'Invalid Email..'}
                            </Text>
                        </View>
            
                        <View style = {[ForgotPasswordScreenStyles.TextInput_Style, ForgotPasswordScreenStyles.set_icon]}>
                            <TextInput
                                style = {{width: '88%'}}
                                placeholder = "Password"
                                maxLength = {25}
                                placeholderTextColor = "#b0686d"
                                secureTextEntry = {this.state.passwordSecurity}
                                onChangeText = {this.passwordHandler}
                            />
                            {(this.state.passwordSecurity) 
                                ? <TouchableOpacity 
                                    style= {{alignSelf: 'center'}}
                                    onPress = {this.passwordSecurityHandler}>
                                        <Image style = {ForgotPasswordScreenStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.passwordSecurityHandler}>
                                        <Image style = {ForgotPasswordScreenStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.Fields_Missing]}>
                                {(this.state.passwordField) ? 'Password Required' : null}
                            </Text>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.pop_up_Message_Flex]}>
                                {(this.state.passwordValidation || this.state.password == '') ? null : 'Weak password..'}
                            </Text>
                        </View>

                        <View style = {[ForgotPasswordScreenStyles.TextInput_Style, ForgotPasswordScreenStyles.set_icon]}>
                            <TextInput
                                style = {{width: '88%'}}
                                placeholder = "Confirm Password"
                                maxLength = {25}
                                placeholderTextColor = "#b0686d"
                                secureTextEntry = {this.state.confirmPasswordSecurity}
                                onChangeText = {this.confirmPasswordHandler}
                            />
                            {(this.state.confirmPasswordSecurity) 
                                ? <TouchableOpacity 
                                    style= {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {ForgotPasswordScreenStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {ForgotPasswordScreenStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.Fields_Missing]}>
                                {(this.state.confirmPasswordField) ? 'Required Field' : null}
                            </Text>
                            <Text style = {[ForgotPasswordScreenStyles.pop_up_Message, ForgotPasswordScreenStyles.pop_up_Message_Flex]}>
                                {(this.state.password.includes(this.state.confirmPassword)) ? null : 'Password MissMatch'}
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity style = {[ForgotPasswordScreenStyles.SignUp_Button_Styles, ForgotPasswordScreenStyles.Button_Styles]}
                                onPress = {this.handleChangePasswordButton}>
                                <Text style = {{color: '#dbced2'}}>CHANGE PASSWORD</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style = {ForgotPasswordScreenStyles.Create_Account}
                                onPress = {this.handleCreateAccountButton}>
                                <Text style = {{color: '#912c4c'}}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}