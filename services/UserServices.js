import Firebase from '../config/Firebase';
import firebase from 'firebase';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';

class UserServices {
    createAccount = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log();
                resolve('User account created & signed in!')
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                        reject('email in use!')
                }
                if (error.code === 'auth/invalid-email') {
                        reject('invalid email!')
                }
                console.log(error);
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
                console.log(error.code);
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
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                reject('User cancelled the login process');
            }
            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                reject('Something went wrong obtaining access token');
            }
            // Create a Firebase credential with the AccessToken
            const facebookCredential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // Sign-in the user with the credential
            await firebase.auth().signInWithCredential(facebookCredential).then((user) => {
                resolve(user)
            })
        })
    }
}

export default new UserServices();