import React from 'react';
import {StyleSheet} from 'react-native'

const ForgotPasswordScreenStyles = StyleSheet.create({
    background_Style: {
        backgroundColor: '#dbb6c3',
        height: '100%'
    },
    App_Name: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: '10%',
        color: '#803439'
    },
    Logo_Style: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    },
    Reset_Password_Style: {
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 18,
        color: '#912c4c'
    },
    TextInput_Style: {
        marginTop: '1%',
        width: '80%',
        height: 45,
        alignSelf: 'center' ,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    pop_up_Message: {
        fontSize: 12,
        textAlign: 'right',
        color: '#f70a1a',
        marginRight: '10%'
    },
    icon: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end'
    },
    set_icon: {
        flexDirection: 'row',
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
    Fields_Missing: {
        flex: 1,
        marginLeft: '7%'
    },
    Password_MissMatch: {
        flex: 0.9
    },
    Create_Account: {
        marginTop: '5%',
        alignSelf: 'center'
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

export default ForgotPasswordScreenStyles;