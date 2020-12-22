import React from 'react';
import {StyleSheet} from 'react-native'

const DashBoardScreenStyles = StyleSheet.create({
    App_Bar_Style: {
        backgroundColor: '#f0cee6',
        margin: 5,
        shadowColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#912c4c',
        height: '7%',
    },
    App_Bar_Style_Bottom: {
            backgroundColor: '#f0cee6',
            margin: 5,
            shadowColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#912c4c',
            height: '35%',
            marginBottom: 30
    },
    Text_Style: {
        textAlignVertical: 'center', 
        textAlign: 'center', 
        marginTop: '80%', 
        color: '#912c4c', 
        fontSize: 30,
    },
    Search_Bar_Style: {
        width: '60%', 
        backgroundColor: '#f7e9f3', 
        height: '90%'
    },
    LogOut_Button_Style: {
        marginRight: '20%',
        marginLeft: '20%',
        marginTop: '20%',
        backgroundColor: '#912c4c',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    SearchBox_Style: {
        width: '60%', 
        backgroundColor: '#f7e9f3', 
        height: '90%'
    },
    Add_Notes_Icon_Style: {
        marginLeft: '20%', 
        height: 45,width: 45, 
        borderWidth: 1, 
        marginBottom: 30, 
        backgroundColor: '#f542b3'
    }
})
export default DashBoardScreenStyles;
