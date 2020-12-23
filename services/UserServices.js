import Firebase from '../config/Firebase';
import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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
}

export default new UserServices();