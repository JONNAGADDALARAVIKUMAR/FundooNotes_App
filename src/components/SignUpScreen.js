import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import SignUpStyles from '../styles/SignUpStyles';
import UserServices from '../../services/UserServices';
import Firebase from '../../config/Firebase';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            firstNameValidation: true,
            isFirstNameFieldEmpty: false,
            lastNameValidation: true,
            isLastNameFieldEmpty: false,
            isEmailFieldEmpty: false,
            emailError: '',
            emailValidation: true,
            isPasswordFieldEmpty: false,
            passwordError: '',
            passwordValidation: true,
            isPasswordFieldEmpty: false,
            isConfirmPasswordFieldEmpty: false,
            passwordSecurity: true,
            confirmPasswordSecurity: true,
        }
    }
         
    firstNameHandler = async (enteredFirstName) => {  
        await this.setState ({
            firstName: enteredFirstName.toUpperCase(),
            isFirstNameFieldEmpty: false
        })

        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.firstName)) 
            ? this.setState({firstNameValidation: true})
            : this.setState({firstNameValidation: false}) 
    }

    lastNameHandler = async (enteredLastName) => {
        await this.setState({
            lastName: enteredLastName.toUpperCase(),
            isLastNameFieldEmpty: false
        })

        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.lastName)) 
            ? this.setState({lastNameValidation: true}) 
            : this.setState({lastNameValidation: false})
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            isEmailFieldEmpty: false,
            emailError: ''
        })
        this.checkEmail()
    }

    checkEmail = async () => {
        const emailRejex = new RegExp("^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$");       
        if(emailRejex.test(this.state.email)) {
            this.setState({
                emailValidation: true
            })
        } else {
            this.setState({
                emailValidation: false,
                emailError: 'Pattern not matching'
            })
        }
    }

    passwordHandler = async (enteredPassword) => {
        await this.setState({
            password: enteredPassword,
            isPasswordFieldEmpty: false,
            passwordError: ''
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
                passwordValidation: false,
                passwordError: 'Weak Password'
            })
        }
    }

    confirmPasswordHandler = async (enteredPassword) => {
        await this.setState({
            confirmPassword: enteredPassword,
            isConfirmPasswordFieldEmpty: false
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
        (this.props == undefined ) ? null : onPress();
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
        (this.props == undefined ) ? null : onPress();
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
                UserServices.createAccount(this.state.email, this.state.password)
                .then((user) => {
                    this.props.navigation.navigate("DashBoard");
                    UserServices.writeUserDataToRealTimedataBase(user.user.email, this.state.firstName, this.state.lastName, user.user.uid)
                })
                .catch(error => {
                    if (error === 'email in use!') {
                        this.setState({
                            emailError: 'email in use!'
                        })
                    }
                    if (error === 'invalid email!') {
                        this.setState({
                            emailError: 'invalid email!'
                        })
                    }
                });
            } else {
                if(this.state.firstName == '') {
                    this.setState({
                        isFirstNameFieldEmpty: true
                    })
                }
                if(this.state.lastName == '') {
                    this.setState({
                        isLastNameFieldEmpty: true
                    })
                } 
                if(this.state.email == '') {
                    this.setState({
                        isEmailFieldEmpty: true
                    })
                }
                if(this.state.password == '') {
                    this.setState({
                        isPasswordFieldEmpty: true
                    })
                }
                if(this.state.confirmPassword == '') {
                    this.setState({
                        isConfirmPasswordFieldEmpty: true
                    })
                } 
            }
            //(this.props == undefined ) ? null : onPress();
    }

    navigateToLogScreenHandler = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('LogIn')
        //onPress();
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
                                {(this.state.isFirstNameFieldEmpty) ? 'First Name Required' : null}
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
                                {(this.state.isLastNameFieldEmpty) ? 'Last Name Required' : null}
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
                                {(this.state.isEmailFieldEmpty) ? 'Email Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.emailError == '') ? null : this.state.emailError}
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
                                {(this.state.isPasswordFieldEmpty) ? 'Password Required' : null}
                            </Text>
                            <Text style = {[SignUpStyles.pop_up_Message, SignUpStyles.pop_up_Message_Flex]}>
                                {(this.state.passwordValidation || this.state.passwordError == '' || this.state.password == '') ? null : this.state.passwordError}
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
                                {(this.state.isConfirmPasswordFieldEmpty) ? 'Required Field' : null}
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