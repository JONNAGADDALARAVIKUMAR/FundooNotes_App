import React, {Component} from 'react';  
import {Text, View, Image, TouchableOpacity} from 'react-native';  
import UserServices from '../../../services/UserServices';
import {Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileStyles from '../../styles/ProfileStyles';
import FetchBlob from 'react-native-fetch-blob';
import Firebase from '../../../config/Firebase';
import KeyChain from 'react-native-keychain';
import { strings } from '../../Languages/strings';

const Blob = FetchBlob.polyfill.Blob
const fs = FetchBlob.fs
window.XMLHttpRequest = FetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = FetchBlob.polyfill.Fetch
  
export default class App extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            userDetails: '',
            isImagePressed: false,
            photoURL: this.props.photoURL
        }
    } 

    componentDidMount = async () => {
        await UserServices.getDetails()
        .then(userDetails => {
            this.setState({
                userDetails: userDetails
            })
        })
    }

    handleProfileOnPress = async () => {
        const {onPress} = this.props
        await this.setState({
            isImagePressed: !this.state.isImagePressed
        })
        this.state.isImagePressed ? this.RBSheet.open() : this.RBSheet.close();
        //onPress()
    }

    navigateToLogInScreen = async () => {
        const {onPress} = this.props
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        UserServices.logOutFromFirebase()
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
                await this.uploadProfileImage(response.uri)
                .then(url => {
                    this.setState({
                        photoURL: url
                    })
                })
                .catch(async error => {
                    if(error.code == 'storage/object-not-found') {
                        await this.setState({
                            photoURL : ''
                        })
                    }
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
                await this.uploadProfileImage(response.uri)
                .then(url => {
                    this.setState({
                        photoURL: url
                    })
                })
                .catch(async error => {
                    if(error.code == 'storage/object-not-found') {
                        await this.setState({
                            photoURL : ''
                        })
                    }
                })
            }
        })
    }

    uploadProfileImage = (uri, mime = 'application/octet-stream') => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            
            let uploadBlob = null
            const imageRef = Firebase.storage().ref(userDetails.user.uid)
            fs.readFile(uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                UserServices.uploadProfileImageUrlToUsers(url);
                resolve(url)
              })
              .catch((error) => {
                reject(error)
            })
        })
    }

    render() {  
        return ( 
            <View> 
                <View style = {(!this.state.isImagePressed) ? profileStyles.modal : [profileStyles.modal, profileStyles.model_OnPress]}>  
                    <TouchableOpacity onPress = {this.handleProfileOnPress}>
                        <Image 
                            resizeMode = 'cover'
                            source = {(this.state.photoURL != '') 
                                ? {uri: this.state.photoURL}
                                : require('../../assets/defaultProfileImage.jpg')}
                            style = {(this.state.isImagePressed) ? profileStyles.image_OnPress_Style : profileStyles.imageStyle}
                        />
                    </TouchableOpacity>
                    {!this.state.isImagePressed 
                        ? <View>
                            <Text style = {profileStyles.text}>{this.state.userDetails.firstName} {this.state.userDetails.lastName}</Text>
                            <Text style = {profileStyles.text}>{this.state.userDetails.email}</Text>
                            <View style = {profileStyles.button_Align_Style}>
                                <Button
                                    style = {profileStyles.button_Style}
                                    onPress = {() => {
                                        this.props.navigation.push('Home', {screen: 'Notes'})
                                        this.props.handleProfile}}
                                    >{strings.Close}
                                </Button>
                                <Button
                                    style = {profileStyles.button_Style}
                                    onPress = {this.navigateToLogInScreen}
                                    >{strings.LogOut}
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
                                alignItems: "center",
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30
                            }
                        }}>
                        <View>
                            <Button
                                style = {profileStyles.RBSheet_Button_Style}
                                onPress = {() => {
                                    this.takePhoto()
                                    this.RBSheet.close();
                                }}
                            >{strings.TakePhoto}
                            </Button>
                            <Button
                                style = {profileStyles.RBSheet_Button_Style}
                                onPress = {() => {
                                    this.choosePhotoFromGallery()
                                    this.RBSheet.close();
                                }}
                            >{strings.ChooseFromLibrary}
                            </Button>
                            <Button
                                style = {profileStyles.RBSheet_Button_Style}
                                onPress = {() => {
                                    this.RBSheet.close();
                                    this.setState({
                                        isImagePressed: !this.state.isImagePressed
                                    })
                                }}
                            >{strings.Cancel}
                            </Button>
                        </View>
                    </RBSheet>
                </View>
            </View>  
        );  
    }  
}    