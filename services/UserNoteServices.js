import Firebase from '../config/Firebase';
import KeyChain from 'react-native-keychain';

class UserNoteServices {

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
    
    addNoteToFirebase = async (noteKey, title, note, Deletedstatus) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            const notes = {
                title : title,
                note : note,
                isDeleted: Deletedstatus
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
