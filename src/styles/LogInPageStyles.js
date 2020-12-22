import React from 'react';
import { StyleSheet } from 'react-native'

const LogInScreenStyles = StyleSheet.create ({
    Logo_Style: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '5%'
    },
    background_Styles: {
        backgroundColor: '#f2d5e5',
        height: '120%'
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
        marginTop: '8%',
        backgroundColor: '#912c4c',
        flex: 1,
        alignItems: 'center',
        height: 45,
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
    Login_with_FaceBook: {
        marginRight: '20%',
        marginLeft: '20%',
        marginTop: '7%',
        backgroundColor: '#5081f2',
        alignItems: 'center',
        height: 35,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        padding: 20
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain' 
      }
})

export default LogInScreenStyles;