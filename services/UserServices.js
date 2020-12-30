import Firebase from '../config/Firebase';
import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import KeyChain from 'react-native-keychain';
import FetchBlob from 'react-native-fetch-blob';

const Blob = FetchBlob.polyfill.Blob
const fs = FetchBlob.fs
window.XMLHttpRequest = FetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = FetchBlob.polyfill.Fetch

window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : ['image/']
}).build()

class UserServices {
    createAccount = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                resolve(user)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                        reject('email in use!')
                }
                if (error.code === 'auth/invalid-email') {
                        reject('invalid email!')
                }
                //console.log(error.code);
            })
        })
    }

    logIn = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => resolve(user))
            .catch((error) => {
                if(error.code === 'auth/user-not-found') {
                    reject('User not Found')
                }
                else if(error.code === 'auth/wrong-password') {
                    reject('Invalid Password')
                }
                else if(error.code === 'auth/invalid-email') {
                    reject('Invalid Email')
                }
                //console.log(error.code);
            })
        })
    }

    resetPassword = (email) => {
        
        return new Promise((resolve, reject) => {
            Firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resolve(true)
            })
            .catch((error) => {
                if(error.code === 'auth/invalid-email') {
                    reject('invalid email')
                } else if(error.code === 'auth/user-not-found') {
                    reject('User not found')
                }
                //console.log(error)
            })
        })
    }

    logInWithFacebook = () => {
        return new Promise(async (resolve, reject) => {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                reject('User cancelled the login process');
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                reject('Something went wrong obtaining access token');
            }
            const facebookCredential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            await firebase.auth().signInWithCredential(facebookCredential).then((user) => {
                resolve(user)
            })
        })
    }

    writeUserDataToRealTimedataBase = (email, firstName, lastName, uid) => {
        try {
            Firebase.database().ref('users/' + uid).set({
                firstName : firstName,
                lastName : lastName,
                email : email,
            })
        }
        catch(error) {
            //console.log(error);
        }
    }

    getDetails = () => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.database().ref('users/' +userDetails.user.uid).once('value').then(async snapShot => { 
                resolve(snapShot.val())
            })
            .catch(error => console.log(error))
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
                resolve(url)
              })
              .catch((error) => {
                reject(error)
            })
        })
    }

    getProfileUrl = () => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.storage().ref('/' +userDetails.user.uid).getDownloadURL()
            .then(url => resolve(url))
            .catch(error => reject(error))
        })
    }
}

export default new UserServices();