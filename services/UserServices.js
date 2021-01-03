import Firebase from '../config/Firebase';
import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import KeyChain from 'react-native-keychain';
import UserNoteServices from './UserNoteServices';
import SQLiteStorageServices from './SQLiteStorageServices';

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
            .then(user => {
                this.fillSQLiteDatabaseWithMissingNotesByFetchingFromFirebase()
                resolve(user)
            })
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
        return new Promise(async (resolve) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.database().ref('users/' +userDetails.user.uid).once('value').then(async snapShot => { 
                resolve(snapShot.val())
            })
            .catch(error => console.log(error))
        })
    }

    uploadProfileImageUrlToUsers = (imageUrl) => {
        this.getDetails().then(async userDetails => {
            const user = await KeyChain.getGenericPassword();
            const Details = JSON.parse(user.password);
            Firebase.database().ref('users/' + Details.user.uid).set({
                firstName : userDetails.firstName,
                lastName : userDetails.lastName,
                email : userDetails.email,
                imageURL: imageUrl
            })
        })
    }

    logOutFromFirebase = () => {
        Firebase.auth().signOut().then(() => console.log('signed out'))
    }

    fillSQLiteDatabaseWithMissingNotesByFetchingFromFirebase = () => {
        UserNoteServices.getDetailsFromFirebase()
        .then(firebaseNotes => {
            SQLiteStorageServices.getDetailsFromSQLiteDatabase()
            .then(SQLiteNotes => {
                let NoteKeys = []
                for(let i = 0; i < SQLiteNotes.rows.length; i++) {
                    NoteKeys.push(SQLiteNotes.rows.item(i).NoteKey)
                }
                let keys = Object.keys(firebaseNotes);
                keys.map(key => {
                    if(!NoteKeys.includes(key)){
                        SQLiteStorageServices.addDetailsInSQLiteDataBaseFromFirebase(key, firebaseNotes[key].notes.title, firebaseNotes[key].notes.note, firebaseNotes[key].notes.isDeleted)
                    }
                })
            })
        })
    }
}

export default new UserServices();