import React, {Component} from 'react';  
import {Text, View, Image, TouchableOpacity} from 'react-native';  
import UserServices from '../../../services/UserServices';
import {Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileStyles from '../../styles/ProfileStyles'
  
export default class App extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            userDetails: '',
            isImagePressed: false,
            imageUri: ''
        }
    } 

    componentDidMount = async () => {
        UserServices.getDetails()
        .then(userDetails => {
                this.setState({
                    userDetails: userDetails
                })
        })
    }

    handleProfileOnPress = async () => {
        await this.setState({
            isImagePressed: !this.state.isImagePressed
        })
        this.state.isImagePressed ? this.RBSheet.open() : this.RBSheet.close();
    }

    navigateToLogInScreen = async () => {
        const {onPress} = this.props
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        } catch (e) {
            console.log(e);
        }
        this.props.navigation.navigate('LogIn')
        //onPress()
    }

    takePhoto = () => {
        this.RBSheet.close()
        const options = {
            mediaType : 'Profile Image',
            maxWidth : 500,
            maxHeight : 500,
        }
        launchCamera(options, async response => {
            if(!response.didCancel) {  
                console.log(response.uri); 
                this.setState({
                    imageUri: response.uri
                })
            }
        })
    }

    choosePhotoFromGallery = async () => {
        this.RBSheet.close()
        const options = {
            mediaType : 'Profile Image',
            maxWidth : 500,
            maxHeight : 500,
        } 
        launchImageLibrary(options, async response => {
            if(!response.didCancel) {  
                this.setState({
                    imageUri: response.uri
                })
            }
        })
    }

    render() {  
        return ( 
            <View> 
                <View style = {(!this.state.isImagePressed) ? profileStyles.modal : [profileStyles.modal, profileStyles.model_OnPress]}>  
                    <TouchableOpacity onPress = {this.handleProfileOnPress}>
                        <Image 
                            resizeMode = 'cover'
                            source = {(this.state.imageUri != '') 
                                ? {uri: this.state.imageUri}
                                : require('../../assets/defaultProfileImage.jpg')}
                            style = {(this.state.isImagePressed) ? profileStyles.image_OnPress_Style : profileStyles.imageStyle}
                        />
                    </TouchableOpacity>
                    {!this.state.isImagePressed 
                        ? <View>
                            <Text style = {profileStyles.text}>First Name: {this.state.userDetails.firstName}</Text>
                            <Text style = {profileStyles.text}>Last Name: {this.state.userDetails.lastName}</Text>
                            <Text style = {profileStyles.text}>email: {this.state.userDetails.email}</Text>
                            <View style = {profileStyles.button_Align_Style}>
                                <Button
                                    style = {profileStyles.button_Style}
                                    onPress = {this.props.handleProfile}
                                    >Close
                                </Button>
                                <Button
                                    style = {profileStyles.button_Style}
                                    onPress = {this.navigateToLogInScreen}
                                    >Log Out
                                </Button>
                            </View>
                        </View>
                        : null }
                </View>  
                
                <View style={profileStyles.RBSheet_Styles}>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        animationType = {'slide'}
                        height={200}
                        duration={250}
                        customStyles={{
                            container: {
                                alignItems: "center"
                            }
                        }}>
                        <View>
                            <View style = {profileStyles.RBSheet_Icon_Style}>
                                <TouchableOpacity onPress = {() => this.takePhoto()}>
                                    <Image source = {require('../../assets/camera.png')} style = {profileStyles.icon_Style}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => this.choosePhotoFromGallery()}>
                                    <Image source = {require('../../assets/galary.jpg')} style = {profileStyles.icon_Style}/>   
                                </TouchableOpacity>
                            </View>
                            <Button
                                style = {profileStyles.cancel_Button_Style}
                                onPress = {() => {
                                    this.RBSheet.close();
                                    this.setState({
                                        isImagePressed: !this.state.isImagePressed
                                    })
                                }}
                                >Cancel
                            </Button>
                        </View>
                    </RBSheet>
                </View>
            </View>  
        );  
    }  
}    