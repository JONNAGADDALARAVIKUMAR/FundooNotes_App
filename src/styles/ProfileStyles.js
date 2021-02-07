import {StyleSheet} from 'react-native';

const profileStyles = StyleSheet.create({
    modal: {    
        backgroundColor : "#f5d3e9",   
        height: 300 ,  
        width: '80%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: 'gray',    
        marginTop: 80,  
        marginLeft: 40,  
   },  
   model_OnPress: {
        marginBottom: '30%'
   },
   imageStyle: {
        height: 80, 
        width: 80,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '10%'
   },
   text: {  
        color: '#3f2949',  
        marginTop: 5,
        marginLeft: '5%',
        alignSelf: 'center'  
   },
   button_Style: {
        fontSize: 15,
        backgroundColor: 'white',
        width: '20%',
        borderRadius: 5,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: '5%'
   },
   image_OnPress_Style: {
        height: 300 ,  
        width: '100%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: 'gray',    
        alignSelf: 'center', 
        marginBottom: '20%'
   },
   icon_Style: {
        height: 50, 
        width: 50, 
        marginTop: '50%'
   }, 
   RBSheet_Button_Style: {
        backgroundColor: '#fccfed', 
        marginTop: '5%', 
        borderRadius: 50,
        minWidth: 250
   }, 
   button_Style: {
       backgroundColor: '#fa91d7', 
       marginTop: '10%', 
       width: '40%', 
       alignSelf: 'center'
    },
    RBSheet_Icon_Style: {
        flexDirection: 'row', 
        width: '65%', 
        justifyContent: 'space-around'
    },
    RBSheet_Styles: { 
        flex: 1, 
        marginTop: 50, 
        alignItems: "center" 
    },
    button_Align_Style: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }
})

export default profileStyles;