import React from 'react';
import {StyleSheet} from 'react-native'

const NoteViewStyles = StyleSheet.create({
    list_Container: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        elevation: 0,
        borderColor : "#f58cd0",
        width : '90%',
        marginLeft: '5%',
        marginBottom: '3%'
    },
    list_grid_Container: {
        borderWidth : 2, 
        borderRadius : 10, 
        backgroundColor: 'transparent',
        borderColor : "#f58cd0",
        width : '47%',
        elevation: 0,
        marginLeft: '2%',
        marginBottom: '3%',
    },
    Label_Button_Style : {
        margin: 5,
        borderWidth: 1, 
        borderRadius: 30, 
        backgroundColor: 'transparent',
        borderColor: '#912c4c', 
        fontSize: 5, 
        textAlign: 'center',
    },
    remainder_Styles: {
        margin: 5,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'black'
    },
    remainder_Faded_Styles: {
        alignContent: 'center',
        margin: 3,
        backgroundColor: '#f5848c',
        borderWidth: 1,
        borderColor: 'red'
    }
})
export default NoteViewStyles;