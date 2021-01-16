import React from 'react';
import {StyleSheet} from 'react-native'

const NoteViewStyles = StyleSheet.create({
    list_Container: {
        backgroundColor: 'transparent',
        width : '96%',
        marginLeft: '2%',
        marginBottom: '3%',

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    list_grid_Container: {
        backgroundColor: 'transparent',
        width : '48%',
        marginLeft: '1%',
        marginBottom: '3%',

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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