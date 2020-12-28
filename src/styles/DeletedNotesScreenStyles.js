import {StyleSheet} from 'react-native'

const DeletedNotesScreenStyles = StyleSheet.create({
    Screen_Style: {
        backgroundColor: '#f2d5e5',
        height: '100%'      
    },
    App_Bar_Style: {
        backgroundColor: '#f0cee6',
        margin: 10,
        shadowColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        shadowColor: "#ccc6c9",
        shadowOffset: {
	        width: 5,
	        height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    Deleted_Text_Style: {
        fontSize: 20
    }
})

export default DeletedNotesScreenStyles;