import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import LogInScreenStyles from '../styles/LogInPageStyles';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AppName : props.AppName,
            email : '',
            password : '',
            passwordValidation: true,
            emailValidation: true,
            passwordSecurity: true
        }
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail
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
            password: enteredPassword
        })
        this.checkPassword()
    }
    checkPassword = async () => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,28})");
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
    passwordSecurityHandler = async () => {
        const {onPress} = this.props
        var passwordSecurity = this.state.passwordSecurity
        if(passwordSecurity == true)
        this.setState({
            passwordSecurity: false
        })
        else
        this.setState({
            passwordSecurity: true
        })
        onPress();
    }

    render() {
        return (
            <View style = {LogInScreenStyles.background_Styles}>
                <ScrollView>
                    <Image style = {LogInScreenStyles.Logo_Style}
                        source = {require('../assets/FundoIcon.png')}
                    />
                    <Text style = {LogInScreenStyles.Fundo_Style}>{this.state.AppName}</Text>

                        <TextInput
                            style = {LogInScreenStyles.Input_TextBox_Style}
                            placeholder = "Email"
                            placeholderTextColor = "#b0686d"
                            onChangeText = {(email) => this.emailHandler(email)}
                        />
                        <Text style = {LogInScreenStyles.pop_up_Message}>
                            {(this.state.emailValidation || this.state.email == '') ? null : 'Invalid Email..'}
                        </Text>
 
                    <View style = {[LogInScreenStyles.Input_TextBox_Style, LogInScreenStyles.set_icon]}>
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
                                    <Image style = {LogInScreenStyles.icon} source = {require('../assets/showPasswordIcon.png')}/>
                            </TouchableOpacity> 
                            : 
                            <TouchableOpacity 
                                style = {{alignSelf: 'center'}}
                                onPress = {this.passwordSecurityHandler}>
                                    <Image style = {LogInScreenStyles.icon} source = {require('../assets/hidePasswordIcon.png')}/>
                            </TouchableOpacity>  
                        }
                    </View>  

                    <Text style = {LogInScreenStyles.pop_up_Message}>
                        {(this.state.passwordValidation || this.state.password == '') ? null : 'Weak password..'}
                    </Text>
                    
                    <TouchableOpacity>
                        <Text style = {LogInScreenStyles.forgot_Password_Style}>Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style = {{flexDirection: 'row'}}>
                        <TouchableOpacity style = {[LogInScreenStyles.LogIn_Button_Styles, LogInScreenStyles.Button_Styles]}
                        // onPress = {() => this.props.navigation.navigate('Length')}
                        >
                            <Text style = {{color: '#dbced2'}}>LOG IN</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style = {[LogInScreenStyles.SignUp_Button_Styles, LogInScreenStyles.Button_Styles]}
                        //onPress = {() => this.props.navigation.navigate('SignUp')}
                        >
                            <Text style = {{color: '#dbced2'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}