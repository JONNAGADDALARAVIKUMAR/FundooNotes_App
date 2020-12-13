import React, { Component } from 'react';
import {Image, ScrollView, TextInput, View, Text, TouchableOpacity} from 'react-native';
import LogInScreenStyles from '../styles/LogInPageStyles';
import KeyChain from 'react-native-keychain';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            passwordSecurity: true,
            invalidPassword: false,
            invalidEmail: false
        }
    }

    emailHandler = async (enteredEmail) => {
        await this.setState({
            email: enteredEmail,
            invalidPassword: false,
            invalidEmail: false
        })
    }

    passwordHandler = async (enteredPassword) => {
        await this.setState({
            password: enteredPassword,
            invalidPassword: false,
            invalidEmail: false

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
    logInHandlar = async () => {
        try {
            const credential = await KeyChain.getGenericPassword();
            if(credential.username == this.state.email) {
                if(credential.password == this.state.password) {
                    this.props.navigation.navigate('AfterLoggingIn')
                } else {
                    this.setState({
                        invalidPassword: true
                    })
                }
            } else {
                this.setState({
                    invalidEmail: true
                })
            }
        } catch(error) {
            console.log(error);
        }
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
                            onChangeText = {(email) => this.emailHandler(email)}
                        />
                        <Text style = {LogInScreenStyles.pop_up_Message}>
                            {(this.state.invalidEmail) ? 'Invalid Email..' : null}
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
                        {(this.state.invalidPassword) ? 'Invalid password..' : null}
                    </Text>
                    
                    <TouchableOpacity>
                        <Text style = {LogInScreenStyles.forgot_Password_Style}>Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style = {{flexDirection: 'row'}}>
                        <TouchableOpacity style = {[LogInScreenStyles.LogIn_Button_Styles, LogInScreenStyles.Button_Styles]}
                        onPress = {() => this.logInHandlar()}
                        >
                            <Text style = {{color: '#dbced2'}}>LOG IN</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style = {[LogInScreenStyles.SignUp_Button_Styles, LogInScreenStyles.Button_Styles]}
                        onPress = {() => this.props.navigation.navigate('SignUp')}
                        >
                            <Text style = {{color: '#dbced2'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}