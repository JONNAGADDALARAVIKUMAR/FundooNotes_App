import SQLiteLabelServices from "./SQLiteLabelServices";
import SQLiteStorageServices from "./SQLiteStorageServices";
import UserNoteServices from "./UserNoteServices";
import FirebaseAPIServices from './FirebaseAPIServices'

class NoteDataController {

    addNote = (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            SQLiteStorageServices.storeDetailsInSQLiteDataBase(noteKey, notes)
            .then((results) => {
                this.addNoteKeyToTheLabels(noteKey, notes.labels)
                FirebaseAPIServices.storeNoteinDatabaseThroughAPI(noteKey, notes)
                .then(msg => console.log(msg))
                .catch((error) => reject(error))
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
            FirebaseAPIServices.storeNoteinDatabaseThroughAPI(noteKey, notes)
            .catch((error) => reject(error))        
        })
    }

    deletePermanently = (noteKey) => {
        SQLiteStorageServices.deleteNoteForever(noteKey)
        .then(() => {})
        .catch((error) => reject(error))

        UserNoteServices.deleteNoteForever(noteKey)
        .then(() => console.log('deleted Note in Firebase'))
        .catch((error) => reject(error))
    }

    addNoteKeyToTheLabels = (noteKey, labels) => {
        labels.map(label => {
            SQLiteLabelServices.addNoteKeysToTheLabelsInSQLite(label, noteKey)
            UserNoteServices.addNoteKeysToTheLabelsInFirebase(label, noteKey)
        })
    }
}

export default new NoteDataController