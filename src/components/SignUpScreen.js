import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import SignUpStyles from '../styles/SignUpStyles';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AppName: props.AppName,
            ScreenType: props.ScreenType,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            emailValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            passwordValidation: true,
            passwordSecurity: true,
            confirmPasswordSecurity: true,
        }
    }
         
    firstNameHandler = async (enteredFirstName) => {  
        await this.setState ({
            firstName: enteredFirstName
        })
        console.log(this.state.firstName);
        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.firstName)) ? this.setState({firstNameValidation: true}) : this.setState({firstNameValidation: false}) 
    }

    lastNameHandler = async (enteredLastName) => {
        await this.setState({
            lastName: enteredLastName
        })
        const nameRejex = new RegExp("(^[A-Za-z]+$)");
        (nameRejex.test(this.state.lastName)) ? this.setState({lastNameValidation: true}) : this.setState({lastNameValidation: false})
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail
        })
        this.checkEmail();
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
            password: enteredPassword
        })
        this.checkPassword();
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
        //const {onPress} = this.props
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
        //onPress();
    }
    confirmPasswordSecurityHandler = async () => {
        //const {onPress} = this.props
        var confirmPasswordSecurity = this.state.confirmPasswordSecurity
        if(confirmPasswordSecurity == true) {
            this.setState({
                confirmPasswordSecurity: false
            })
        }
        else {
            this.setState({
                confirmPasswordSecurity: true
            })
        }
        //onPress();
    }

    render() {
        return (
            <View style = {SignUpStyles.background_Styles}>
                <Text style = {SignUpStyles.heading_Style}>{this.state.ScreenType}</Text>
                <ScrollView>
                    <Image style = {SignUpStyles.Logo_Style}
                        source = {require('../assets/FundoIcon.png')}
                    />
                    <Text style = {SignUpStyles.Fundo_Style}>{this.state.AppName}</Text>

                    <View>
                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "First Name"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {(firstName) => this.firstNameHandler(firstName.toUpperCase())}
                        />
                        <Text style = {SignUpStyles.pop_up_Message}>
                            {(this.state.firstNameValidation || this.state.firstName == '') ? null : 'Invalid First Name..'}
                        </Text>

                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "Last Name"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {(lastName) => this.lastNameHandler(lastName)}
                        />
                        <Text style = {SignUpStyles.pop_up_Message}>
                            {(this.state.lastNameValidation || this.state.lastName == '') ? null : 'Invalid Last Name..'}
                        </Text>

                        <TextInput
                            style = {SignUpStyles.Input_TextBox_Style}
                            placeholder = "Email"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {(email) => this.emailHandler(email)}
                        />
                        <Text style = {SignUpStyles.pop_up_Message}>
                            {(this.state.emailValidation || this.state.email == '') ? null : 'Invalid Email..'}
                        </Text>

                        <View style = {[SignUpStyles.Input_TextBox_Style, SignUpStyles.set_icon]}>
                            <TextInput style = {{width: '88%'}}
                                placeholder =   "Password"
                                maxLength = {25}
                                placeholderTextColor = "#b0686d"
                                secureTextEntry = {this.state.passwordSecurity}
                                onChangeText = {(password) => this.passwordHandler(password)}
                            />
                            {(this.state.passwordSecurity) ?
                                <TouchableOpacity 
                                    style= {{alignSelf: 'center'}}
                                    onPress = {this.passwordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : 
                                <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.passwordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>
                        <Text style = {SignUpStyles.pop_up_Message}>
                            {(this.state.passwordValidation || this.state.password == '') ? null : 'Weak password..'}
                        </Text>

                        <View style = {[SignUpStyles.Input_TextBox_Style, SignUpStyles.set_icon]}>
                            <TextInput style = {{width: '88%'}}
                                placeholder =   "Confirm Password"
                                maxLength = {25}
                                placeholderTextColor = "#b0686d"
                                secureTextEntry = {this.state.confirmPasswordSecurity}
                                onChangeText = {(confirmPassword) => this.confirmPasswordHandler(confirmPassword)}
                            />
                            {(this.state.confirmPasswordSecurity) ?
                                <TouchableOpacity 
                                    style= {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                                </TouchableOpacity> 
                                : 
                                <TouchableOpacity 
                                    style = {{alignSelf: 'center'}}
                                    onPress = {this.confirmPasswordSecurityHandler}>
                                        <Image style = {SignUpStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>
                        <Text style = {SignUpStyles.pop_up_Message}>
                            {(this.state.password.includes(this.state.confirmPassword)) ? null : 'Password MissMatch'}
                        </Text>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {SignUpStyles.Have_Account_Style}>Already Have Account</Text>
                        <TouchableOpacity>
                            <Text style = {SignUpStyles.ClickHere_Style}>Click Here</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style = {[SignUpStyles.SignUp_Button_Styles, SignUpStyles.Button_Styles]}>
                            <Text style = {{color: '#dbced2'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}