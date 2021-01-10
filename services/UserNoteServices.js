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
    
addNoteToFirebase = async (noteKey, notes) => {
    return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            Firebase.database().ref('notes/' + userDetails.user.uid  + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    restoreNoteInFirebase = async (title, note, notekey, archivedStatus, labelNoteKeys) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            const notes = {
                title : title,
                note : note,
                isDeleted : false,
                archivedStatus: archivedStatus
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

    addLabelToTheFirebase = (userId, labelName, labelKey) => {
        return new Promise((resolve, reject) => {
            const label = {
                labelName: labelName,
                noteKeys: JSON.stringify([])
            }        
            Firebase.database().ref('Labels/' + userId + '/' + labelKey).set({
                label: label
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

    updateLabelInFirebase = (userId, labelKey, labelName, noteKeys) => {
        return new Promise(async (resolve, reject) => {
            if(noteKeys == undefined) {
                await this.getLabelsFromFirebase()
                .then(async results => {
                    noteKeys = await JSON.parse(results[labelKey].label.noteKeys)
                })
            }
            const label = {
                labelName: labelName,
                noteKeys: JSON.stringify(noteKeys)
            } 
            Firebase.database().ref('Labels/' + userId  + '/' + labelKey).set({
                label: label
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
        const notes = {
            title : title,
            note : note,
            isDeleted: Deletedstatus,
            archivedStatus: archivedStatus
        }
        Firebase.database().ref('LabelNotes/' + userDetails.user.uid + '/' + labelKey + '/' + noteKey).set({
            notes : notes
        })
    }

    addNoteKeysToTheLabelsInFirebase = (labelKey, noteKey) => {
        this.getLabelsFromFirebase()
        .then(async results => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);

            let tempNoteKeys = JSON.parse(results[labelKey].label.noteKeys)
            if(!tempNoteKeys.includes(noteKey)) {
                tempNoteKeys.push(noteKey)
            }
            this.updateLabelInFirebase(userDetails.user.uid, labelKey, results[labelKey].label.labelName, tempNoteKeys)
        })
    }
}
export default new UserNoteServices();
