import SQLiteStorageServices from "./SQLiteStorageServices";
import UserNoteServices from "./UserNoteServices";

class NoteDataController {

    addNote = (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            SQLiteStorageServices.storeDetailsInSQLiteDataBase(noteKey, notes)
            .then((results) => {
                UserNoteServices.addNoteToFirebase(noteKey, notes)
                .then(console.log('success'))
                .catch((error) => console.log(error))
                resolve('success')
            })
            .catch(error => reject(error)) 
        })
    } 

    updateNote = (noteKey, notes) => {
        return new Promise((resolve, reject) => {
            SQLiteStorageServices.updateDetailsInSQLiteDataBase(noteKey, notes)
            .then((results) => resolve(results))
            .catch(error => reject(error))

            UserNoteServices.addNoteToFirebase(noteKey, notes)
            .then()
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