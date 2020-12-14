import React from 'react';
import { StyleSheet } from 'react-native'

const LogInScreenStyles = StyleSheet.create ({
    Logo_Style: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: '15%',
        marginBottom: '5%'
    },
    background_Styles: {
        backgroundColor: '#dbb6c3',
        height: '100%'
    },
    Input_TextBox_Style: {
        marginTop: '5%',
        width: '80%',
        height: '9%',
        borderColor: '#b0466a',
        alignSelf: 'center' ,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    LogIn_Button_Styles: {
        marginLeft: '10%',
        marginRight: '3%',
    },
    SignUp_Button_Styles: {
        marginRight: '10%',
        marginLeft: '3%',
    },
    Button_Styles: {
        marginTop: '10%',
        backgroundColor: '#912c4c',
        flex: 1,
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    forgot_Password_Style: {
        marginTop: '3%',
        marginLeft: '10%',
        color: '#de12c1',
    },
    Fundo_Style: {
        fontSize: 25,
        color: '#803439',
        fontFamily: '',
        textAlign: 'center',
        marginBottom: '5%'
    },
    icon: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end'
    },
    set_icon: {
        flexDirection: 'row',
    },
    Input_TextBox_StylePassword: {
        marginTop: '10%',
        width: '80%',
        height: '8%',
        borderColor: '#b0466a',
        alignSelf: 'center' ,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    pop_up_Message: {
        fontSize: 12,
        textAlign: 'right',
        color: '#f70a1a',
        marginRight: '10%'
    },
    pop_up_Message_Flex: {
        flex: 0.9
    },
    Fields_Missing: {
        flex: 1,
        marginLeft: '10%',
        textAlign: 'left'
    },
})

export default LogInScreenStyles;