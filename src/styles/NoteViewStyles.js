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
        width : '45%',
        elevation: 0,
        marginLeft: '2.5%',
        marginBottom: '3%'
    },
    list_Style : {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    }
})
export default NoteViewStyles;