import {StyleSheet} from 'react-native'

const DashBoardScreenStyles = StyleSheet.create({
    App_Bar_Style: {
        backgroundColor: '#f0cee6',
        margin: 10,
        shadowColor: "black",
        justifyContent: 'space-around',
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
    App_Bar_Style_Bottom: {
        justifyContent: 'space-around',
        backgroundColor: '#f0cee6',
        borderWidth: 1,
        borderColor: 'gray',
    },
    Search_Bar_Style: {
        width: '60%', 
        backgroundColor: '#f7e9f3', 
        height: '90%'
    },
    SearchBox_Style: {
        width: '60%', 
        backgroundColor: '#f7e9f3', 
        height: '90%'
    },
    Add_Notes_Icon_Style: {
        height: 45,
        width: 45, 
        borderWidth: 1, 
        borderColor: 'gray',
        marginBottom: 60, 
        backgroundColor: '#f5b5ed',
        marginRight: '10%',
        shadowOffset: {
	        width: 5,
	        height: 3,
        },
        shadowOpacity: 0.86,
        shadowRadius: 6.98,
        elevation: 9,
    }, 
    bulb_Style: {
        alignSelf: 'center',
        marginTop: '20%',
        marginBottom: '5%'
    },
    Appear_Text_Style: {
        textAlign: 'center',
    },
    Search_Style: {
        color: 'gray',
        fontSize: 18
    }
})

export default DashBoardScreenStyles;
