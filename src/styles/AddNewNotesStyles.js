import {StyleSheet} from 'react-native';

const AddNewNotesScreenStyles = StyleSheet.create({
    backGround_Style: {
        backgroundColor: '#f5dcef', 
        height: '100%'
    },
    title_Style: {
        fontSize: 20, 
        paddingLeft: 30
    },
    notes_Style: {
        fontSize: 17, 
        paddingLeft: 30
    },
    bottomBar_Style: {
        justifyContent: 'space-around', 
        backgroundColor: 'transparent'
    },
    Label_Button_Style : {
        padding: 5,
        borderWidth: 1, 
        borderRadius: 50, 
        borderColor: '#f58cd0', 
        fontSize: 12, 
        marginLeft: 30,
        marginTop: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    Remainder_Button_Style : {
        marginLeft: 30,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'black'
    },
    Remainder_Faded_Button_Style: {
        marginLeft: 30,
        backgroundColor: '#f5848c',
        borderWidth: 1,
        borderColor: 'red'
    },
    modal_container_style : {
        backgroundColor: 'white', 
        padding: 25,
        width : 280,
        alignSelf : 'center',
    }
})
export default AddNewNotesScreenStyles;

