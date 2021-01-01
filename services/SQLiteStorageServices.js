import { openDatabase } from 'react-native-sqlite-storage';
import KeyChain from 'react-native-keychain'

var db = openDatabase({ name: 'SQLiteStorage.db', createFromLocation: 1 });

class SQLiteStorageServices {

    storeDetailsInSQLiteDataBase = async (title, notes, deletedStatus) => {
        return new Promise(async (resolve, reject) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid
        
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO UserNotesTable (UserID, Title, Notes, isDeleted) VALUES (?,?,?,?)',
                    [UserID, title, notes, deletedStatus],
                    async (tx, results) => {
                        console.log('Results Insert: ', results);
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    updateDetailsInSQLiteDataBase = async (insertID, title, notes, deletedStatus) => {
        let user = await KeyChain.getGenericPassword();
        let userDetails = JSON.parse(user.password);
        let UserID = userDetails.user.uid

        db.transaction(async (tx) => {
            tx.executeSql(
                'UPDATE UserNotesTable set UserID = ?, Title = ? , Notes = ?,isDeleted = ?  where NoteKey = ?',
                [UserID, title, notes, deletedStatus, insertID],
                async (tx, results) => {
                    console.log('Success Results Insert: ', results);
                },
                error => {console.log(error)}
            )
        })
    }

    getDetailsFromSQLiteDatabase = () => {
        return new Promise(async (resolve) => {
            let user = await KeyChain.getGenericPassword();
            let userDetails = JSON.parse(user.password);
            let UserID = userDetails.user.uid
    
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM UserNotesTable WHERE UserID = ?', [UserID], (tx, results) => {
                    resolve(results)
                })
            })
        })
    }
}
export default new SQLiteStorageServices