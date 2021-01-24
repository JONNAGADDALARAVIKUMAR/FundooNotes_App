import { openDatabase } from 'react-native-sqlite-storage';
import KeyChain from 'react-native-keychain';

var db = openDatabase({ name: 'SQLiteStorage.db', createFromLocation: 1 });

class SQLiteStorageServices {

    storeDetailsInSQLiteDataBase = async (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${UserID} (NoteKey, Title, Notes, isDeleted, isArchived, Labels, remainderTime) VALUES (?,?,?,?,?,?,?)`,
                    [noteKey, notes.title, notes.note, notes.isDeleted, notes.isArchived, JSON.stringify(notes.labels), notes.remainderTime],
                    async (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    updateDetailsInSQLiteDataBase = (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction(async (tx) => {
                tx.executeSql(
                    `UPDATE ${UserID} set Title = ?, Notes = ?, isDeleted = ? , isArchived = ?, Labels = ?, remainderTime = ?  where NoteKey = ?`,
                    [notes.title, notes.note, notes.isDeleted, notes.isArchived, JSON.stringify(notes.labels), notes.remainderTime, noteKey],
                    async (tx, results) => {resolve(results)},
                    error => reject(error)
                )
            })
        })
    }

    getDetailsFromSQLiteDatabase = (deletedStatus, archivedStatus) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${UserID} ("NoteKey"	TEXT, "Title" TEXT, "Notes"	TEXT, "isDeleted" INTEGER, "isArchived" INTEGER, "Labels" TEXT, "remainderTime" TEXT, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                })
            })
            if(deletedStatus == undefined, archivedStatus == undefined) {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT * FROM ${UserID}`, [], (tx, results) => {
                        resolve(results)
                    }, error => reject(error))
                })
            } else {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT * FROM ${UserID} where isDeleted = ? and isArchived = ?`, [deletedStatus, archivedStatus], (tx, results) => {
                        resolve(results)
                    }, error => reject(error))
                })
            }
            // db.transaction((tx) => {
            //     tx.executeSql(`DROP TABLE ${UserID}`)
            // })
        })
    }

    addDetailsInSQLiteDataBaseFromFirebase = async (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${UserID} ("NoteKey"	TEXT, "Title" TEXT, "Notes"	TEXT, "isDeleted" INTEGER, "isArchived" INTEGER, "Labels" TEXT, "remainderTime" TEXT, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                })
                tx.executeSql(
                    `INSERT INTO ${UserID} (NoteKey, Title, Notes, isDeleted, isArchived, Labels, remainderTime) VALUES (?,?,?,?,?,?,?)`,
                    [noteKey, notes.notes.title, notes.notes.note, notes.notes.isDeleted, notes.notes.isArchived, JSON.stringify(notes.notes.labels), notes.notes.remainderTime],
                    async (tx, results) => {resolve(results)},
                    error => reject(error)
                );
            })
        })
    }

    deleteNoteForever = (noteKey) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM ${UserID} WHERE NoteKey = ?`, [noteKey], (tx, results) =>
                        resolve('success'),
                        error => reject(error)
                )
            })
        })
    }
}
export default new SQLiteStorageServices