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
    
addNoteToFirebase = async (noteKey, title, note, Deletedstatus, labelKey, archivedStatus) => {
    return new Promise(async (resolve, reject) => {
        if(labelKey == null) {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            const notes = {
                title : title,
                note : note,
                isDeleted: Deletedstatus,
                archivedStatus: archivedStatus
            }
            Firebase.database().ref('notes/' + userDetails.user.uid  + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
            }
            else {
                this.storeDetailsInLabel(noteKey, title, note, Deletedstatus, labelKey, archivedStatus)
            }
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

    deleteNoteForever = (noteKey) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);

            Firebase.database().ref('notes/' + userDetails.user.uid  + '/' + noteKey).remove()
            .then(resolve('success'))
            .catch((error) => reject(error))
        })
    }

    addLabelToTheFirebase = (userId, labelName) => {
        return new Promise((resolve, reject) => {
            var today = new Date()
            var noteKey = ''
            noteKey = today.getFullYear() 
                    + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                    + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                    + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                    + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                    + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())

            Firebase.database().ref('Labels/' + userId + '/' + noteKey).set({
                labelName: labelName
            })
            resolve('success')
            error => reject(error)
        })
    }

    getLabelsFromFirebase = () => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.database().ref('Labels/' + userDetails.user.uid).once('value').then(async snapShot => {
                let labels = snapShot.val() ? snapShot.val() : {}
                resolve(labels)
            })
            .catch(error => reject(error))
        })
    }

    updateLabelInFirebase = (userId, labelNoteKey, labelName) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/' + userId  + '/' + labelNoteKey).set({
                labelName : labelName
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteLabelInFirebase = (userId, labelKey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/' + userId  + '/' + labelKey).remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    storeDetailsInLabel = async (noteKey, title, note, Deletedstatus, labelKey, archivedStatus) => {
        const user = await KeyChain.getGenericPassword();
        const userDetails = JSON.parse(user.password);
        console.log(noteKey, labelKey);
        const notes = {
            title : title,
            note : note,
            isDeleted: Deletedstatus,
            archivedStatus: archivedStatus
        }
        Firebase.database().ref('LabelNotes/' + userDetails.user.uid + '/' + labelKey).set({
            notes : notes
        })
    }
}
export default new UserNoteServices();
