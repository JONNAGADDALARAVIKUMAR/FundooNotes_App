import { openDatabase } from 'react-native-sqlite-storage';
import KeyChain from 'react-native-keychain';

var db = openDatabase({ name: 'SQLiteStorage.db', createFromLocation: 1 });

class SQLiteStorageServices {

    storeDetailsInSQLiteDataBase = async (noteKey, title, notes, deletedStatus) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${UserID} (NoteKey, Title, Notes, isDeleted) VALUES (?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus],
                    async (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    updateDetailsInSQLiteDataBase = (insertID, title, notes, deletedStatus) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction(async (tx) => {
                tx.executeSql(
                    `UPDATE ${UserID} set Title = ? , Notes = ?,isDeleted = ?  where NoteKey = ?`,
                    [title, notes, deletedStatus, insertID],
                    async (tx, results) => {
                        console.log('Success Results Updated to SQLite');
                        resolve(results)
                    },
                    error => reject(error)
                )
            })
        })
    }

    getDetailsFromSQLiteDatabase = () => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${UserID} ("NoteKey"	TEXT, "Title" TEXT, "Notes"	TEXT, "isDeleted" INTEGER, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                })
            })
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${UserID}`, [], (tx, results) => {
                    resolve(results)
                }, error => console.log(error))
            })
            // db.transaction((tx) => {
            //     tx.executeSql(`DROP TABLE ${UserID}`)
            // })
        })
    }

    addDetailsInSQLiteDataBaseFromFirebase = async (noteKey, title, notes, deletedStatus) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid

            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${UserID} ("NoteKey"	TEXT, "Title" TEXT, "Notes"	TEXT, "isDeleted" INTEGER, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                    console.log('-')
                })
                tx.executeSql(
                    `INSERT INTO ${UserID} (NoteKey, Title, Notes, isDeleted) VALUES (?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus],
                    async (tx, results) => {
                        console.log('Results Inserted to SQLIite');
                        resolve(results)
                    },
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