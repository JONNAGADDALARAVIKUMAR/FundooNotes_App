import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import SignUpStyles from '../styles/SignUpStyles';
import KeyChain from 'react-native-keychain';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            firstNameField: false,
            lastNameField: false,
            emailField: false,
            passwordField: false,
            confirmPasswordField: false,
            passwordSecurity: true,
            confirmPasswordSecurity: true,
        }
    }
         
    firstNameHandler = async (enteredFirstName) => {  
        await this.setState ({
            firstName: enteredFirstName.toUpperCase(),
            firstNameField: false
        })

        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.firstName)) 
            ? this.setState({firstNameValidation: true})
            : this.setState({firstNameValidation: false}) 
    }

    lastNameHandler = async (enteredLastName) => {
        await this.setState({
            lastName: enteredLastName.toUpperCase(),
            lastNameField: false
        })

        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.lastName)) 
            ? this.setState({lastNameValidation: true}) 
            : this.setState({lastNameValidation: false})
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            emailField: false
        })
        this.checkEmail()
    }

    checkEmail = async () => {
        const emailRejex = new RegExp("^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$");       
        if(emailRejex.test(this.state.email)) {
            this.setState({
                emailValidation: true
            })
        }
        else {
            this.setState({
                emailValidation: false
            })
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
            confirmPassword: enteredPassword,
            confirmPasswordField: false
        })
    }

    passwordSecurityHandler = async () => {
        const {onPress} = this.props
        var passwordSecurity = this.state.passwordSecurity

        if(passwordSecurity == true) {
            this.setState({
                passwordSecurity: false
            })
        } else {
            this.setState({
                passwordSecurity: true
            })
        }
        onPress();
    }

    confirmPasswordSecurityHandler = async () => {//Conditional rendering
        const {onPress} = this.props
        var confirmPasswordSecurity = this.state.confirmPasswordSecurity
        
        if(confirmPasswordSecurity == true) {
            this.setState({
                confirmPasswordSecurity: false
            })
        } else {
            this.setState({
                confirmPasswordSecurity: true
            })
        }
        onPress();
    }

    handleSignUpButton = async () => {
        const {onPress} = this.props
        if(this.state.emailValidation &&
            this.state.firstNameValidation &&
            this.state.lastNameValidation &&
            this.state.passwordValidation &&
            this.state.firstName != '' &&
            this.state.lastName != '' &&
            this.state.email != '' &&
            this.state.password != '' &&
            this.state.confirmPassword != '') {

                this.props.navigation.navigate("LogIn");
                this.setKeyChain();
        } else {
            if(this.state.firstName == '') {
                this.setState({
                    firstNameField: true
                })
            }
            if(this.state.lastName == '') {
                this.setState({
                    lastNameField: true
                })
            } 
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

    navigateToLogScreenHandler = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('LogIn')
        onPress();
    }

    render() {
        return (
            <View style = {SignUpStyles.background_Styles}>
                <Text style = {SignUpStyles.heading_Style}>Create Account</Text>
                <ScrollView>
                    <Image style = {SignUpStyles.Logo_Style}
                        source = {require('../assets/FundoIcon.png')}
                    />
                    <Text style = {SignUpStyles.Fundo_Style}>Fundo Notes</Text>

                    <View>
                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "First Name"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {this.firstNameHandler}
                        />

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.Fields_Missing]}>
                                {(this.state.firstNameField) ? 'First Name Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.firstNameValidation || this.state.firstName == '') ? null : 'Invalid First Name..'}
                            </Text>
                        </View>
                        
                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "Last Name"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {this.lastNameHandler}
                        />

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.Fields_Missing]}>
                                {(this.state.lastNameField) ? 'Last Name Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.lastNameValidation || this.state.lastName == '') ? null : 'Invalid Last Name..'}
                            </Text>
                        </View>

                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "Email"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {this.emailHandler}
                        />

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.Fields_Missing]}>
                                {(this.state.emailField) ? 'Email Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.emailValidation || this.state.email == '') ? null : 'Invalid Email..'}
                            </Text>
                        </View>

                        <View style = {[SignUpStyles.Input_TextBox_Style, SignUpStyles.set_icon]}>
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
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.passwordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.Fields_Missing]}>
                                {(this.state.passwordField) ? 'Password Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.passwordValidation || this.state.password == '') ? null : 'Weak password..'}
                            </Text>
                        </View>

                        <View style = {[SignUpStyles.Input_TextBox_Style, SignUpStyles.set_icon]}>
                            <TextInput style = {{width: '88%'}}
                                placeholder =   "Confirm Password"
                                maxLength = {25}
                                placeholderTextColor = "#b0686d"
                                secureTextEntry = {this.state.confirmPasswordSecurity}
                                onChangeText = {this.confirmPasswordHandler}
                            />

                            {(this.state.confirmPasswordSecurity) 
                                ? <TouchableOpacity 
                                    style= {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>

                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.Fields_Missing]}>
                                {(this.state.confirmPasswordField) ? 'Required Field' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.password.includes(this.state.confirmPassword)) ? null : 'Password MissMatch'}
                            </Text>
                        </View>

                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {SignUpStyles.Have_Account_Style}>Already Have Account</Text>
                        <TouchableOpacity
                            onPress = {this.navigateToLogScreenHandler}>
                            <Text style = {SignUpStyles.ClickHere_Style}>Click Here</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View>
                        <TouchableOpacity style = {[SignUpStyles.SignUp_Button_Styles, SignUpStyles.Button_Styles]}
                            onPress = {this.handleSignUpButton}>
                            <Text style = {{color: '#dbced2'}}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}