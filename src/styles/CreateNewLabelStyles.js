import {StyleSheet} from 'react-native';

const CreateNewLabelStyles = StyleSheet.create({
    backGround_Style: {
        backgroundColor: '#f5dcef', 
        height: '100%'
    },
    appbar_Style: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    appbar_Style_Active: {
        backgroundColor: 'transparent',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        elevation: 0,
    },
    edit_LabelStyle: {
        fontSize: 17, 
        paddingLeft: 15
    },
    textInput_Style: {
        width: '70%', 
        fontSize: 15,
    }
})
export default CreateNewLabelStyles;