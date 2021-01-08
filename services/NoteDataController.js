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
}

export default new NoteDataController