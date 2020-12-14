import React from 'react';
import { StyleSheet } from 'react-native'

const SignUpScreenStyles = StyleSheet.create ({
    Logo_Style: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    },
    background_Styles: {
        backgroundColor: '#dbb6c3',
        height: '100%'
    },
    Input_TextBox_Style: {
        marginTop: '1%',
        width: '80%',
        height: 45,
        alignSelf: 'center' ,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    SignUp_Button_Styles: {
        marginRight: '20%',
        marginLeft: '20%',
    },
    Button_Styles: {
        marginTop: '5%',
        backgroundColor: '#912c4c',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    pop_up_Message: {
        fontSize: 12,
        textAlign: 'right',
        color: '#f70a1a',
        marginRight: '10%'
    },
    Fundo_Style: {
        fontSize: 23,
        color: '#803439',
        textAlign: 'center',
        marginBottom: '3%'
    },
    heading_Style: {
        fontSize: 20,
        color: '#912c4c',
        marginTop: '1%',
        textAlign: 'center',
        marginBottom: '1%'
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
    ClickHere_Style: {
        marginLeft: 5,
        color: '#3b59c4',
    },
    Have_Account_Style: {
        color: '#42242c',
        marginLeft: '10%'
    },
    Fields_Missing: {
        flex: 1,
        marginLeft: '10%',
        textAlign: 'left'
    },
    pop_up_Message_Flex: {
        flex: 0.9
    }
})

export default SignUpScreenStyles;