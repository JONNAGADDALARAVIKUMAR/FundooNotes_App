import Firebase from '../config/Firebase';
import KeyChain from 'react-native-keychain';

class UserNoteServices {

    addNoteToFirebase = (title, note, status) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword()
            const userDetails = JSON.parse(user.password)
            const notes = {
                title : title,
                note : note,
                isDeleted: status
            }
            Firebase.database().ref('notes/' + userDetails.user.uid).push({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    getDetailsFromFirebase = () => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.database().ref('notes/' + userDetails.user.uid).once('value').then(async snapShot => { 
                resolve(snapShot.val())
            })
            .catch(error => reject(error))
        })
    }
    
    updateNoteInFirebase = async (title, note, noteKey, status) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            const notes = {
                title : title,
                note : note,
                isDeleted: status
            }
            Firebase.database().ref('notes/' + userDetails.user.uid  + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
            })
        }

        restoreNoteInFirebase = async (title, note, notekey) => {
            return new Promise(async (resolve, reject) => {
                const user = await KeyChain.getGenericPassword();
                const userDetails = JSON.parse(user.password);
                const notes = {
                    title : title,
                    note : note,
                    isDeleted : false
                }
                Firebase.database().ref('notes/' + userDetails.user.uid  + '/' + notekey).set({
                    notes : notes
                })
                .then(() => resolve('success'))
                .catch(error => reject(error))
            })
        }
    }

export default new UserNoteServices();
