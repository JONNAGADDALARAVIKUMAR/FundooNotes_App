import SQLiteStorageServices from "./SQLiteStorageServices";
import UserNoteServices from "./UserNoteServices";

class NoteDataController {

    addNote = (title, note, deletedStatus, labelKey, archivedStatus) => {
        return new Promise(async (resolve, reject) => {
            var noteKey = await this.generateRandomKey();
            SQLiteStorageServices.storeDetailsInSQLiteDataBase(noteKey, title, note, deletedStatus)
            .then((results) => {
                console.log(labelKey);
                UserNoteServices.addNoteToFirebase(noteKey, title, note, deletedStatus, labelKey, archivedStatus)
                .then(() => {
                    //console.log('Uploaded to Firabase')
                })
                .catch((error) => console.log(error))
                resolve(results)
            })
            .catch(error => reject(error)) 
        })
    } 

    updateNote = (noteKey, title, note, deletedStatus) => {
        return new Promise((resolve, reject) => {
            SQLiteStorageServices.updateDetailsInSQLiteDataBase(noteKey, title, note, deletedStatus)
            .then((results) => resolve(results))
            .catch(error => reject(error))

            UserNoteServices.addNoteToFirebase(noteKey, title, note, deletedStatus)
            .then(console.log('Updated in Firebase'))
            .catch((error) => console.log(error))
        })
    }

    deletePermanently = (noteKey) => {
        SQLiteStorageServices.deleteNoteForever(noteKey)
        .then(() => console.log('deleted Note in SQLite Database'))
        .catch((error) => console.log(error))

        UserNoteServices.deleteNoteForever(noteKey)
        .then(() => console.log('deleted Note in Firebase'))
        .catch((error) => console.log(error))
    }

    generateRandomKey = () => {
        const alphaNemuricChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        var today = new Date()
        var noteKey = ''
        noteKey = today.getFullYear() 
                    + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                    + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                    + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                    + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                    + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())

        for(let i = 0; i < 6; i++) {
            noteKey += alphaNemuricChars.charAt(Math.floor(Math.random() * alphaNemuricChars.length))
        }
        return noteKey
    }
}

export default new NoteDataController